"use client";

import React, { useEffect, useMemo, useState } from "react";
import MenuCard from "../(menulayout)/menus/components/MenuCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

/* Hide scrollbars utility (kept lightweight & stable for hydration) */
const ScrollbarHideCSS = `
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`;

export default function SpecialOffers() {
  const [allSpecials, setAllSpecials] = useState([]);
  const [offerMenus, setOfferMenus] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [ratings, setRatings] = useState({});

  // Stable lookup for restaurants
  const restaurantMap = useMemo(() => {
    const map = Object.create(null);
    (restaurants || []).forEach((r) => {
      const key = r?._id || r?.id;
      if (key) map[key] = r;
    });
    return map;
  }, [restaurants]);

  // Fetch menus + restaurants, then batch fetch ratings
  useEffect(() => {
    (async () => {
      try {
        const [menusRes, restaurantsRes] = await Promise.all([
          fetch("/api/menus", { cache: "no-store" }),
          fetch("/api/restaurants", { cache: "no-store" }),
        ]);

        const menus = await menusRes.json();
        const rests = await restaurantsRes.json();

        if (Array.isArray(menus)) {
          const specials = menus.filter(
            (m) => m?.isSpecialOffer && Number(m?.discountRate) > 0
          );
          setAllSpecials(specials);
          setRestaurants(Array.isArray(rests) ? rests : []);

          const menuIds = specials.map((m) => m?._id).filter(Boolean);
          if (menuIds.length) {
            const revRes = await fetch("/api/menus/reviews/batch", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ menuIds }),
            });
            if (revRes.ok) {
              const data = await revRes.json();
              if (data?.success && data?.ratings) {
                setRatings(data.ratings);
                try {
                  for (const [id, val] of Object.entries(data.ratings)) {
                    sessionStorage.setItem(`rating-${id}`, JSON.stringify(val));
                  }
                } catch {
                  /* ignore storage quota errors */
                }
              }
            }
          }
        }
      } catch (e) {
        console.error("❌ Failed to fetch specials:", e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Randomize AFTER hydration to avoid SSR/client mismatch
  useEffect(() => {
    if (allSpecials.length) {
      const shuffled = [...allSpecials].sort(() => 0.5 - Math.random());
      setOfferMenus(shuffled.slice(0, 8));
    }
  }, [allSpecials]);

  return (
    <>
      <style>{ScrollbarHideCSS}</style>

      <section className="text-black w-full mb-12">
        <div className="container px-4 mx-auto flex flex-col py-8 lg:flex-row gap-8">
          {/* Left: sticky banner (static markup to avoid hydration drift) */}
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
              {loading ? (
                Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="rounded-xl overflow-hidden shadow-md">
                    <Skeleton height={160} />
                    <div className="p-4">
                      <Skeleton width="60%" height={20} />
                      <Skeleton width="40%" height={20} />
                      <Skeleton count={2} />
                    </div>
                  </div>
                ))
              ) : offerMenus.length ? (
                offerMenus.map((menu) => (
                  <MenuCard
                    key={menu._id}
                    menu={menu}
                    restaurant={
                      restaurantMap[menu?.restaurantId] ||
                      restaurantMap[menu?.restaurant?._id] ||
                      restaurantMap[menu?.restaurant?.id] ||
                      restaurantMap[
                        typeof menu?.restaurant === "string" ? menu.restaurant : ""
                      ] ||
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
        </div>
      </section>
    </>
  );
}
