"use client";

import React, { useEffect, useState } from "react";
import MenuCard from "../(menulayout)/menus/components/MenuCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// ✅ Scrollbar hide utility
const ScrollbarHideCSS = `
  .scrollbar-hide::-webkit-scrollbar { display: none; }
  .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`;

const SpecialOffers = () => {
  const [allSpecials, setAllSpecials] = useState([]); // All offers before randomizing
  const [offerMenus, setOfferMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch menus (SSR safe)
  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await fetch("/api/menus", { cache: "no-store" });
        const data = await response.json();

        if (Array.isArray(data)) {
          // ✅ Filter only special offer menus
          const specials = data.filter(
            (menu) => menu.isSpecialOffer && menu.discountRate > 0
          );
          setAllSpecials(specials);
        }
      } catch (error) {
        console.error("❌ Failed to fetch menus:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, []);

  // ✅ Randomize AFTER hydration to avoid mismatch
  useEffect(() => {
    if (allSpecials.length > 0) {
      const shuffled = [...allSpecials].sort(() => 0.5 - Math.random());
      setOfferMenus(shuffled.slice(0, 8));
    }
  }, [allSpecials]);

  return (
    <>
      <style>{ScrollbarHideCSS}</style>

      <section className="text-black w-full mb-12">
        <div className="container px-4 mx-auto flex flex-col py-8 lg:flex-row gap-8">
          
          {/* 🔸 Left Section: Banner */}
          <div
            className="w-full lg:w-1/2 rounded-xl overflow-hidden min-h-[400px] lg:h-[calc(100vh-2rem)] bg-cover bg-center mb-8 lg:mb-0 relative lg:sticky lg:top-4"
            style={{
              backgroundImage:
                "url('https://i.ibb.co.com/S4pQbgpq/fried-chicken-in-orange-background.jpg')",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 sm:p-10 text-white">
              <h2 className="text-3xl pb-24 sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                SEE OUR <span className="text-orange-600">SPECIAL</span> OFFERS
              </h2>
            </div>
          </div>

          {/* 🔸 Right Section: Menu Cards */}
          <div className="w-full lg:w-1/2 max-h-screen overflow-y-auto scrollbar-hide lg:max-h-none lg:overflow-visible right-section">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
              
              {loading ? (
                // 🕐 Skeleton Loader while fetching
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
              ) : offerMenus.length > 0 ? (
                offerMenus.map((menu) => (
                  <MenuCard key={menu._id} menu={menu} restaurants={[]} />
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
};

export default SpecialOffers;
