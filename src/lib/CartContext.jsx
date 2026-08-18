import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import {
  SACK_IDS,
  SACK_PRICE,
  SACK_BUNDLE_PRICE,
  BUNDLE_MIN_QTY,
  getProduct,
} from './products';
import { trackAddToCart } from './pixel';

const STORAGE_KEY = 'hackyCart';

const CartContext = createContext(null);

/* Cart lines are keyed by id+size so a M and an L tee stay separate. */
function lineKey(id, size) {
  return size ? `${id}::${size}` : id;
}

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Drop anything whose product no longer exists, so a renamed SKU can't
    // reach checkout and get rejected by the server whitelist.
    return parsed.filter((i) => i && getProduct(i.id) && Number(i.qty) > 0);
  } catch {
    return [];
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'add': {
      const { id, size, qty = 1 } = action;
      const key = lineKey(id, size);
      const existing = state.find((i) => lineKey(i.id, i.size) === key);
      if (existing) {
        return state.map((i) =>
          lineKey(i.id, i.size) === key ? { ...i, qty: Math.min(i.qty + qty, 20) } : i
        );
      }
      return [...state, { id, size: size || null, qty: Math.min(qty, 20) }];
    }

    case 'setQty': {
      const next = Math.max(0, Math.min(action.qty, 20));
      if (next === 0) {
        return state.filter((i) => lineKey(i.id, i.size) !== action.key);
      }
      return state.map((i) =>
        lineKey(i.id, i.size) === action.key ? { ...i, qty: next } : i
      );
    }

    case 'remove':
      return state.filter((i) => lineKey(i.id, i.size) !== action.key);

    case 'clear':
      return [];

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [items, dispatch] = useReducer(reducer, undefined, readStored);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* private browsing / quota — cart just won't persist */
    }
  }, [items]);

  /* Lock body scroll while the drawer is open. */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const value = useMemo(() => {
    /* Bundle rule, mirrored from the Netlify function: once the cart holds
       2+ suede sacks, every sack drops from $15 to $13. The server recomputes
       this independently — this is presentation only. */
    const totalSackQty = items
      .filter((i) => SACK_IDS.includes(i.id))
      .reduce((sum, i) => sum + i.qty, 0);
    const bundleActive = totalSackQty >= BUNDLE_MIN_QTY;

    const lines = items.map((item) => {
      const product = getProduct(item.id);
      const unitPrice =
        SACK_IDS.includes(item.id) && bundleActive ? SACK_BUNDLE_PRICE : product.price;
      return {
        ...item,
        key: lineKey(item.id, item.size),
        product,
        unitPrice,
        lineTotal: unitPrice * item.qty,
        discounted: SACK_IDS.includes(item.id) && bundleActive,
      };
    });

    const subtotal = lines.reduce((sum, l) => sum + l.lineTotal, 0);
    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    const savings = bundleActive ? totalSackQty * (SACK_PRICE - SACK_BUNDLE_PRICE) : 0;

    return {
      items,
      lines,
      subtotal,
      count,
      bundleActive,
      totalSackQty,
      savings,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (id, opts = {}) => {
        const qty = opts.qty || 1;
        dispatch({ type: 'add', id, size: opts.size, qty });
        setIsOpen(true);
        /* List price, not the bundle price — the discount depends on cart state
           that this dispatch hasn't applied yet, and Purchase reports the real
           figure from Stripe anyway. */
        trackAddToCart(getProduct(id), qty);
      },
      setQty: (key, qty) => dispatch({ type: 'setQty', key, qty }),
      removeItem: (key) => dispatch({ type: 'remove', key }),
      clearCart: () => dispatch({ type: 'clear' }),
    };
  }, [items, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>');
  return ctx;
}
