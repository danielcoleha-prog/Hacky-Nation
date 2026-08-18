import { BUNDLES } from '../lib/products';
import SectionHeading from './SectionHeading';
import BundleCard from './BundleCard';

/**
 * Packs, sitting directly under the lineup carousel.
 *
 * Two columns rather than the shop's three: four packs land as a tidy 2×2
 * here, where three-up would leave one card stranded on its own row.
 */
export default function Bundles() {
  return (
    <section id="bundles" aria-labelledby="bundles-heading" className="paper-grain relative bg-paper">
      <div className="relative mx-auto max-w-site px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          title="Packs"
          id="bundles-heading"
          kicker="Four sets · one price"
          mis="red"
          aside="Build the same set in your cart and the pack price applies on its own."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {BUNDLES.map((bundle) => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>
      </div>
    </section>
  );
}
