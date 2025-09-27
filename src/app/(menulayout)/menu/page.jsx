"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import RestaurantCard from "./components/RestaurantCard";
import RestaurantCardSkeleton from "./components/RestaurantCardSkeleton";
import ThaiFood from "./components/ThaiFood";
import ChineseFood from "./components/ChineseFood";
import IndianFood from "./components/IndianFood";
import ItalianFood from "./components/ItalianFood";
import JapaneseFood from "./components/JapaneseFood";
import KoreanFood from "./components/KoreanFood";
import TurkishFood from "./components/TurkishFood";
import FavouriteFood from "./components/FavouriteFood";

// --- DEMO DATA ---
const demoRestaurants = [
    { id: 1, name: "Kacchi Bhai", imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=870", cuisine: ["Indian", "Biryani"], rating: 4.5, priceRange: "$$", deliveryTime: 35, location: "Dhanmondi" },
    { id: 2, name: "Pizza Roma", imageUrl: "https://images.unsplash.com/photo-1594007654729-407eedc4be65?q=80&w=728", cuisine: ["Italian", "Pizza"], rating: 4.8, priceRange: "$$$", deliveryTime: 40, location: "Banani" },
    { id: 3, name: "Thai Emerald", imageUrl: "https://images.unsplash.com/photo-1626202157982-b3e3434a05a8?q=80&w=870", cuisine: ["Thai", "Asian"], rating: 4.2, priceRange: "$$$", deliveryTime: 45, location: "Uttara" },
    { id: 4, name: "Burger Queen", imageUrl: "https://images.unsplash.com/photo-1605789534313-a0e638681604?q=80&w=725", cuisine: ["Fast Food", "Burgers"], rating: 3.9, priceRange: "$", deliveryTime: 25, location: "Mirpur" },
    { id: 5, name: "Sushi House", imageUrl: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?q=80&w=870", cuisine: ["Japanese", "Sushi"], rating: 4.9, priceRange: "$$$$", deliveryTime: 50, location: "Banani" },
    { id: 6, name: "Nawab's Kitchen", imageUrl: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=870", cuisine: ["Indian", "Mughlai"], rating: 4.4, priceRange: "$$", deliveryTime: 30, location: "Dhanmondi" }
];

const MenuPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const filters = useSelector((state) => state.filters);

  // Memoize the filtered results to avoid re-calculating on every render
  const filteredRestaurants = useMemo(() => {
    return demoRestaurants.filter((restaurant) => {
      
      // Search Query Filter
      if (filters.searchQuery && !restaurant.name.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
        return false;
      }
      // Location Filter
      if (filters.location && restaurant.location !== filters.location) {
        return false;
      }
      // Cuisine Filter
      if (filters.selectedCuisines.length > 0 && !filters.selectedCuisines.some(c => restaurant.cuisine.includes(c))) {
        return false;
      }
      // Rating Filter
      if (filters.selectedRating > 0 && restaurant.rating < filters.selectedRating) {
        return false;
      }
      return true;
    });
  }, [filters]); // Re-run this logic only when filters change

  // Simulate initial data loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-4">
      <FavouriteFood/>
      <ThaiFood/>
      <ChineseFood/>
      <IndianFood/>
      <ItalianFood/>
      <JapaneseFood/>
      <KoreanFood/>
      <TurkishFood/>
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        {filteredRestaurants.length} Restaurants Found
      </h2>

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <RestaurantCardSkeleton key={index} />
          ))}
        </div>
      ) : filteredRestaurants.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRestaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 py-24 text-center">
          <h3 className="text-xl font-semibold text-gray-700">No Restaurants Found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default MenuPage;