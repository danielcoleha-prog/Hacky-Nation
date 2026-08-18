import { useCart } from '../lib/CartContext';
import { formatPrice } from '../lib/products';
import Seal from './Seal';

/**
 * A pack, sold straight from the grid.
 *
 * Packs have no product page of their own — there is no panel count or
 * colorway to put on one — so the card has to close the sale by itself.
 */
export default function BundleCard({ bundle }) {
  const { addItem } = useCart();
  const saving = bundle.compareAt - bundle.price;

  return (
    <article className="reveal card card-hover flex flex-col">
      <div className="relative border-b-2 border-ink bg-paper-deep">
        <img
          src={bundle.image}
          alt={bundle.fullName}
          width={1100}
          height={1100}
          loading="lazy"
          decoding="async"
          className="block aspect-square w-full object-cover"
        />
        {saving > 0 && (
          <Seal
            variant="red"
            burst
            size="sm"
            lines={['SAVE', `$${saving}`]}
            className="absolute -right-2 -top-2 rotate-[12deg]"
          />
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="eyebrow">{bundle.sub}</p>
        <h3 className="font-display text-display-md text-ink">{bundle.fullName}</h3>
        <p className="font-body text-body-sm text-ink-soft">{bundle.desc}</p>

        <div className="mt-auto flex items-baseline gap-3 pt-2">
          <span className="font-numeric text-[1.8rem] leading-none text-ink">
            {formatPrice(bundle.price)}
          </span>
          <span className="font-body text-body-sm text-ink-faint line-through">
            {formatPrice(bundle.compareAt)}
          </span>
        </div>

        <button type="button" onClick={() => addItem(bundle.id)} className="btn-primary w-full">
          Add to cart
        </button>
      </div>
    </article>
  );
}
