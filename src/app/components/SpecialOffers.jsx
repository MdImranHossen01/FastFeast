// src/app/components/SpecialOffers.jsx
// SERVER COMPONENT (SSG)
export const dynamic = "force-static"; // ensure SSG
// export const revalidate = false; // (default) pure SSG; uncomment if you want to be explicit

import SpecialOffersGrid from "./SpecialOffersGrid";
import getMenus from "@/app/actions/menus/getMenus";
import getRestaurants from "@/app/actions/restaurants/getRestaurant";

/** Deterministic "shuffle" so build output is stable (no hydration mismatch) */
function stableOrderSpecials(specials) {
  // Sort by (discount desc, price asc, title asc) — tweak as you like
  return [...specials].sort((a, b) => {
    const dA = Number(a?.discountRate || 0);
    const dB = Number(b?.discountRate || 0);
    if (dA !== dB) return dB - dA;

    const pA = Number(a?.price || 0);
    const pB = Number(b?.price || 0);
    if (pA !== pB) return pA - pB;

    return String(a?.title || "").localeCompare(String(b?.title || ""));
  });
}

export default async function SpecialOffers() {
  // ✅ Server-side data fetching at build time (SSG)
  const [menus, restaurants] = await Promise.all([getMenus(), getRestaurants()]);

  const specials = Array.isArray(menus)
    ? menus.filter((m) => m?.isSpecialOffer && Number(m?.discountRate) > 0)
    : [];

  const ordered = stableOrderSpecials(specials).slice(0, 8);

  return (
    <section className="text-black w-full mb-12">
      <div className="container px-4 mx-auto flex flex-col py-8 lg:flex-row gap-8">
        {/* Left: sticky banner (pure static) */}
        <div
          className="w-full lg:w-1/2 rounded-xl overflow-hidden min-h-[400px] lg:h-[calc(100vh-2rem)] bg-cover bg-center mb-8 lg:mb-0 relative lg:sticky lg:top-4"
          style={{
            backgroundImage:
              "url('https://i.ibb.co/S4pQbgpq/fried-chicken-in-orange-background.jpg')",
          }}
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-10 text-white">
            <h2 className="text-3xl pb-24 sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              SEE OUR <span className="text-orange-600">SPECIAL</span> OFFERS
            </h2>
          </div>
        </div>

        {/* Right: client sub-tree that only renders the pre-fetched SSG data */}
        <SpecialOffersGrid specials={ordered} restaurants={Array.isArray(restaurants) ? restaurants : []} />
      </div>
    </section>
  );
}
