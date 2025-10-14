// RestaurantDetailsClient.jsx
"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { FaRegHeart } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";
import toast from "react-hot-toast";

export default function FavRestaurant({ restaurant }) {
  const { data: session } = useSession();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (!session?.user?.id) {
      return setIsFavorite(false);
    }
    async function checkFavorite() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/favRestaurants`,
          {
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch favorites");

        const data = await res.json();

        const exist = data.some(
          (fav) => fav.restaurantId.toString() === restaurant._id.toString()
        );
        setIsFavorite(exist);
      } catch (error) {
        console.error("Failed to fetch favorites", error);
      }
    }
    checkFavorite();
  }, [session, restaurant._id]);

  // toggle
  const handleToggle = async () => {
    if (!session?.user?.id) {
      toast.error("Please login to add favorite");
      return;
    }
    try {
      if (isFavorite) {
        // remove favorite
        const res = await fetch(`/api/favRestaurants?id=${restaurant._id}`, {
          method: "DELETE",
          credentials: "include",
        });
        if (!res.ok) {
          const eraData = await res.json().catch(() => ({}));
          throw new Error(eraData.message || "Failed to remove favorite");
        }
        setIsFavorite(false);
        toast.success("Removed from favorites");
      } else {
        // add favorite
        const res = await fetch("/api/favRestaurants", {
          method: "POST",
          headers: { "content-Type": "application/json" },
          body: JSON.stringify({
            restaurantId: restaurant._id,
            userId: session.user.id,
          }),
          credentials: "include",
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.message || "Failed to add to favorites");
        }

        setIsFavorite(true);
        toast.success("Added to favorite");
      }
    } catch (error) {
      console.error("Favorite toggle failed:", error);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div>
      {/* add to favorite and remove to favorite */}
      <button
        onClick={handleToggle}
        className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1"
      >
        {isFavorite ? (
          <div className="flex items-center gap-1">
            <GoHeartFill size={20} color="orange" />
            <span className=" font-semibold  hidden sm:block">
              Added to Favorite
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <FaRegHeart size={20} color="orange" />
            <span className=" font-semibold hidden sm:block">
              Add to Favorite
            </span>
          </div>
        )}
      </button>
    </div>
  );
}
