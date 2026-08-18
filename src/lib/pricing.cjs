/**
 * Sack pricing rules — the single source of truth.
 *
 * Imported by BOTH the cart (for display) and the Netlify checkout function
 * (for what Stripe actually charges). It lives in one file on purpose: two
 * copies of these rules drifting apart is the bug that silently overcharges
 * people, and it is invisible until someone complains.
 *
 * Everything here is in CENTS. Money in floats is how you end up with a
 * $40.499999999999996 subtotal.
 *
 * Written as CommonJS so the Netlify function can require it directly; Vite
 * handles the interop on the client side.
 */
'use strict';

const LIST_REGULAR = 1500;
const LIST_SPECIALTY = 1800;
/* Two or more sacks in the cart and every sack drops to its multi rate. */
const MULTI_REGULAR = 1350;
const MULTI_SPECIALTY = 1600;
const MULTI_MIN_QTY = 2;

/* Specialty builds — glow and studs. They discount, but never as far. */
const SPECIALTY_IDS = ['magical-sack', 'star-burst-sack'];

const SACK_IDS = [
  'magical-sack',
  'pink-lemonade-sack',
  'candy-corn-sack',
  'star-burst-sack',
  'patriot-sack',
  'sunset-sack',
  'bulldawgs-sack',
  'sky-sack',
  'usl-pro-sack',
];

/* A cart holding every member of one of these becomes that pack automatically.
   Same sets as the BUNDLES the shop sells outright, at the same prices. */
const BUNDLE_SETS = [
  {
    id: 'specialty-duo',
    name: 'The Specialty Duo',
    price: 2900,
    members: ['magical-sack', 'star-burst-sack'],
  },
  {
    id: 'og-pack',
    name: 'The OG Pack',
    price: 4900,
    members: ['patriot-sack', 'sunset-sack', 'bulldawgs-sack', 'sky-sack'],
  },
  {
    id: '14-panel-pack',
    name: 'The 14 Panel Pack',
    price: 3900,
    members: ['bulldawgs-sack', 'sky-sack', 'pink-lemonade-sack'],
  },
  {
    id: '32-panel-pack',
    name: 'The 32 Panel Pack',
    price: 3900,
    members: ['patriot-sack', 'sunset-sack', 'candy-corn-sack'],
  },
];

function isSpecialty(id) {
  return SPECIALTY_IDS.indexOf(id) !== -1;
}

function isSackId(id) {
  return SACK_IDS.indexOf(id) !== -1;
}

/** Which pack to offer on a sack's page. The cheapest one it belongs to — the
 *  smallest step up is the one someone actually takes. */
function bundleFor(id) {
  const owning = BUNDLE_SETS.filter((b) => b.members.indexOf(id) !== -1);
  if (!owning.length) return null;
  return owning.slice().sort((a, b) => a.price - b.price)[0];
}

/**
 * Price the sack portion of a cart.
 *
 * `sackLines` is [{ id, qty }] of sacks only — tees, the mystery bag and packs
 * bought outright are ordinary products and are priced by their own line.
 *
 * Bundles are extracted greedily, biggest saving first. With only four sets
 * that is not provably optimal in every theoretical cart, but it is optimal in
 * every cart these four can actually produce, and it is predictable — which
 * matters more than clever when someone is staring at a total.
 */
function priceSacks(sackLines) {
  const counts = {};
  let totalQty = 0;
  for (let i = 0; i < sackLines.length; i++) {
    const { id, qty } = sackLines[i];
    if (!isSackId(id)) continue;
    counts[id] = (counts[id] || 0) + qty;
    totalQty += qty;
  }

  const multi = totalQty >= MULTI_MIN_QTY;
  const unitPrice = (id) =>
    isSpecialty(id)
      ? (multi ? MULTI_SPECIALTY : LIST_SPECIALTY)
      : (multi ? MULTI_REGULAR : LIST_REGULAR);

  const remaining = Object.assign({}, counts);
  const applied = [];

  /* Bounded rather than while(true): a rule change that made a zero-saving
     bundle look extractable would otherwise hang the checkout. */
  for (let pass = 0; pass < 40; pass++) {
    let best = null;
    for (let i = 0; i < BUNDLE_SETS.length; i++) {
      const b = BUNDLE_SETS[i];
      let complete = true;
      for (let m = 0; m < b.members.length; m++) {
        if (!(remaining[b.members[m]] > 0)) { complete = false; break; }
      }
      if (!complete) continue;
      let loose = 0;
      for (let m = 0; m < b.members.length; m++) loose += unitPrice(b.members[m]);
      const saving = loose - b.price;
      if (saving > 0 && (best === null || saving > best.saving)) {
        best = { bundle: b, saving };
      }
    }
    if (best === null) break;
    for (let m = 0; m < best.bundle.members.length; m++) {
      remaining[best.bundle.members[m]] -= 1;
    }
    applied.push({
      id: best.bundle.id,
      name: best.bundle.name,
      price: best.bundle.price,
      saving: best.saving,
      members: best.bundle.members.slice(),
    });
  }

  const loose = [];
  let looseTotal = 0;
  Object.keys(remaining).forEach((id) => {
    const qty = remaining[id];
    if (qty <= 0) return;
    const unit = unitPrice(id);
    loose.push({ id, qty, unit, total: unit * qty });
    looseTotal += unit * qty;
  });

  let bundlesTotal = 0;
  for (let i = 0; i < applied.length; i++) bundlesTotal += applied[i].price;

  /* What the same sacks would have cost with no multi rate and no packs —
     the honest number to strike through. */
  let listTotal = 0;
  Object.keys(counts).forEach((id) => {
    listTotal += (isSpecialty(id) ? LIST_SPECIALTY : LIST_REGULAR) * counts[id];
  });

  return {
    multi,
    totalQty,
    unitPrice,
    applied,
    loose,
    looseTotal,
    bundlesTotal,
    total: looseTotal + bundlesTotal,
    listTotal,
    savings: listTotal - (looseTotal + bundlesTotal),
  };
}

module.exports = {
  LIST_REGULAR,
  LIST_SPECIALTY,
  MULTI_REGULAR,
  MULTI_SPECIALTY,
  MULTI_MIN_QTY,
  SPECIALTY_IDS,
  SACK_IDS,
  BUNDLE_SETS,
  isSpecialty,
  isSackId,
  bundleFor,
  priceSacks,
};
