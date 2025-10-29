"use client";

import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import ThaiFood from "./ThaiFood";
import ChineseFood from "./ChineseFood";
import IndianFood from "./IndianFood";
import ItalianFood from "./ItalianFood";
import JapaneseFood from "./JapaneseFood";
import KoreanFood from "./KoreanFood";
import TurkishFood from "./TurkishFood";
import MenuCard from "./MenuCard";

// Accept initial data as props from the Server Component
export default function MenuClient({ initialMenus, initialRestaurants }) {
  const filters = useSelector((state) => state.filters);

  // Create restaurant lookup from the passed props
  const restaurantMap = useMemo(() => {
    const map = Object.create(null);
    (initialRestaurants || []).forEach((r) => {
      if (r?._id) map[r._id] = r;
    });
    return map;
  }, [initialRestaurants]);

  // Normalize location (this function can remain as is)
  const getRestaurantLocation = (restaurant) => {
    // ... (keep your existing function here)
    const loc = restaurant?.location;
    if (!loc) return "";
    if (typeof loc === "string") return loc.toLowerCase();
    if (typeof loc === "object") {
      return (
        loc.area ||
        loc.city ||
        loc.address ||
        loc.country ||
        JSON.stringify(loc)
      )
        ?.toString()
        .toLowerCase();
    }
    return "";
  };


  // Filter menus based on Redux state
  const filteredMenus = useMemo(() => {
    if (!initialMenus?.length) return [];
    // ... (keep all your existing filtering logic here, just use 'initialMenus')
    const query = filters.searchQuery?.toLowerCase() || "";
    const locationFilter = filters.location?.toLowerCase() || "";

    return initialMenus.filter((menu) => {
      const restaurant = restaurantMap[menu.restaurantId];

      const rName = restaurant?.name?.toLowerCase() || "";
      const rLoc = getRestaurantLocation(restaurant);

      const searchString = `${menu.title} ${menu.cuisine} ${menu.description} ${menu.category} ${rName}`.toLowerCase();

      const matchesSearch = !query || searchString.includes(query);
      const matchesLocation = !locationFilter || rLoc.includes(locationFilter);
      const matchesCuisine =
        !filters.selectedCuisines?.length ||
        filters.selectedCuisines.includes(menu.cuisine);
      const matchesRating =
        !filters.selectedRating || Number(menu.rating) >= Number(filters.selectedRating);
      const price = Number(menu.price) || 0;
      const matchesPrice =
        !filters.selectedPrice ||
        (filters.selectedPrice === "$" && price < 300) ||
        (filters.selectedPrice === "$$" && price >= 300 && price < 500) ||
        (filters.selectedPrice === "$$$" && price >= 500 && price < 700) ||
        (filters.selectedPrice === "$$$$" && price >= 700);
      const matchesOffer =
        !filters.isSpecialOfferSelected || Boolean(menu.isSpecialOffer);
      const matchesCombo = !filters.isComboSelected || Boolean(menu.isCombo);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesCuisine &&
        matchesRating &&
        matchesPrice &&
        matchesOffer &&
        matchesCombo
      );
    });
  }, [initialMenus, filters, restaurantMap]);

  const hasActiveFilters = Object.values({
    query: filters.searchQuery,
    location: filters.location,
    cuisines: filters.selectedCuisines?.length,
    rating: filters.selectedRating,
    price: filters.selectedPrice,
    offer: filters.isSpecialOfferSelected,
    combo: filters.isComboSelected,
  }).some(Boolean);

  // No need for a loading state, as data is already present
  return (
    <div className="py-4">
      {hasActiveFilters ? (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Search Results ({filteredMenus.length})
          </h2>
          {filteredMenus.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMenus.map((menu) => (
                <MenuCard
                  key={menu._id}
                  menu={menu}
                  restaurant={restaurantMap[menu.restaurantId] || null}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-12">
              No items found matching your criteria.
            </p>
          )}
        </div>
      ) : (
        <>
          {/* Pass the initial, unfiltered data to these components */}
          <ThaiFood menus={initialMenus} restaurants={initialRestaurants} />
          <ChineseFood menus={initialMenus} restaurants={initialRestaurants} />
          <IndianFood menus={initialMenus} restaurants={initialRestaurants} />
          <ItalianFood menus={initialMenus} restaurants={initialRestaurants} />
          <JapaneseFood menus={initialMenus} restaurants={initialRestaurants} />
          <KoreanFood menus={initialMenus} restaurants={initialRestaurants} />
          <TurkishFood menus={initialMenus} restaurants={initialRestaurants} />
        </>
      )}
    </div>
  );
};