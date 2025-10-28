"use client";

import React, { useState, useEffect, useMemo } from "react";
import ThaiFood from "./components/ThaiFood";
import ChineseFood from "./components/ChineseFood";
import IndianFood from "./components/IndianFood";
import ItalianFood from "./components/ItalianFood";
import JapaneseFood from "./components/JapaneseFood";
import KoreanFood from "./components/KoreanFood";
import TurkishFood from "./components/TurkishFood";
import { useSelector } from "react-redux";
import MenuCard from "./components/MenuCard";

const MenuPage = () => {
  const [allMenus, setAllMenus] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const filters = useSelector((state) => state.filters);

  // Fetch menus + restaurants from API (client-side, works in prod)
  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        const [menusRes, restaurantsRes] = await Promise.all([
          fetch("/api/menus", { cache: "no-store", signal: controller.signal }),
          fetch("/api/restaurants", {
            cache: "no-store",
            signal: controller.signal,
          }),
        ]);

        const menusData = await menusRes.json();
        const restaurantsData = await restaurantsRes.json();

        setAllMenus(Array.isArray(menusData) ? menusData : []);
        setAllRestaurants(Array.isArray(restaurantsData) ? restaurantsData : []);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching menus/restaurants:", err);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();
    return () => controller.abort();
  }, []);

  // Create restaurant lookup
  const restaurantMap = useMemo(() => {
    const map = Object.create(null);
    (allRestaurants || []).forEach((r) => {
      const id = r?._id || r?.id;
      if (id) map[id] = r;
    });
    return map;
  }, [allRestaurants]);

  // Normalize location
  const getRestaurantLocation = (restaurant) => {
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

  // Filter menus
  const filteredMenus = useMemo(() => {
    if (!allMenus?.length) return [];
    const query = filters.searchQuery?.toLowerCase() || "";
    const locationFilter = filters.location?.toLowerCase() || "";

    return allMenus.filter((menu) => {
      const restaurant =
        restaurantMap[menu.restaurantId] ||
        restaurantMap[menu?.restaurant?._id] ||
        restaurantMap[menu?.restaurant?.id] ||
        restaurantMap[
          typeof menu?.restaurant === "string" ? menu.restaurant : ""
        ];

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
  }, [allMenus, filters, restaurantMap]);

  const hasActiveFilters = Object.values({
    query: filters.searchQuery,
    location: filters.location,
    cuisines: filters.selectedCuisines?.length,
    rating: filters.selectedRating,
    price: filters.selectedPrice,
    offer: filters.isSpecialOfferSelected,
    combo: filters.isComboSelected,
  }).some(Boolean);

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500 text-lg">
        Loading menu...
      </div>
    );
  }

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
                  restaurant={
                    restaurantMap[menu.restaurantId] ||
                    restaurantMap[menu?.restaurant?._id] ||
                    restaurantMap[menu?.restaurant?.id] ||
                    restaurantMap[
                      typeof menu?.restaurant === "string" ? menu.restaurant : ""
                    ] ||
                    null
                  }
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
          <ThaiFood menus={allMenus} restaurants={allRestaurants} />
          <ChineseFood menus={allMenus} restaurants={allRestaurants} />
          <IndianFood menus={allMenus} restaurants={allRestaurants} />
          <ItalianFood menus={allMenus} restaurants={allRestaurants} />
          <JapaneseFood menus={allMenus} restaurants={allRestaurants} />
          <KoreanFood menus={allMenus} restaurants={allRestaurants} />
          <TurkishFood menus={allMenus} restaurants={allRestaurants} />
        </>
      )}
    </div>
  );
};

export default MenuPage;
