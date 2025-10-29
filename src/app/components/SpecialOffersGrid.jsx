// src/app/components/SpecialOffersGrid.jsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import MenuCard from "../(menulayout)/menus/components/MenuCard";

/* Optional: tiny utility to hide scrollbars */
const ScrollbarHideCSS = `
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`;

export default function SpecialOffersGrid({ specials, restaurants }) {
  // We already have SSG data; no loading states needed for menus/restaurants
  const [ratings, setRatings] = useState({}); // optional client enhancement

  // Build lookup map once
  const restaurantMap = useMemo(() => {
    const map = Object.create(null);
    (restaurants || []).forEach((r) => {
      const id = r?._id || r?.id;
      if (id) map[id] = r;
    });
    return map;
  }, [restaurants]);

  // OPTIONAL: fetch ratings on client (non-blocking, keeps section static-fast)
  useEffect(() => {
    const ids = (specials || []).map((m) => m?._id).filter(Boolean);
    if (!ids.length) return;

    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/menus/reviews/batch", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ menuIds: ids }),
        });
        if (!res.ok) return;

        const data = await res.json();
        if (!cancelled && data?.success && data?.ratings) {
          setRatings(data.ratings);
        }
      } catch {
        // ignore
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [specials]);

  return (
    <>
      <style>{ScrollbarHideCSS}</style>

      {/* Right: scrollable cards (Lenis-friendly) */}
      <div
        className="
          w-full lg:w-1/2
          lg:max-h-[calc(100vh-2rem)]
          overflow-y-auto lg:overflow-y-auto
          scrollbar-hide pr-1
          right-section
        "
        data-lenis-prevent
        style={{ WebkitOverflowScrolling: "touch" }}
        role="region"
        aria-label="Special offer menus"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
          {specials?.length ? (
            specials.map((menu) => (
              <MenuCard
                key={menu._id}
                menu={menu}
                restaurant={
                  restaurantMap[menu?.restaurantId] ||
                  restaurantMap[menu?.restaurant?._id] ||
                  restaurantMap[menu?.restaurant?.id] ||
                  restaurantMap[typeof menu?.restaurant === "string" ? menu.restaurant : ""] ||
                  null
                }
                ratingData={ratings[menu._id] || { avg: null, count: 0 }}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-2">
              No special offers available right now.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
