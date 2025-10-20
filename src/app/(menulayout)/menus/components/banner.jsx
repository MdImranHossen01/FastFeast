// src/app/(menulayout)/menu/components/banner.jsx
"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { 
  setSearchQuery, 
  setLocation, 
  clearFilters,
  toggleCuisine,
  setRating,
  setPrice,
  setTime,
  toggleFavorite,
  toggleFreeDelivery,
  toggleCombo,
  toggleSpecialOffer
} from "@/lib/features/filtersSlice";

// --- SVG Icons ---
const LocationIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#FF7E8B"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    aria-hidden="true"
    className="mr-2 flex-shrink-0"
  >
    <path d="M10.2 0.42c-4.5 0-8.2 3.7-8.2 8.3 0 6.2 7.5 11.3 7.8 11.6 0.2 0.1 0.3 0.1 0.4 0.1s0.3 0 0.4-0.1c0.3-0.2 7.8-5.3 7.8-11.6 0.1-4.6-3.6-8.3-8.2-8.3zM10.2 11.42c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.7 0 3 1.3 3 3s-1.3 3-3 3z"></path>
  </svg>
);
const CaretDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#4F4F4F"
    width="12"
    height="12"
    viewBox="0 0 20 20"
    aria-hidden="true"
    className="flex-shrink-0"
  >
    <path d="M20 5.42l-10 10-10-10h20z"></path>
  </svg>
);
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#828282"
    width="18"
    height="18"
    viewBox="0 0 20 20"
    aria-hidden="true"
    className="mr-2 flex-shrink-0"
  >
    <path d="M19.78 19.12l-3.88-3.9c1.28-1.6 2.080-3.6 2.080-5.8 0-5-3.98-9-8.98-9s-9 4-9 9c0 5 4 9 9 9 2.2 0 4.2-0.8 5.8-2.1l3.88 3.9c0.1 0.1 0.3 0.2 0.5 0.2s0.4-0.1 0.5-0.2c0.4-0.3 0.4-0.8 0.1-1.1zM1.5 9.42c0-4.1 3.4-7.5 7.5-7.5s7.48 3.4 7.48 7.5-3.38 7.5-7.48 7.5c-4.1 0-7.5-3.4-7.5-7.5z"></path>
  </svg>
);
const ClearIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="#FFFFFF"
    width="16"
    height="16"
    viewBox="0 0 20 20"
    aria-hidden="true"
    className="flex-shrink-0"
  >
    <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"></path>
  </svg>
);

// --- Main Banner Component ---
const Banner = () => {
  const dispatch = useDispatch();
  const { 
    searchQuery, 
    location, 
    selectedCuisines, 
    selectedRating, 
    selectedPrice, 
    selectedTime,
    isFavoriteSelected,
    isFreeDeliverySelected,
    isComboSelected,
    isSpecialOfferSelected
  } = useSelector((state) => state.filters);

  // State to manage dropdown visibility
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const locationDropdownRef = useRef(null);

  // A list of available locations
  const availableLocations = [
    "Dhanmondi",
    "Mirpur",
    "Uttara",
    "Banani",
    "Gulshan",
  ];

  // Handle clicking a location from the dropdown
  const handleLocationSelect = (selectedLocation) => {
    dispatch(setLocation(selectedLocation));
    setIsLocationOpen(false); // Close dropdown after selection
  };

  // Clear all filters
  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        locationDropdownRef.current &&
        !locationDropdownRef.current.contains(event.target)
      ) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Check if there are any active filters
  const hasActiveFilters = 
    searchQuery || 
    location || 
    selectedCuisines.length > 0 || 
    selectedRating > 0 || 
    selectedPrice || 
    selectedTime ||
    isFavoriteSelected ||
    isFreeDeliverySelected ||
    isComboSelected ||
    isSpecialOfferSelected;

  return (
    <div className="relative h-[200px] w-full">
      <Image
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1170"
        alt="Food banner"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4">
        <div className="flex w-full max-w-3xl items-center rounded-lg bg-orange-500/50 p-3 shadow-lg">
          {/* Location Input Section */}
          <div className="relative w-2/5" ref={locationDropdownRef}>
            <div
              className="flex items-center pr-2 cursor-pointer"
              onClick={() => setIsLocationOpen(!isLocationOpen)}
            >
              <LocationIcon />
              <input
                type="text"
                placeholder="Select Location"
                value={location}
                readOnly // Make input read-only to force selection from dropdown
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white cursor-pointer"
              />
              <CaretDownIcon />
            </div>

            {/* Location Dropdown List */}
            {isLocationOpen && (
              <div className="absolute top-full mt-2 w-full rounded-md bg-orange-500/30 shadow-lg z-10 border border-orange-500/30">
                <ul>
                  {availableLocations.map((loc) => (
                    <li
                      key={loc}
                      onClick={() => handleLocationSelect(loc)}
                      className="px-4 py-2 text-sm text-white hover:bg-orange-600 cursor-pointer"
                    >
                      {loc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="h-6 border-l border-gray-300"></div>

          {/* Search Input Section */}
          <div className="flex flex-1 items-center pl-4">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search for restaurant, cuisine or a dish"
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white"
            />
          </div>

          {/* Clear Filters Button */}
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="ml-2 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              aria-label="Clear filters"
            >
              <ClearIcon />
            </button>
          )}
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-3 flex flex-wrap gap-2 justify-center">
            {searchQuery && (
              <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                <span>Search: {searchQuery}</span>
                <button
                  onClick={() => dispatch(setSearchQuery(""))}
                  className="ml-1"
                  aria-label="Clear search"
                >
                  <ClearIcon />
                </button>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                <span>Location: {location}</span>
                <button
                  onClick={() => dispatch(setLocation(""))}
                  className="ml-1"
                  aria-label="Clear location"
                >
                  <ClearIcon />
                </button>
              </div>
            )}
            {selectedCuisines.length > 0 && (
              <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                <span>Cuisines: {selectedCuisines.join(", ")}</span>
                <button
                  onClick={() => {
                    selectedCuisines.forEach(cuisine => {
                      dispatch(toggleCuisine(cuisine));
                    });
                  }}
                  className="ml-1"
                  aria-label="Clear cuisines"
                >
                  <ClearIcon />
                </button>
              </div>
            )}
            {selectedRating > 0 && (
              <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                <span>Rating: {selectedRating}+ stars</span>
                <button
                  onClick={() => dispatch(setRating(0))}
                  className="ml-1"
                  aria-label="Clear rating"
                >
                  <ClearIcon />
                </button>
              </div>
            )}
            {selectedPrice && (
              <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                <span>Price: {selectedPrice}</span>
                <button
                  onClick={() => dispatch(setPrice(""))}
                  className="ml-1"
                  aria-label="Clear price"
                >
                  <ClearIcon />
                </button>
              </div>
            )}
            {selectedTime && (
              <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                <span>Delivery: {selectedTime}</span>
                <button
                  onClick={() => dispatch(setTime(""))}
                  className="ml-1"
                  aria-label="Clear delivery time"
                >
                  <ClearIcon />
                </button>
              </div>
            )}
            {isFavoriteSelected && (
              <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                <span>Favorites</span>
                <button
                  onClick={() => dispatch(toggleFavorite())}
                  className="ml-1"
                  aria-label="Clear favorites"
                >
                  <ClearIcon />
                </button>
              </div>
            )}
            {isFreeDeliverySelected && (
              <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                <span>Free Delivery</span>
                <button
                  onClick={() => dispatch(toggleFreeDelivery())}
                  className="ml-1"
                  aria-label="Clear free delivery"
                >
                  <ClearIcon />
                </button>
              </div>
            )}
            {isComboSelected && (
              <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                <span>Combos</span>
                <button
                  onClick={() => dispatch(toggleCombo())}
                  className="ml-1"
                  aria-label="Clear combos"
                >
                  <ClearIcon />
                </button>
              </div>
            )}
            {isSpecialOfferSelected && (
              <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-white text-sm">
                <span>Special Offers</span>
                <button
                  onClick={() => dispatch(toggleSpecialOffer())}
                  className="ml-1"
                  aria-label="Clear special offers"
                >
                  <ClearIcon />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Banner;