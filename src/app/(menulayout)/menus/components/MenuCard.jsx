"use client";

import Image from "next/image";
import React, {
  useState,
  useEffect,
  useMemo,
  useRef,
  useCallback,
  memo,
} from "react";
import MenuModal from "./MenuModal";
import Link from "next/link";
import { generateSlug } from "@/app/restaurants/components/generateSlug";
import { useSession } from "next-auth/react";
import { FiStar } from "react-icons/fi";
import { toast } from "react-hot-toast";

const MenuCard = ({
  menu,
  restaurant,
  ratingData = { avg: null, count: 0 },
}) => {
  const { data: session } = useSession();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loadingFavorite, setLoadingFavorite] = useState(false);

  const mountedRef = useRef(true);
  const lastRatingRef = useRef(null);
  const lastFavoriteRef = useRef(null);

  const menuId = useMemo(() => menu?._id, [menu?._id]);
  const userId = useMemo(() => session?.user?.id, [session?.user?.id]);

  const restaurantSlug = useMemo(() => {
    if (!restaurant?.name) return "";
    return generateSlug(restaurant.name, restaurant.location?.area);
  }, [restaurant?.name, restaurant?.location?.area]);

  /** ✅ Fetch Favorite Status */
  useEffect(() => {
    if (!userId || !menuId) return;

    const fetchFavoriteStatus = async () => {
      try {
        const res = await fetch(`/api/favorites?menuId=${menuId}`);
        if (!res.ok) throw new Error("Failed to fetch favorite status");
        const data = await res.json();

        if (mountedRef.current) {
          const newFav = Boolean(data?.isFavorite);
          if (lastFavoriteRef.current !== newFav) {
            lastFavoriteRef.current = newFav;
            setIsFavorite(newFav);
          }
        }
      } catch (err) {
        console.error("Favorite fetch failed:", err);
      }
    };

    fetchFavoriteStatus();
  }, [userId, menuId]);

  /** ✅ Toggle Favorite (Optimistic UI + stable callback) */
  const toggleFavorite = useCallback(
    async (e) => {
      e.stopPropagation();
      if (!session) return toast.error("Please login to manage favorites");
      if (loadingFavorite) return;

      const newState = !isFavorite;
      setIsFavorite(newState);
      setLoadingFavorite(true);

      try {
        const res = await fetch("/api/favorites", {
          method: newState ? "POST" : "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            menuId,
            restaurantId: restaurant?._id,
          }),
        });

        if (!res.ok) throw new Error("Favorite toggle failed");
        toast.success(
          newState ? "Added to favorites!" : "Removed from favorites!"
        );
      } catch (err) {
        console.error(err);
        setIsFavorite(!newState);
        toast.error("Failed to update favorite.");
      } finally {
        setLoadingFavorite(false);
      }
    },
    [session, isFavorite, loadingFavorite, menuId, restaurant?._id]
  );

  const openMenuModal = useCallback(() => setIsModalOpen(true), []);
  const closeMenuModal = useCallback(() => setIsModalOpen(false), []);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden">
      {/* Image */}
      <div className="relative h-40 w-full">
        <Image
          src={menu.imageUrl || "/images/placeholder-food.jpg"}
          alt={menu.title}
          fill
          className="rounded-t-xl object-cover"
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

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <Link
            href={`/menus/${menuId}`}
            className="text-lg font-semibold text-orange-600 hover:text-orange-700 line-clamp-1"
          >
            {menu.title}
          </Link>

          <button
            onClick={toggleFavorite}
            disabled={loadingFavorite}
            aria-label="toggle favorite"
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-6 w-6 transition-all duration-200 ${
                isFavorite
                  ? "text-red-500 fill-red-500 scale-110"
                  : "text-gray-400 hover:text-red-500"
              }`}
              viewBox="0 0 24 24"
              strokeWidth={2}
              fill="none"
              stroke="currentColor"
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
        {ratingData.avg !== null &&
        ratingData.avg > 0 &&
        ratingData.count > 0 ? (
          <div className="flex items-center mt-1 text-sm text-gray-700">
            <FiStar className="text-yellow-400 mr-1" />
            <span>{ratingData.avg.toFixed(1)}</span>
            <span className="ml-1 text-gray-500">({ratingData.count})</span>
          </div>
        ) : (
          <p className="text-sm text-gray-400 mb-2">No ratings yet</p>
        )}

        <p className="text-sm text-gray-600 line-clamp-2">{menu.description}</p>

        <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
          {restaurant && (
            <Link
              href={`/restaurants/${restaurantSlug}`}
              className="flex items-center"
            >
              <Image
                src={restaurant.logo || "/images/placeholder-restaurant.jpg"}
                alt={restaurant.name}
                width={32}
                height={32}
                className="rounded-full object-cover border border-gray-200"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 hover:text-orange-500">
                {restaurant.name}
              </span>
            </Link>
          )}
          <button
            onClick={openMenuModal}
            className="w-10 h-10 bg-orange-500 hover:bg-orange-600 rounded-full flex items-center justify-center text-white text-xl shadow-md transition-transform hover:scale-105"
          >
            +
          </button>
        </div>
      </div>

      {isModalOpen && (
        <MenuModal
          isOpen={isModalOpen}
          onClose={closeMenuModal}
          menu={menu}
          restaurant={restaurant}
        />
      )}
    </div>
  );
};

export default MenuCard;
