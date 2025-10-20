"use client";

import Image from "next/image";
import React, { useState, useEffect, useMemo, useRef } from "react";
import MenuModal from "./MenuModal";
import Link from "next/link";
import { generateSlug } from "@/app/restaurants/components/generateSlug";
import { useSession } from "next-auth/react";
import { FiStar } from "react-icons/fi";

const MenuCard = ({ menu, restaurant }) => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [ratingData, setRatingData] = useState({ avg: null, count: 0 });
  const [loadingFavorite, setLoadingFavorite] = useState(false);
  const mountedRef = useRef(true);

  const restaurantSlug = useMemo(() => {
    if (!restaurant?.name) return "";
    return generateSlug(restaurant.name, restaurant.location?.area);
  }, [restaurant]);

  /** ✅ Fetch Reviews (cached per menu ID) */
  useEffect(() => {
    mountedRef.current = true;
    if (!menu?._id) return;
    const cached = sessionStorage.getItem(`rating-${menu._id}`);
    if (cached) {
      const data = JSON.parse(cached);
      setRatingData(data);
      return;
    }

    fetch(`/api/menus/${menu._id}/reviews`)
      .then((res) => res.json())
      .then((data) => {
        if (mountedRef.current && data?.success) {
          const payload = {
            avg: data.averageRating,
            count: data.totalReviews,
          };
          setRatingData(payload);
          sessionStorage.setItem(`rating-${menu._id}`, JSON.stringify(payload));
        }
      })
      .catch((err) => console.error("Review fetch failed:", err));

    return () => {
      mountedRef.current = false;
    };
  }, [menu?._id]);

  /** ✅ Fetch Favorite Status */
  useEffect(() => {
    if (!session?.user?.id || !menu?._id) return;
    fetch(`/api/favorites?menuId=${menu._id}`)
      .then((res) => res.json())
      .then((data) => {
        if (mountedRef.current) setIsFavorite(Boolean(data?.isFavorite));
      })
      .catch(() => setIsFavorite(false));
  }, [session?.user?.id, menu?._id]);

  /** ✅ Toggle Favorite (Optimistic UI) */
  const toggleFavorite = async (e) => {
    e.stopPropagation();
    if (!session) return alert("Please login to manage favorites");
    if (loadingFavorite) return;

    setLoadingFavorite(true);
    const newState = !isFavorite;
    setIsFavorite(newState); // optimistic UI

    try {
      const res = await fetch("/api/favorites", {
        method: newState ? "POST" : "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          menuId: menu._id,
          restaurantId: restaurant?._id,
        }),
      });

      if (!res.ok) throw new Error("Failed to update favorite");
    } catch (err) {
      console.error("Favorite toggle failed:", err);
      setIsFavorite(!newState); // revert on error
    } finally {
      setLoadingFavorite(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all">
      {/* Image */}
      <div className="relative h-40 w-full">
        <Image
          src={menu.imageUrl || "/images/placeholder-food.jpg"}
          alt={menu.title}
          fill
          className="rounded-t-xl object-cover"
          unoptimized
        />
        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {restaurant?.location?.area || "Unknown"}
        </div>
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          ৳{menu.price}
        </div>
        {menu.isSpecialOffer && (
          <div className="absolute bottom-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {menu.discountRate}% OFF
          </div>
        )}
      </div>

      {/* Details */}
      <div className="p-4">
        <div className="flex justify-between items-center">
          <Link
            href={`/menu/${menu._id}`}
            className="text-orange-500 font-semibold hover:text-orange-600"
          >
            {menu.title}
          </Link>

          <button
            onClick={toggleFavorite}
            disabled={loadingFavorite}
            aria-label="toggle favorite"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transition-all duration-200 ${
                isFavorite
                  ? "text-red-500 fill-red-500 scale-110"
                  : "text-gray-400 hover:text-red-500"
              }`}
              viewBox="0 0 24 24"
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

        {/* Ratings */}
        {ratingData.avg !== null && ratingData.count > 0 ? (
          <div className="flex items-center mt-1 text-sm text-gray-700">
            <FiStar className="text-yellow-400 mr-1" />
            {ratingData.avg.toFixed(1)} ({ratingData.count})
          </div>
        ) : (
          <p className="text-sm text-gray-400 mt-1">No ratings yet</p>
        )}

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">
          {menu.description}
        </p>

        {/* Restaurant Info */}
        <div className="flex justify-between items-center mt-3">
          {restaurant && (
            <Link
              href={`/restaurants/${restaurantSlug}`}
              className="flex items-center"
            >
              <Image
                src={restaurant.logo || "/images/placeholder-restaurant.jpg"}
                alt={restaurant.name}
                width={28}
                height={28}
                className="rounded-full object-cover"
              />
              <span className="ml-2 text-sm text-gray-700 font-medium hover:text-orange-500">
                {restaurant.name}
              </span>
            </Link>
          )}

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-white shadow-md transition-transform hover:scale-105"
          >
            +
          </button>
        </div>
      </div>

      {/* Modal */}
      <MenuModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        menu={menu}
        restaurant={restaurant}
      />
    </div>
  );
};

export default MenuCard;
