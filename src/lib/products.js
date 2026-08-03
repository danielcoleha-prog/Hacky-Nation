// Single source of truth for the storefront.
//
// ⚠️  Every `id` here MUST exist in PRODUCTS in
//     netlify/functions/create-checkout-session.js — that whitelist is what
//     Stripe actually charges. Prices below are for display only; the server
//     recomputes them and ignores anything the client sends.

export const SACK_IDS = ['patriot-sack', 'sunset-sack', 'bulldawgs-sack', 'sky-sack'];

export const SACK_PRICE = 17;
export const SACK_BUNDLE_PRICE = 15;
export const BUNDLE_MIN_QTY = 2;

/** Sacks — these get their own product pages at /sacks/:id */
export const SACKS = [
  {
    id: 'patriot-sack',
    name: 'Patriot',
    fullName: 'Patriot Foot Bag',
    sub: 'RED · WHITE · BLUE · 32 PANELS',
    image: '/img/products/patriot-sack.webp',
    desc: 'The Patriot is a bold 32-panel suede foot bag in red, white, and blue. Handcrafted and built to play — perfect for the circle.',
    price: 17,
    compareAt: 20,
    preorder: false,
    panels: 32,
    colors: ['#D23C2B', '#F1E8DA', '#1B4FC4'],
    accent: '#D23C2B',
  },
  {
    id: 'sunset-sack',
    name: 'Sunset',
    fullName: 'Sunset Foot Bag',
    sub: 'YELLOW & ORANGE · 32 PANELS',
    image: '/img/products/sunset-sack.webp',
    desc: 'The Sunset is a 32-panel suede foot bag in warm yellow and orange tones. Eye-catching in the circle, built to last.',
    price: 17,
    compareAt: 20,
    preorder: false,
    panels: 32,
    colors: ['#F0A81B', '#D2661B', '#D23C2B'],
    accent: '#F0A81B',
  },
  {
    id: 'bulldawgs-sack',
    name: 'Bulldawgs',
    fullName: 'Bulldawgs Foot Bag',
    sub: 'BLACK & RED · 14 PANELS',
    image: '/img/products/bulldawgs-sack.webp',
    desc: 'The Bulldawgs is a 14-panel suede foot bag in black and red. Tight panels for a consistent, responsive kick.',
    price: 17,
    compareAt: 20,
    preorder: false,
    panels: 14,
    colors: ['#16130E', '#D23C2B', '#F1E8DA'],
    accent: '#16130E',
  },
  {
    id: 'sky-sack',
    name: 'Sky',
    fullName: 'Sky Foot Bag',
    sub: 'BLUE & WHITE · 14 PANELS',
    image: '/img/products/sky-sack.webp',
    desc: 'The Sky is a 14-panel suede foot bag in blue and white. Clean colorway, great feel, made for players who keep it up.',
    price: 17,
    compareAt: 20,
    preorder: true,
    panels: 14,
    colors: ['#1B4FC4', '#F1E8DA', '#4A7BE0'],
    accent: '#1B4FC4',
  },
  {
    id: 'usl-pro-sack',
    name: 'USL Pro Sack',
    fullName: 'USASackLeague X Hacky Nation Pro Sack',
    sub: 'OFFICIAL USL COLLAB · LIMITED EDITION',
    image: '/img/products/usl-pro-sack.webp',
    desc: 'The official USASackLeague × Hacky Nation Pro Sack. Co-designed with USL for the circle — premium suede, tournament-grade panel construction, limited edition numbered run.',
    price: 20,
    compareAt: 28,
    preorder: true,
    panels: 32,
    colors: ['#F1E8DA', '#152452', '#C8202F'],
    accent: '#152452',
    badge: 'COLLAB',
  },
];

/** Hand-knit mystery bag — sold on the landing page, no dedicated PDP. */
export const MYSTERY_BAG = {
  id: 'mystery-bag',
  name: 'Mystery Bag',
  fullName: 'Hand Knit Mystery Bag',
  sub: 'HAND KNIT · RANDOM COLORWAY',
  image: '/img/products/mystery-bag.webp',
  desc: 'A hand-knit foot bag pulled at random from the batch. Unique patterns and colors every time — no two are alike.',
  price: 10,
  compareAt: 14,
  preorder: false,
  accent: '#F0A81B',
};

/** Tees — size is required before these can be added to the cart. */
export const SHIRTS = [
  {
    id: 'shirt-white',
    name: 'Hacky Nation Tee',
    fullName: 'Hacky Nation Tee — White',
    sub: 'WHITE · UNISEX · S–XXL',
    image: '/img/products/shirt-white.webp',
    desc: 'Heavyweight unisex tee. Hacky Nation logo on the front chest, PLAY WITH YOUR SACK. across the back.',
    price: 20,
    colorway: 'White',
    swatch: '#F1E8DA',
  },
  {
    id: 'shirt-black',
    name: 'Hacky Nation Tee',
    fullName: 'Hacky Nation Tee — Black',
    sub: 'BLACK · UNISEX · S–XXL',
    image: '/img/products/shirt-black.webp',
    desc: 'Heavyweight unisex tee. Hacky Nation logo on the front chest, PLAY WITH YOUR SACK. across the back.',
    price: 20,
    colorway: 'Black',
    swatch: '#16130E',
  },
];

export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

/** Flat lookup across everything sellable. */
export const ALL_PRODUCTS = [...SACKS, MYSTERY_BAG, ...SHIRTS];

export function getProduct(id) {
  return ALL_PRODUCTS.find((p) => p.id === id) || null;
}

export function getSack(id) {
  return SACKS.find((s) => s.id === id) || null;
}

export function isSack(id) {
  return SACK_IDS.includes(id);
}

export function formatPrice(n) {
  return `$${Number(n).toFixed(2)}`;
}
