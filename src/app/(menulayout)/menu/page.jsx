"use client";
import React, { useState, useEffect } from "react";
import RestaurantCard from "./components/RestaurantCard";
import RestaurantCardSkeleton from "./components/RestaurantCardSkeleton";

// --- DEMO DATA ---
// In a real app, this would come from your MongoDB database via an API call.
const demoRestaurants = [
  {
    id: 1,
    name: "Kacchi Bhai",
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=870",
    cuisine: ["Indian", "Biryani"],
    rating: 4.5,
    priceRange: "$$",
    deliveryTime: 35,
    location: "Dhanmondi",
  },
  {
    id: 2,
    name: "Pizza Roma",
    imageUrl: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=728",
    cuisine: ["Italian", "Pizza"],
    rating: 4.8,
    priceRange: "$$$",
    deliveryTime: 40,
    location: "Banani",
  },
  {
    id: 3,
    name: "Thai Emerald",
    imageUrl: "https://images.unsplash.com/photo-1626202157982-b3e3434a05a8?q=80&w=870",
    cuisine: ["Thai", "Asian"],
    rating: 4.2,
    priceRange: "$$$",
    deliveryTime: 45,
    location: "Uttara",
  },
  {
    id: 4,
    name: "Burger Queen",
    imageUrl: "https://images.unsplash.com/photo-1605789534313-a0e638681604?q=80&w=725",
    cuisine: ["Fast Food", "Burgers"],
    rating: 3.9,
    priceRange: "$",
    deliveryTime: 25,
    location: "Mirpur",
  },
  {
    id: 5,
    name: "Sushi House",
    imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=870",
    cuisine: ["Japanese", "Sushi"],
    rating: 4.9,
    priceRange: "$$$$",
    deliveryTime: 50,
    location: "Banani",
  },
  {
    id: 6,
    name: "Nawab's Kitchen",
    imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=870",
    cuisine: ["Indian", "Mughlai"],
    rating: 4.4,
    priceRange: "$$",
    deliveryTime: 30,
    location: "Dhanmondi",
  },
];

const MenuPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching data from an API
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setRestaurants(demoRestaurants);
      setIsLoading(false);
    }, 1500); // Simulate 1.5-second network delay

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div className="py-4">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Available Restaurants
      </h2>
      
      {/* Responsive Grid for Restaurant Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? // Show skeleton loaders while loading
            Array.from({ length: 6 }).map((_, index) => (
              <RestaurantCardSkeleton key={index} />
            ))
          : // Show actual restaurant cards when data is loaded
            restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
      </div>

      {/* Basic Pagination (Placeholder) */}
      <div className="mt-8 flex justify-center">
        <nav className="flex items-center space-x-2">
          <button className="rounded-md px-3 py-1 text-gray-500 hover:bg-gray-100">
            Previous
          </button>
          <button className="rounded-md bg-red-600 px-3 py-1 font-semibold text-white">1</button>
          <button className="rounded-md px-3 py-1 text-gray-700 hover:bg-gray-100">2</button>
          <button className="rounded-md px-3 py-1 text-gray-700 hover:bg-gray-100">3</button>
          <button className="rounded-md px-3 py-1 text-gray-500 hover:bg-gray-100">
            Next
          </button>
        </nav>
      </div>
    </div>
  );
};

export default MenuPage;