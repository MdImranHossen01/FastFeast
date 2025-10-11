"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import MenuModal from "./MenuModal";
import Link from "next/link";
import { generateSlug } from "@/app/restaurants/components/generateSlug";

const MenuCard = ({ menu, restaurants }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurant, setRestaurant] = useState(null);

  // Find the restaurant data based on restaurantId
  useEffect(() => {
    if (restaurants && menu.restaurantId) {
      const foundRestaurant = restaurants.find(r => r._id === menu.restaurantId);
      setRestaurant(foundRestaurant);
    }
  }, [restaurants, menu.restaurantId]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Generate restaurant slug if restaurant exists
  const restaurantSlug = restaurant ? generateSlug(restaurant.name, restaurant.location?.area) : "";

  return (
    <div>
      <div
        key={menu.id}
        className="flex-shrink-0 w-full transform rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
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
            {restaurant?.location?.area || "Location"}
          </div>
          {/* Price Badge - Right Side */}
          <div className="absolute top-2 right-2 bg-orange-500 rounded-full px-2 py-1 text-xs font-bold text-white">
            ৳{menu.price}
          </div>
          {/* Special Offer Badge - Only show if it's a special offer */}
          {menu.isSpecialOffer && (
            <div className="absolute bottom-2 right-2 bg-red-500 rounded-full px-2 py-1 text-xs font-bold text-white">
              {menu.discountRate}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-orange-500">
            {menu.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {menu.description}
          </p>

          {/* Restaurant Info with Add to Cart Button */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              {/* Make restaurant logo and name clickable */}
              {restaurant ? (
                <Link href={`/restaurants/${restaurantSlug}`} className="flex items-center hover:opacity-80 transition-opacity">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={restaurant.logo}
                      alt={restaurant.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-700 font-medium hover:text-orange-500 transition-colors">
                    {restaurant.name}
                  </span>
                </Link>
              ) : (
                <div className="flex items-center">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={menu.imageUrl}
                      alt={menu.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-700 font-medium">
                    Restaurant
                  </span>
                </div>
              )}
            </div>

            {/* Large Circular Add to Cart Button */}
            <button 
              onClick={openModal}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white transition-all duration-300 hover:bg-orange-600 hover:scale-110 shadow-md"
            >
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
      
      {/* Menu Modal */}
      <MenuModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        menu={menu} 
        restaurant={restaurant}
      />
    </div>
  );
};

export default MenuCard;