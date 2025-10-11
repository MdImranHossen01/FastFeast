"use client";
import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import Link from "next/link";
import { generateSlug } from "./generateSlug";

export default function RestaurantsCard({ restaurant }) {
  // slug generate
  const slug = generateSlug(restaurant.name, restaurant.location?.area);

  // rating
  const rendersStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }
    if (halfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`empty-${i}`} className="text-gray-200" />);
    }
    return stars;
  };

  return (
    <div className="group bg-white shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden rounded-2xl">
      <div className="p-6">
        {/* Logo and Restaurant Info */}
        <div className="flex flex-col items-center">
          {/* Larger Circular Logo with Border Animation */}
          <div className="relative mb-4">
            <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-orange-300 p-1 bg-white">
              <img
                className="w-full h-full rounded-full object-cover hover:scale-110 transition-transform duration-300"
                src={restaurant.logo}
                alt={restaurant.name}
              />
            </div>
            {/* Pulsing Border Animation */}
            <div className="absolute inset-0 rounded-full border-4 border-orange-300 animate-pulse"></div>
          </div>

          {/* Restaurant Name - Clickable */}
          <Link href={`restaurants/${slug}`} className="text-center hover:text-orange-500 transition-colors">
            <h2 className="text-xl font-bold text-gray-900">
              {restaurant.name}
            </h2>
          </Link>

          {/* Location Area */}
          <div className="flex items-center justify-center text-gray-600 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
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
            <span className="text-sm">
              {restaurant.location?.area || "Location"}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-center mb-3">
            <div className="flex items-center gap-1">
              {rendersStars(restaurant.rating)}
              <span className="font-semibold text-sm">
                {restaurant.rating.toFixed(1)}
              </span>
            </div>
            <p className="text-xs text-gray-500">
              ({restaurant.reviewsCount}+ reviews)
            </p>
          </div>
        </div>

        {/* View Menu Button */}
        <div className="flex justify-center">
          <Link href={`restaurants/${slug}`}>
            <button className="flex items-center gap-2 bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-colors duration-300">
              View Menu
              <svg
                xmlns="http://www.w3.org/2000/2000/svg"
                className="h-5 w-5"
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
      </div>
    </div>
  );
}