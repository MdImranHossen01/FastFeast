"use client";
import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { toggleCuisine, setRating, setPrice, setTime } from "@/lib/features/filtersSlice";

const SidebarComponent = () => {
  // Connect to Redux
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  // Dummy data for filter options
  const cuisines = ["Thai", "Italian", "Indian", "Chinese", "Japanese", "Biryani"];
  const prices = ["$", "$$", "$$$", "$$$$"];
  const deliveryTimes = ["Under 30 min", "Under 45 min", "Any"];

  return (
    <aside className="sticky top-5 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="border-b pb-2 text-xl font-bold">Filters</h2>

      {/* Cuisine Filter */}
      <div className="my-6">
        <h3 className="mb-2 font-semibold">Cuisine</h3>
        <div className="flex flex-col gap-2">
          {cuisines.map((cuisine) => (
            <label key={cuisine} className="flex cursor-pointer items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.selectedCuisines.includes(cuisine)}
                onChange={() => dispatch(toggleCuisine(cuisine))}
                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-gray-700">{cuisine}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="mb-2 font-semibold">Rating</h3>
        <div className="flex flex-col gap-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex cursor-pointer items-center space-x-2">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.selectedRating === rating}
                onChange={(e) => dispatch(setRating(Number(e.target.value)))}
                className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500"
              />
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

       {/* (The rest of the component remains the same) */}
       {/* NOTE: We've removed the "Apply Filters" button as filtering is now instant. */}
    </aside>
  );
};

export default SidebarComponent;