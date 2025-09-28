"use client";
import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
// Assuming you will add these toggle actions to your filtersSlice
import { 
    toggleCuisine, 
    setRating, 
    setPrice, 
    setTime,
    // Placeholder actions for the new buttons
    toggleFavorite,
    toggleFreeDelivery,
    toggleCombo,
    toggleSpecialOffer
} from "@/lib/features/filtersSlice"; 

const SidebarComponent = () => {
  // Connect to Redux
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  // Dummy data for filter options
  const cuisines = ["Thai", "Italian", "Indian", "Chinese", "Japanese", "Korean", "Turkish"];
  const prices = ["$", "$$", "$$$", "$$$$"]; 
  const deliveryTimes = ["Under 30 min", "Under 45 min", "Any"];

  // New button data
  const quickFilters = [
      // We still use these actions, but the button will look non-toggling
      { name: "My Favourite", action: toggleFavorite, stateKey: 'isFavoriteSelected' },
      { name: "Free Delivery", action: toggleFreeDelivery, stateKey: 'isFreeDeliverySelected' },
      { name: "Combo", action: toggleCombo, stateKey: 'isComboSelected' },
      { name: "Special Offer", action: toggleSpecialOffer, stateKey: 'isSpecialOfferSelected' },
  ];

  return (
    <aside className="sticky top-5 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h2 className="border-b pb-2 text-xl font-bold">Filters</h2>

      {/* Quick Access Buttons - NOW NON-TOGGLING VISUALLY */}
      <div className="my-4 flex flex-wrap gap-2 border-b pb-4">
        {quickFilters.map((filter) => (
          <button
            key={filter.name}
            // The action is still dispatched, but the button's look doesn't depend on the state
            onClick={() => dispatch(filter.action())}
            className="
              px-3 py-1 text-sm font-medium rounded-full transition-colors duration-200 
              bg-gray-100 text-gray-700 border border-gray-300
              hover:bg-gray-200 hover:text-gray-800
            "
          >
            {filter.name}
          </button>
        ))}
      </div>
      
      {/* --- */}

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

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="mb-2 font-semibold">Price Range</h3>
        <div className="flex flex-wrap gap-2">
          {prices.map((priceSymbol) => (
            <label key={priceSymbol} className="flex cursor-pointer items-center">
              <input
                type="radio"
                name="price"
                value={priceSymbol}
                checked={filters.selectedPrice === priceSymbol}
                onChange={() => dispatch(setPrice(priceSymbol))}
                className="peer hidden" 
              />
              <div
                className={`
                  px-3 py-1 rounded-full text-sm font-medium transition-all duration-200
                  ${filters.selectedPrice === priceSymbol 
                    ? 'bg-red-600 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                  }
                `}
              >
                {priceSymbol}
              </div>
            </label>
          ))}
          <button
            onClick={() => dispatch(setPrice(null))}
            className="px-3 py-1 rounded-full text-sm font-medium text-gray-500 border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
          >
            Clear
          </button>
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
      
      {/* Delivery Time Filter (Placeholder) */}
      <div className="mb-6">
        <h3 className="mb-2 font-semibold">Delivery Time</h3>
        <div className="flex flex-col gap-2">
          {deliveryTimes.map((time) => (
             // You would implement a similar input/label structure here
             <div key={time} className="text-gray-700">{time} (Implementation needed)</div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SidebarComponent;