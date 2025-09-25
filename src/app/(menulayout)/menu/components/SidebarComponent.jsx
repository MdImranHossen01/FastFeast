"use client";
import React, { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid"; // Using Heroicons for stars

const SidebarComponent = () => {
  // State to manage selected filters
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  // Dummy data for filter options
  const cuisines = ["Thai", "Italian", "Indian", "Chinese", "Mexican", "Japanese"];
  const prices = ["$", "$$", "$$$", "$$$$"];
  const deliveryTimes = ["Under 30 min", "Under 45 min", "Any"];

  // Handler for cuisine checkbox changes
  const handleCuisineChange = (cuisine) => {
    setSelectedCuisines((prevCuisines) =>
      prevCuisines.includes(cuisine)
        ? prevCuisines.filter((c) => c !== cuisine) // Uncheck: remove from array
        : [...prevCuisines, cuisine] // Check: add to array
    );
  };
  
  // Handler to apply all selected filters
  const handleApplyFilters = () => {
    const filters = {
      cuisines: selectedCuisines,
      minRating: selectedRating,
      priceRange: selectedPrice,
      maxDeliveryTime: selectedTime,
    };
    console.log("Applying Filters:", filters);
    // 👉 In a real application, you would dispatch a Redux action
    // or make an API call with these filter parameters here.
  };

  return (
    <aside className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sticky top-5">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">Filters</h2>

      {/* 1. Cuisine Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Cuisine</h3>
        <div className="flex flex-col gap-2">
          {cuisines.map((cuisine) => (
            <label key={cuisine} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedCuisines.includes(cuisine)}
                onChange={() => handleCuisineChange(cuisine)}
                className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-gray-700">{cuisine}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Rating Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Rating</h3>
        <div className="flex flex-col gap-2">
          {[4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="rating"
                value={rating}
                checked={selectedRating === rating}
                onChange={(e) => setSelectedRating(Number(e.target.value))}
                className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500"
              />
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`h-5 w-5 ${
                      i < rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">& Up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Price Range Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price Range</h3>
        <div className="flex flex-col gap-2">
          {prices.map((price) => (
            <label key={price} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="price"
                value={price}
                checked={selectedPrice === price}
                onChange={(e) => setSelectedPrice(e.target.value)}
                className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-gray-700">{price}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Delivery Time Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Delivery Time</h3>
        <div className="flex flex-col gap-2">
          {deliveryTimes.map((time) => (
            <label key={time} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="deliveryTime"
                value={time}
                checked={selectedTime === time}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="h-4 w-4 border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-gray-700">{time}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Apply Filters Button */}
      <button
        onClick={handleApplyFilters}
        className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200"
      >
        Apply Filters
      </button>
    </aside>
  );
};

export default SidebarComponent;