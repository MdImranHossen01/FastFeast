"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLocation, setSearchQuery } from "@/lib/features/filtersSlice";

// --- SVG Icons (no changes here) ---
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#FF7E8B" width="20" height="20" viewBox="0 0 20 20" aria-hidden="true" className="mr-2 flex-shrink-0">
    <path d="M10.2 0.42c-4.5 0-8.2 3.7-8.2 8.3 0 6.2 7.5 11.3 7.8 11.6 0.2 0.1 0.3 0.1 0.4 0.1s0.3 0 0.4-0.1c0.3-0.2 7.8-5.3 7.8-11.6 0.1-4.6-3.6-8.3-8.2-8.3zM10.2 11.42c-1.7 0-3-1.3-3-3s1.3-3 3-3c1.7 0 3 1.3 3 3s-1.3 3-3 3z"></path>
  </svg>
);
const CaretDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#4F4F4F" width="12" height="12" viewBox="0 0 20 20" aria-hidden="true" className="flex-shrink-0">
    <path d="M20 5.42l-10 10-10-10h20z"></path>
  </svg>
);
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#828282" width="18" height="18" viewBox="0 0 20 20" aria-hidden="true" className="mr-2 flex-shrink-0">
    <path d="M19.78 19.12l-3.88-3.9c1.28-1.6 2.080-3.6 2.080-5.8 0-5-3.98-9-8.98-9s-9 4-9 9c0 5 4 9 9 9 2.2 0 4.2-0.8 5.8-2.1l3.88 3.9c0.1 0.1 0.3 0.2 0.5 0.2s0.4-0.1 0.5-0.2c0.4-0.3 0.4-0.8 0.1-1.1zM1.5 9.42c0-4.1 3.4-7.5 7.5-7.5s7.48 3.4 7.48 7.5-3.38 7.5-7.48 7.5c-4.1 0-7.5-3.4-7.5-7.5z"></path>
  </svg>
);

// --- Main Banner Component ---

const Banner = () => {
  const dispatch = useDispatch();
  const { searchQuery, location } = useSelector((state) => state.filters);

  // State to manage dropdown visibility
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const locationDropdownRef = useRef(null);
  
  // A list of available locations
  const availableLocations = ["Dhanmondi", "Mirpur", "Uttara", "Banani", "Gulshan"];

  // Handle clicking a location from the dropdown
  const handleLocationSelect = (selectedLocation) => {
    dispatch(setLocation(selectedLocation));
    setIsLocationOpen(false); // Close dropdown after selection
  };
  
  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationDropdownRef.current && !locationDropdownRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <div className="relative h-[200px] w-full">
      <Image src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1170" alt="Food banner" fill className="object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 px-4">
        <div className="flex w-full max-w-3xl items-center rounded-lg bg-orange-500/50 p-3 shadow-lg">
          
          {/* --- MODIFIED: Location Input Section is now a relative container --- */}
          <div className="relative w-2/5" ref={locationDropdownRef}>
            <div className="flex items-center pr-2 cursor-pointer" onClick={() => setIsLocationOpen(!isLocationOpen)}>
              <LocationIcon />
              <input
                type="text"
                placeholder="Select Location"
                value={location}
                readOnly // Make input read-only to force selection from dropdown
                className="w-full bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-500 cursor-pointer"
              />
              <CaretDownIcon />
            </div>
            
            {/* --- NEW: The Location Dropdown List --- */}
            {isLocationOpen && (
              <div className="absolute top-full mt-2 w-full rounded-md bg-white shadow-lg z-10 border border-gray-100">
                <ul>
                  {availableLocations.map((loc) => (
                    <li
                      key={loc}
                      onClick={() => handleLocationSelect(loc)}
                      className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      {loc}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="h-6 border-l border-gray-300"></div>

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
        </div>
      </div>
    </div>
  );
};

export default Banner;