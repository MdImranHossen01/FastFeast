"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import MenuModal from "./MenuModal";
import Link from "next/link";
import { generateSlug } from "@/app/restaurants/components/generateSlug";
import { useSession } from "next-auth/react";
import { FiStar } from "react-icons/fi";
import getReviews from "@/app/actions/reviews/getReviews";

const MenuCard = ({ menu, restaurants }) => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [averageRating, setAverageRating] = useState(null);
  // const [reviewCount, setReviewCount] = useState(0);
  const [reviews, setReviews] = useState([]);

  // console.log("FROM MENU CARD", reviews);

  // Find the restaurant data based on restaurantId
  useEffect(() => {
    if (restaurants && menu?.restaurantId) {
      const foundRestaurant = restaurants.find(
        (r) => r?._id === menu.restaurantId
      );
      setRestaurant(foundRestaurant || null);
    }
  }, [restaurants, menu?.restaurantId]);

  // Fetch average rating and review count for this menu item
  useEffect(() => {
    const fetchRating = async () => {
      if (!menu?._id) return;

      try {
        const response = await fetch(`/api/menus/${menu._id}/reviews`);
        if (response.ok) {
          const data = await response.json();
          if (data?.success) {
            setAverageRating(data.averageRating);
            setReviewCount(data.totalReviews);
          }
        }
      } catch (error) {
        console.error("Error fetching menu item rating:", error);
      }
    };

    fetchRating();
  }, [menu?._id]);

  // Check if menu is in favorites - FIXED VERSION
  const checkFavoriteStatus = useCallback(async () => {
    if (!session?.user?.id || !menu?._id) {
      setIsFavorite(false);
      return;
    }

    try {
      const response = await fetch("/api/favorites");
      if (!response.ok) {
        console.error("Failed to fetch favorites, status:", response.status);
        return;
      }

      const favorites = await response.json();
      if (!Array.isArray(favorites)) {
        console.error("Favorites data is not an array:", favorites);
        setIsFavorite(false);
        return;
      }

      const isFav = favorites.some(
        (fav) => fav?.menuId?.toString() === menu?._id?.toString()
      );
      setIsFavorite(isFav);
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  }, [session?.user?.id, menu?._id]);

  useEffect(() => {
    checkFavoriteStatus();
  }, [checkFavoriteStatus]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Toggle favorite status (add or remove) with better error handling
  const toggleFavorite = async (e) => {
    e.stopPropagation();

    if (!session) {
      alert("Please login to add favorites");
      return;
    }

    if (!menu?._id) {
      console.error("No menu ID available");
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorite) {
        const response = await fetch(`/api/favorites/${menu._id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setIsFavorite(false);
          console.log(`Successfully removed "${menu.title}" from favorites.`);
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error("Failed to remove from favorites:", errorData);
          alert(
            `Failed to remove from favorites: ${
              errorData.error || "Unknown error"
            }`
          );
        }
      } else {
        console.log("--- Attempting to add to favorites ---");
        console.log("Session User ID:", session.user.id);
        console.log("Menu ID:", menu._id);

        const response = await fetch("/api/favorites", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            menuId: menu._id, // Send only the ID, not the entire menu object
            restaurantId: restaurant?._id,
          }),
        });

        console.log("Received response status:", response.status);

        if (response.ok) {
          setIsFavorite(true);
          console.log(`Successfully added "${menu.title}" to favorites.`);
        } else {
          const errorData = await response.json().catch(() => ({}));
          console.error("--- Failed to add to favorites ---");
          console.error("Server Response:", errorData);
          alert(
            `Failed to add to favorites: ${errorData.error || "Unknown error"}`
          );

          if (response.status === 409) {
            setIsFavorite(true);
          }
        }
      }
    } catch (error) {
      console.error("--- Network or client-side error in toggleFavorite ---");
      console.error(error);
      alert(
        "A network error occurred. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const restaurantSlug = restaurant
    ? generateSlug(restaurant.name, restaurant.location?.area)
    : "";

  return (
    <div>
      <div
        key={menu._id || menu.id}
        className="flex-shrink-0 w-full transform rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        {/* image section */}
        <div className="relative h-40 w-full">
          <Image
            src={menu.imageUrl}
            alt={menu.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="rounded-t-xl object-cover"
            priority={false}
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
          {/* Special Offer Badge */}
          {menu.isSpecialOffer && (
            <div className="absolute bottom-2 right-2 bg-red-500 rounded-full px-2 py-1 text-xs font-bold text-white">
              {menu.discountRate}% OFF
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between">
            {/* Title link */}
            <Link
              href={`/menu/${menu._id}`}
              className="text-lg font-semibold text-orange-500 hover:text-orange-600 transition-colors"
            >
              {menu.title}
            </Link>

            {/* Favorite toggle */}
            <button
              onClick={toggleFavorite}
              disabled={isLoading}
              className={`h-5 w-5 ml-2 transition-colors ${
                isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-colors ${
                  isFavorite
                    ? "text-red-500 fill-red-500"
                    : "text-gray-400 fill-none hover:text-red-500 hover:fill-red-500"
                }`}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>

          {/* Rating */}
          {averageRating && (
            <div className="flex items-center mt-1">
              <div className="flex items-center">
                <FiStar className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm font-medium text-gray-900">
                  {averageRating}
                </span>
                <span className="mx-1 text-gray-300">•</span>
                <span className="text-sm text-gray-500">
                  {reviewCount} review{reviewCount !== 1 ? "s" : ""}
                </span>
              </div>
            </div>
          )}

          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {menu.description}
          </p>

          {/* Restaurant Info + Add to Cart */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              {restaurant ? (
                <Link
                  href={`/restaurants/${restaurantSlug}`}
                  className="flex items-center hover:opacity-80 transition-opacity"
                >
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={restaurant.logo}
                      alt={restaurant.name}
                      fill
                      sizes="32px"
                      className="object-cover"
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
                      fill
                      sizes="32px"
                      className="object-cover"
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
