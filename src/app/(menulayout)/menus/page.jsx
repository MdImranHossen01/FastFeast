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
import getMenus from "@/app/actions/menus/getMenus";
import getRestaurants from "@/app/actions/restaurants/getRestaurant";

const MenuPage = () => {
  const [allMenus, setAllMenus] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const filters = useSelector((state) => state.filters);

  // ✅ Cache data locally to avoid refetch on re-render
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menusData, restaurantsData] = await Promise.all([
          getMenus(),
          getRestaurants(),
        ]);
        setAllMenus(menusData || []);
        setAllRestaurants(restaurantsData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ✅ Create restaurant lookup map once
  const restaurantMap = useMemo(() => {
    const map = Object.create(null);
    allRestaurants.forEach((r) => {
      if (r?._id) map[r._id] = r;
    });
    return map;
  }, [allRestaurants]);

  // ✅ Simplified location extractor
  const getRestaurantLocation = (restaurant) => {
    const loc = restaurant?.location;
    if (!loc) return "";
    if (typeof loc === "string") return loc.toLowerCase();
    if (typeof loc === "object")
      return (
        loc.area ||
        loc.city ||
        loc.address ||
        loc.country ||
        JSON.stringify(loc)
      ).toLowerCase();
    return "";
  };

  // ✅ Filter menus efficiently
  const filteredMenus = useMemo(() => {
    if (!allMenus?.length) return [];
    const query = filters.searchQuery?.toLowerCase() || "";
    const locationFilter = filters.location?.toLowerCase() || "";

    return allMenus.filter((menu) => {
      const restaurant = restaurantMap[menu.restaurantId];
      const rName = restaurant?.name?.toLowerCase() || "";
      const rLoc = getRestaurantLocation(restaurant);

      // Combined string search
      const searchString =
        `${menu.title} ${menu.cuisine} ${menu.description} ${menu.category} ${rName}`.toLowerCase();
      const matchesSearch = !query || searchString.includes(query);
      const matchesLocation = !locationFilter || rLoc.includes(locationFilter);
      const matchesCuisine =
        !filters.selectedCuisines?.length ||
        filters.selectedCuisines.includes(menu.cuisine);
      const matchesRating =
        !filters.selectedRating || menu.rating >= filters.selectedRating;
      const matchesPrice =
        !filters.selectedPrice ||
        (filters.selectedPrice === "$" && menu.price < 300) ||
        (filters.selectedPrice === "$$" &&
          menu.price >= 300 &&
          menu.price < 500) ||
        (filters.selectedPrice === "$$$" &&
          menu.price >= 500 &&
          menu.price < 700) ||
        (filters.selectedPrice === "$$$$" && menu.price >= 700);
      const matchesOffer =
        !filters.isSpecialOfferSelected || menu.isSpecialOffer;
      const matchesCombo = !filters.isComboSelected || menu.isCombo;

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

  if (loading)
    return (
      <div className="text-center py-12 text-gray-500 text-lg">
        Loading menu...
      </div>
    );

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
                  restaurant={restaurantMap[menu.restaurantId]}
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
