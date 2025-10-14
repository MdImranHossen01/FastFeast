"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MenuCard from "../../menu/components/MenuCard";
import getMenu from "@/app/actions/menus/getMenus";
import getRestaurant from "@/app/actions/restaurants/getRestaurant";
import { useSelector } from "react-redux";

const KoreanFood = ({ menus: propMenus, restaurants: propRestaurants }) => {
  const [koreanMenus, setKoreanMenus] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get filters from Redux to check if we should hide this section
  const filters = useSelector((state) => state.filters);
  const hasActiveFilters = filters.searchQuery || 
    filters.selectedCuisines.length > 0 || 
    filters.selectedRating > 0 || 
    filters.selectedPrice || 
    filters.isSpecialOfferSelected || 
    filters.isComboSelected;

  useEffect(() => {
    // If props are provided, use them (for better performance)
    if (propMenus && propRestaurants) {
      const filteredMenus = propMenus.filter((menu) => menu.cuisine === "Korean");
      setKoreanMenus(filteredMenus);
      setRestaurants(propRestaurants);
      setLoading(false);
      return;
    }

    // Otherwise fetch data independently
    const fetchData = async () => {
      try {
        const [menusData, restaurantsData] = await Promise.all([
          getMenu(),
          getRestaurant()
        ]);
        
        // Filter Korean cuisine menus
        const filteredMenus = menusData.filter((menu) => menu.cuisine === "Korean");
        setKoreanMenus(filteredMenus);
        setRestaurants(restaurantsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propMenus, propRestaurants]);

  // Hide this section when filters are active
  if (hasActiveFilters) {
    return null;
  }

  if (loading) {
    return (
      <section className="mb-12 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Spice Up Your Day with Korea 🇰🇷
          </h2>
          <Link href={"/koreanfood"}>
            <button className="text-orange-500 cursor-pointer font-medium text-sm flex items-center hover:text-orange-600 transition-colors">
              See More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading Korean cuisine...</p>
        </div>
      </section>
    );
  }

  if (koreanMenus.length === 0) {
    return null; // Don't show section if no Korean food available
  }

  return (
    <section className="mb-12 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Spice Up Your Day with Korea 🇰🇷
        </h2>
        <Link href={"/koreanfood"}>
          <button className="text-orange-500 cursor-pointer font-medium text-sm flex items-center hover:text-orange-600 transition-colors">
            See More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </Link>
      </div>

      <div className="flex w-full space-x-4 overflow-x-auto scrollbar-hide pb-4">
        {koreanMenus.map((menu) => (
          <div key={menu?._id} className="flex-shrink-0 w-64">
            <MenuCard menu={menu} restaurants={restaurants} />
          </div>
        ))}
      </div>

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default KoreanFood;