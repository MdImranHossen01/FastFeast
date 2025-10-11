"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import MenuCard from "../../menu/components/MenuCard";
import getMenu from "@/app/actions/menu/getMenu";
import getRestaurant from "@/app/actions/restaurant/getRestaurant";

const JapaneseFood = () => {
  const [japaneseMenus, setJapaneseMenus] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both menus and restaurants data
        const [menusData, restaurantsData] = await Promise.all([
          getMenu(),
          getRestaurant()
        ]);
        
        // Filter Japanese cuisine menus
        const filteredMenus = menusData.filter((menu) => menu.cuisine === "Japanese");
        setJapaneseMenus(filteredMenus);
        setRestaurants(restaurantsData);
        
        console.log("Japanese menus:", filteredMenus);
        console.log("Restaurants:", restaurantsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="mb-12 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Discover the Art of Japan 🇯🇵
          </h2>
          <Link href={"/japanesefood"}>
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
          <p className="text-gray-500 text-lg">Loading...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Discover the Art of Japan 🇯🇵
        </h2>
        <Link href={"/japanesefood"}>
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
        {japaneseMenus.length > 0 ? (
          japaneseMenus.map((menu) => (
            <div key={menu?._id} className="flex-shrink-0 w-64">
              <MenuCard menu={menu} restaurants={restaurants} />
            </div>
          ))
        ) : (
          <div className="text-center py-12 w-full">
            <p className="text-gray-500 text-lg">
              No dishes available at the moment.
            </p>
          </div>
        )}
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

export default JapaneseFood;