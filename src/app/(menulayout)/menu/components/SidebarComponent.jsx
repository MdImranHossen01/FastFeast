"use client";
import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { 
    toggleCuisine, 
    setRating, 
    setPrice, 
    setTime,
    toggleFavorite,
    toggleFreeDelivery,
    toggleCombo,
    toggleSpecialOffer,
    clearFilters
} from "@/lib/features/filtersSlice"; 

const SidebarComponent = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  // Filter options data
  const cuisines = ["Thai", "Italian", "Indian", "Chinese", "Japanese", "Korean", "Turkish"];
  const prices = [
    { symbol: "$", range: "Under ৳300" },
    { symbol: "$$", range: "৳300 - ৳500" },
    { symbol: "$$$", range: "৳500 - ৳700" },
    { symbol: "$$$$", range: "Over ৳700" }
  ]; 
  const deliveryTimes = [
    { value: "30", label: "Under 30 min" },
    { value: "45", label: "Under 45 min" },
    { value: "any", label: "Any" }
  ];

  // Quick filter buttons with icons
  const quickFilters = [
    { 
      name: "My Favourite", 
      action: toggleFavorite, 
      stateKey: 'isFavoriteSelected',
      icon: "❤️",
      active: filters.isFavoriteSelected
    },
    { 
      name: "Free Delivery", 
      action: toggleFreeDelivery, 
      stateKey: 'isFreeDeliverySelected',
      icon: "🚚",
      active: filters.isFreeDeliverySelected
    },
    { 
      name: "Combo", 
      action: toggleCombo, 
      stateKey: 'isComboSelected',
      icon: "🍱",
      active: filters.isComboSelected
    },
    { 
      name: "Special Offer", 
      action: toggleSpecialOffer, 
      stateKey: 'isSpecialOfferSelected',
      icon: "🔥",
      active: filters.isSpecialOfferSelected
    },
  ];

  // Check if any filters are active
  const isAnyFilterActive = 
    filters.searchQuery || 
    filters.location || 
    filters.selectedCuisines.length > 0 || 
    filters.selectedRating > 0 || 
    filters.selectedPrice || 
    filters.selectedTime || 
    filters.isFavoriteSelected || 
    filters.isFreeDeliverySelected || 
    filters.isComboSelected || 
    filters.isSpecialOfferSelected;

  return (
    <aside className="sticky top-5 w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      {/* Header with Clear All button */}
      <div className="flex justify-between items-center border-b pb-3 mb-4">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        {isAnyFilterActive && (
          <button 
            onClick={() => dispatch(clearFilters())}
            className="text-sm text-orange-600 hover:text-orange-700 font-medium transition-colors duration-200"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Quick Access Buttons */}
      <div className="mb-6">
        <h3 className="mb-3 font-semibold text-gray-800">Quick Filters</h3>
        <div className="flex flex-wrap gap-2">
          {quickFilters.map((filter) => (
            <button
              key={filter.name}
              onClick={() => dispatch(filter.action())}
              className={`
                px-3 py-2 text-sm font-medium rounded-full transition-all duration-200 border flex items-center gap-1
                ${filter.active 
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md transform scale-105' 
                  : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200 hover:border-gray-400'
                }
              `}
            >
              <span className="text-xs">{filter.icon}</span>
              {filter.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* Cuisine Filter */}
      <div className="mb-6">
        <h3 className="mb-3 font-semibold text-gray-800">Cuisine</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {cuisines.map((cuisine) => (
            <label 
              key={cuisine} 
              className="flex cursor-pointer items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <input
                type="checkbox"
                checked={filters.selectedCuisines.includes(cuisine)}
                onChange={() => dispatch(toggleCuisine(cuisine))}
                className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500 transition-colors duration-200"
              />
              <span className="text-gray-700 flex-1">{cuisine}</span>
              {filters.selectedCuisines.includes(cuisine) && (
                <span className="text-orange-600 text-sm font-medium">✓</span>
              )}
            </label>
          ))}
        </div>
        {filters.selectedCuisines.length > 0 && (
          <div className="mt-2 text-xs text-orange-600 font-medium">
            {filters.selectedCuisines.length} selected
          </div>
        )}
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h3 className="mb-3 font-semibold text-gray-800">Price Range</h3>
        <div className="space-y-2">
          {prices.map((price) => (
            <label 
              key={price.symbol} 
              className="flex cursor-pointer items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <input
                type="radio"
                name="price"
                value={price.symbol}
                checked={filters.selectedPrice === price.symbol}
                onChange={() => dispatch(setPrice(price.symbol))}
                className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500 transition-colors duration-200"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{price.symbol}</span>
                  {filters.selectedPrice === price.symbol && (
                    <span className="text-orange-600 text-sm font-medium">✓</span>
                  )}
                </div>
                <div className="text-xs text-gray-500 mt-1">{price.range}</div>
              </div>
            </label>
          ))}
        </div>
        {filters.selectedPrice && (
          <div className="mt-2 text-xs text-orange-600 font-medium">
            {prices.find(p => p.symbol === filters.selectedPrice)?.range}
          </div>
        )}
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <h3 className="mb-3 font-semibold text-gray-800">Minimum Rating</h3>
        <div className="space-y-2">
          {[4, 3, 2, 1].map((rating) => (
            <label 
              key={rating} 
              className="flex cursor-pointer items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={filters.selectedRating === rating}
                onChange={(e) => dispatch(setRating(Number(e.target.value)))}
                className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500 transition-colors duration-200"
              />
              <div className="flex items-center space-x-2 flex-1">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600 ml-2">& Up</span>
                {filters.selectedRating === rating && (
                  <span className="text-orange-600 text-sm font-medium ml-auto">✓</span>
                )}
              </div>
            </label>
          ))}
        </div>
        {filters.selectedRating > 0 && (
          <div className="mt-2 text-xs text-orange-600 font-medium">
            {filters.selectedRating}+ stars
          </div>
        )}
      </div>

      {/* Delivery Time Filter */}
      <div className="mb-6">
        <h3 className="mb-3 font-semibold text-gray-800">Delivery Time</h3>
        <div className="space-y-2">
          {deliveryTimes.map((time) => (
            <label 
              key={time.value} 
              className="flex cursor-pointer items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <input
                type="radio"
                name="deliveryTime"
                value={time.value}
                checked={filters.selectedTime === time.value}
                onChange={(e) => dispatch(setTime(e.target.value))}
                className="h-4 w-4 border-gray-300 text-orange-600 focus:ring-orange-500 transition-colors duration-200"
              />
              <div className="flex items-center justify-between flex-1">
                <span className="text-gray-700">{time.label}</span>
                {filters.selectedTime === time.value && (
                  <span className="text-orange-600 text-sm font-medium">✓</span>
                )}
              </div>
            </label>
          ))}
        </div>
        {filters.selectedTime && (
          <div className="mt-2 text-xs text-orange-600 font-medium">
            {deliveryTimes.find(t => t.value === filters.selectedTime)?.label}
          </div>
        )}
      </div>

      {/* Active Filters Summary */}
      {isAnyFilterActive && (
        <div className="mt-6 p-3 bg-orange-50 rounded-lg border border-orange-200">
          <h4 className="text-sm font-semibold text-orange-800 mb-2">Active Filters:</h4>
          <div className="space-y-1">
            {filters.searchQuery && (
              <div className="text-xs text-orange-700">Search: "{filters.searchQuery}"</div>
            )}
            {filters.location && (
              <div className="text-xs text-orange-700">Location: {filters.location}</div>
            )}
            {filters.selectedCuisines.length > 0 && (
              <div className="text-xs text-orange-700">
                Cuisines: {filters.selectedCuisines.join(", ")}
              </div>
            )}
            {filters.selectedRating > 0 && (
              <div className="text-xs text-orange-700">
                Rating: {filters.selectedRating}+ stars
              </div>
            )}
            {filters.selectedPrice && (
              <div className="text-xs text-orange-700">
                Price: {filters.selectedPrice}
              </div>
            )}
            {filters.selectedTime && (
              <div className="text-xs text-orange-700">
                Time: {deliveryTimes.find(t => t.value === filters.selectedTime)?.label}
              </div>
            )}
            {filters.isFavoriteSelected && (
              <div className="text-xs text-orange-700">My Favourites</div>
            )}
            {filters.isFreeDeliverySelected && (
              <div className="text-xs text-orange-700">Free Delivery</div>
            )}
            {filters.isComboSelected && (
              <div className="text-xs text-orange-700">Combo Meals</div>
            )}
            {filters.isSpecialOfferSelected && (
              <div className="text-xs text-orange-700">Special Offers</div>
            )}
          </div>
        </div>
      )}

      {/* Reset Button at Bottom */}
      {isAnyFilterActive && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            onClick={() => dispatch(clearFilters())}
            className="w-full py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 border border-gray-300"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </aside>
  );
};

export default SidebarComponent;