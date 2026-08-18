// Single source of truth for the storefront.
//
// ⚠️  Every `id` here MUST exist in PRODUCTS in
//     netlify/functions/create-checkout-session.js — that whitelist is what
//     Stripe actually charges. Prices below are for display only; the server
//     recomputes them and ignores anything the client sends.

/* Bundle-eligible sacks only. The Magical Sack and Star Burst sit at $18 and
   are deliberately outside this tier — their pack is the Specialty Duo, and
   letting them fall to $13 here would price two loose ones below it. */
export const SACK_IDS = [
  'pink-lemonade-sack',
  'candy-corn-sack',
  'patriot-sack',
  'sunset-sack',
  'bulldawgs-sack',
  'sky-sack',
  'usl-pro-sack',
];

export const SACK_PRICE = 15;
export const SACK_BUNDLE_PRICE = 13;
export const BUNDLE_MIN_QTY = 2;

/** Sacks — these get their own product pages at /sacks/:id */
export const SACKS = [
  {
    id: 'magical-sack',
    name: 'The Magical Sack',
    fullName: 'The Magical Sack',
    sub: 'GLOW IN THE DARK · UV REACTIVE · 32 PANELS',
    image: '/img/products/magical-sack.webp',
    desc: 'The Magical Sack is a 32-panel suede foot bag in deep purple with green star points. It glows in the dark and lights up under UV, so the circle does not have to break when the sun goes down.',
    price: 18,
    compareAt: 22,
    preorder: false,
    panels: 32,
    colors: ['#4A2846', '#B4CF5A', '#2E1A2C'],
    accent: '#5B3156',
    badge: 'NEW',
  },
  {
    id: 'pink-lemonade-sack',
    name: 'Pink Lemonade',
    fullName: 'Pink Lemonade Foot Bag',
    sub: 'PINK & YELLOW · 14 PANELS',
    image: '/img/products/pink-lemonade-sack.webp',
    desc: 'The Pink Lemonade is a 14-panel suede foot bag in hot pink and lemon yellow. Big soft panels for easy stalls, and loud enough to spot from across the field.',
    price: 15,
    compareAt: 22,
    preorder: false,
    panels: 14,
    colors: ['#F36684', '#F0D63F', '#F4E4A6'],
    accent: '#F36684',
    badge: 'NEW',
  },
  {
    id: 'candy-corn-sack',
    name: 'Candy Corn',
    fullName: 'Candy Corn Foot Bag',
    sub: 'YELLOW · ORANGE · WHITE · 32 PANELS',
    image: '/img/products/candy-corn-sack.webp',
    desc: 'The Candy Corn is a 32-panel suede foot bag in yellow, orange and cream. Tight panels for a responsive kick, and the only sack in the lineup that gets better the closer it gets to October.',
    price: 15,
    compareAt: 22,
    preorder: false,
    panels: 32,
    colors: ['#F1C737', '#E4912C', '#EFEAE0'],
    accent: '#E4912C',
    badge: 'NEW',
  },
  {
    id: 'star-burst-sack',
    name: 'Star Burst',
    fullName: 'Star Burst Foot Bag',
    sub: 'YELLOW & GREEN · METAL STUDS · 32 PANELS',
    image: '/img/products/star-burst-sack.webp',
    desc: 'The Star Burst is a 32-panel suede foot bag in bright yellow, covered in green starbursts and set metal studs that catch the light on every kick. Nothing else in the lineup looks like it.',
    price: 18,
    compareAt: 22,
    preorder: false,
    panels: 32,
    colors: ['#EDE65E', '#5BA13C', '#C9CBCE'],
    accent: '#5BA13C',
    badge: 'NEW',
  },
  {
    id: 'patriot-sack',
    name: 'Patriot',
    fullName: 'Patriot Foot Bag',
    sub: 'RED · WHITE · BLUE · 32 PANELS',
    image: '/img/products/patriot-sack.webp',
    desc: 'The Patriot is a bold 32-panel suede foot bag in red, white, and blue. Handcrafted and built to play — perfect for the circle.',
    price: 15,
    compareAt: 22,
    preorder: false,
    panels: 32,
    colors: ['#D23C2B', '#F1E8DA', '#1B4FC4'],
    accent: '#D23C2B',
    gallery: [
      {
        src: '/img/products/gallery/patriot-1.webp',
        thumb: '/img/products/gallery/patriot-1-t.webp',
        alt: 'Patriot foot bag on a warm studio backdrop',
      },
      {
        src: '/img/products/gallery/patriot-2.webp',
        thumb: '/img/products/gallery/patriot-2-t.webp',
        alt: 'Close-up of the Patriot\'s red, white and blue suede panels',
      },
      {
        src: '/img/products/gallery/patriot-3.webp',
        thumb: '/img/products/gallery/patriot-3-t.webp',
        alt: 'Player holding the Patriot foot bag in a park',
      },
      {
        src: '/img/products/gallery/patriot-4.webp',
        thumb: '/img/products/gallery/patriot-4-t.webp',
        alt: 'Unpacking the Patriot foot bag on a desk',
      },
    ],
  },
  {
    id: 'sunset-sack',
    name: 'Sunset',
    fullName: 'Sunset Foot Bag',
    sub: 'YELLOW & ORANGE · 32 PANELS',
    image: '/img/products/sunset-sack.webp',
    desc: 'The Sunset is a 32-panel suede foot bag in warm yellow and orange tones. Eye-catching in the circle, built to last.',
    price: 15,
    compareAt: 22,
    preorder: false,
    panels: 32,
    colors: ['#F0A81B', '#D2661B', '#D23C2B'],
    accent: '#F0A81B',
    gallery: [
      {
        src: '/img/products/gallery/sunset-1.webp',
        thumb: '/img/products/gallery/sunset-1-t.webp',
        alt: 'Sunset foot bag held in an open hand',
      },
      {
        src: '/img/products/gallery/sunset-2.webp',
        thumb: '/img/products/gallery/sunset-2-t.webp',
        alt: 'Sunset foot bag resting in the grass mid-circle',
      },
      {
        src: '/img/products/gallery/sunset-3.webp',
        thumb: '/img/products/gallery/sunset-3-t.webp',
        alt: 'Sunset foot bag in a flat lay with everyday carry',
      },
      {
        src: '/img/products/gallery/sunset-4.webp',
        thumb: '/img/products/gallery/sunset-4-t.webp',
        alt: 'Tossing the Sunset foot bag indoors',
      },
    ],
  },
  {
    id: 'bulldawgs-sack',
    name: 'Bulldawgs',
    fullName: 'Bulldawgs Foot Bag',
    sub: 'BLACK & RED · 14 PANELS',
    image: '/img/products/bulldawgs-sack.webp',
    desc: 'The Bulldawgs is a 14-panel suede foot bag in black and red. Tight panels for a consistent, responsive kick.',
    price: 15,
    compareAt: 22,
    preorder: true,
    panels: 14,
    colors: ['#16130E', '#D23C2B', '#F1E8DA'],
    accent: '#16130E',
    gallery: [
      {
        src: '/img/products/gallery/bulldawgs-1.webp',
        thumb: '/img/products/gallery/bulldawgs-1-t.webp',
        alt: 'Bulldawgs foot bag on sunlit concrete',
      },
      {
        src: '/img/products/gallery/bulldawgs-2.webp',
        thumb: '/img/products/gallery/bulldawgs-2-t.webp',
        alt: 'Player holding the Bulldawgs foot bag at a skatepark',
      },
      {
        src: '/img/products/gallery/bulldawgs-3.webp',
        thumb: '/img/products/gallery/bulldawgs-3-t.webp',
        alt: 'A circle forming in a schoolyard',
      },
      {
        src: '/img/products/gallery/bulldawgs-4.webp',
        thumb: '/img/products/gallery/bulldawgs-4-t.webp',
        alt: 'The full Hacky Nation lineup in a row',
      },
    ],
  },
  {
    id: 'sky-sack',
    name: 'Sky',
    fullName: 'Sky Foot Bag',
    sub: 'BLUE & WHITE · 14 PANELS',
    image: '/img/products/sky-sack.webp',
    desc: 'The Sky is a 14-panel suede foot bag in blue and white. Clean colorway, great feel, made for players who keep it up.',
    price: 15,
    compareAt: 22,
    preorder: true,
    panels: 14,
    colors: ['#1B4FC4', '#F1E8DA', '#4A7BE0'],
    accent: '#1B4FC4',
    gallery: [
      {
        src: '/img/products/gallery/sky-1.webp',
        thumb: '/img/products/gallery/sky-1-t.webp',
        alt: 'Sky foot bag balanced on a sneaker',
      },
      {
        src: '/img/products/gallery/sky-2.webp',
        thumb: '/img/products/gallery/sky-2-t.webp',
        alt: 'Sky foot bag passed between two hands',
      },
      {
        src: '/img/products/gallery/sky-3.webp',
        thumb: '/img/products/gallery/sky-3-t.webp',
        alt: 'Sky foot bag pulled from a jeans pocket',
      },
      {
        src: '/img/products/gallery/sky-4.webp',
        thumb: '/img/products/gallery/sky-4-t.webp',
        alt: 'Sky, Sunset and Patriot foot bags stacked',
      },
    ],
  },
  {
    id: 'usl-pro-sack',
    name: 'USL Pro Sack',
    fullName: 'USASackLeague X Hacky Nation Pro Sack',
    sub: 'OFFICIAL USL COLLAB · LIMITED EDITION',
    image: '/img/products/usl-pro-sack.webp',
    desc: 'The official USASackLeague × Hacky Nation Pro Sack. Co-designed with USL for the circle — premium suede, tournament-grade panel construction, limited edition numbered run.',
    price: 15,
    compareAt: 22,
    preorder: false,
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
  accent: '#D4402E',
};


/** Fixed packs. Each is one SKU at one price, so the 2+ sack discount never
 *  stacks on top of it. `compareAt` is the honest sum of the list prices. */
export const BUNDLES = [
  {
    id: 'specialty-duo',
    name: 'Specialty Duo',
    fullName: 'The Specialty Duo',
    sub: 'THE MAGICAL SACK + STAR BURST',
    image: '/img/bundles/specialty-duo.webp',
    desc: 'Both specialty sacks together — the glow-in-the-dark Magical Sack and the studded Star Burst.',
    price: 29,
    compareAt: 36,
    contents: ['magical-sack', 'star-burst-sack'],
  },
  {
    id: 'og-pack',
    name: 'OG Pack',
    fullName: 'The OG Pack',
    sub: 'PATRIOT · SUNSET · BULLDAWGS · SKY',
    image: '/img/bundles/og-pack.webp',
    desc: 'The four we started with, in one box. Every original colorway.',
    price: 49,
    compareAt: 60,
    contents: ['patriot-sack', 'sunset-sack', 'bulldawgs-sack', 'sky-sack'],
  },
  {
    id: '14-panel-pack',
    name: '14 Panel Pack',
    fullName: 'The 14 Panel Pack',
    sub: 'BULLDAWGS · SKY · PINK LEMONADE',
    image: '/img/bundles/14-panel-pack.webp',
    desc: 'Every 14-panel sack we make. Bigger panels, softer stalls, easier to learn on.',
    price: 39,
    compareAt: 45,
    contents: ['bulldawgs-sack', 'sky-sack', 'pink-lemonade-sack'],
  },
  {
    id: '32-panel-pack',
    name: '32 Panel Pack',
    fullName: 'The 32 Panel Pack',
    sub: 'PATRIOT · SUNSET · CANDY CORN',
    image: '/img/bundles/32-panel-pack.webp',
    desc: 'Tight 32-panel construction in three colorways — the most responsive kick in the lineup.',
    price: 39,
    compareAt: 45,
    contents: ['patriot-sack', 'sunset-sack', 'candy-corn-sack'],
  },
];

/** Tees — size is required before these can be added to the cart. */
export const SHIRTS = [
  {
    id: 'shirt-white',
    name: 'Hacky Nation Tee',
    fullName: 'Hacky Nation Tee — White',
    sub: 'WHITE · UNISEX · XL ONLY',
    image: '/img/products/shirt-white.webp',
    // Back is shown first everywhere — it carries the PLAY WITH YOUR SACK.
    // print, which is the reason to want the tee. Front is the hover state.
    imageFront: '/img/products/shirt-white.webp',
    imageBack: '/img/products/shirt-white-back.webp',
    desc: 'Unisex tee. Hacky Nation logo on the front chest, PLAY WITH YOUR SACK. across the back.',
    price: 20,
    sizes: ['XL'],
    colorway: 'White',
    swatch: '#F1E8DA',
  },
  {
    id: 'shirt-black',
    name: 'Hacky Nation Tee',
    fullName: 'Hacky Nation Tee — Black',
    sub: 'BLACK · UNISEX · XL ONLY',
    image: '/img/products/shirt-black.webp',
    imageFront: '/img/products/shirt-black.webp',
    imageBack: '/img/products/shirt-black-back.webp',
    desc: 'Unisex tee. Hacky Nation logo on the front chest, PLAY WITH YOUR SACK. across the back.',
    price: 20,
    sizes: ['XL'],
    colorway: 'Black',
    swatch: '#16130E',
  },
];

/* Full size run. Individual products can narrow it with their own `sizes`
   array — the tees are XL-only at the moment. */
export const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

/** Past custom builds, cycled wherever we show "what yours could look like". */
export const CUSTOM_MOCKUPS = [
  { src: '/img/customs/custom-1.webp', alt: 'Custom sack with a phoenix crest' },
  { src: '/img/customs/custom-2.webp', alt: 'Custom sack in blue and red team colors' },
  { src: '/img/customs/custom-3.webp', alt: 'Custom sack with a bulldog mascot' },
  { src: '/img/customs/custom-4.webp', alt: 'Custom sack with a Beach Club patch' },
];

/** Flat lookup across everything sellable. */
export const ALL_PRODUCTS = [...SACKS, MYSTERY_BAG, ...SHIRTS, ...BUNDLES];

export function getProduct(id) {
  return ALL_PRODUCTS.find((p) => p.id === id) || null;
}

export function getSack(id) {
  return SACKS.find((s) => s.id === id) || null;
}

export function isBundle(id) {
  return BUNDLES.some((b) => b.id === id);
}

export function isSack(id) {
  return SACK_IDS.includes(id);
}

export function formatPrice(n) {
  return `$${Number(n).toFixed(2)}`;
}
