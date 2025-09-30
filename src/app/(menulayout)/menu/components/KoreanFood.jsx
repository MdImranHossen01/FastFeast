'use client'; // Add this directive at the top

import React, { useState, useEffect } from "react";
import Image from "next/image";

const KoreanFood = () => {
  const [KoreanMenus, setKoreanMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchKoreanMenus = async () => {
      try {
        // Fetch data from your API endpoint
        const response = await fetch('/api/menu');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const menus = await response.json();
        
        // Filter menus to only show Korean cuisine
        const filteredKoreanMenus = menus.filter((menu) => menu.cuisine === "Korean");
        
        setKoreanMenus(filteredKoreanMenus);
        console.log("Korean menus:", filteredKoreanMenus);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching Korean menus:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKoreanMenus();
  }, []); // Empty dependency array means this runs once on mount

  if (loading) {
    return (
      <section className="mb-12 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Spice Up Your Day with Korea 🇰🇷
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Loading Korean dishes...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mb-12 relative">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Taste of Koreanland 🇹🇭
          </h2>
        </div>
        <div className="text-center py-8">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12 relative">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          Taste of Koreanland 🇹🇭
        </h2>
        <button className="text-orange-500 font-medium text-sm flex items-center hover:text-orange-600 transition-colors">
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
      </div>

      <div className="flex w-full space-x-4 overflow-x-auto scrollbar-hide pb-4">
        {KoreanMenus.map((menu) => (
          // Individual Food Card
          <div
            key={menu.id}
            className="flex-shrink-0 w-72 transform overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="relative h-40 w-full">
              <Image
                src={menu.imageUrl}
                alt={menu.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl"
              />
              {/* Location Badge - Left Side */}
              <div className="absolute top-2 left-2 bg-orange-500 rounded-full px-2 py-1 text-xs font-bold text-white flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {/* {menu.location} */}
              </div>
              {/* Price Badge - Right Side */}
              <div className="absolute top-2 right-2 bg-orange-500 rounded-full px-2 py-1 text-xs font-bold text-white">
                ৳{menu.price}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-orange-500">
                {menu.title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                {menu.description}
              </p>

              {/* Large Circular Add to Cart Button */}
              <div className="mt-3 flex justify-end">
                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white transition-all duration-300 hover:bg-orange-600 hover:scale-110 shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </button>
              </div>
            </div>
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