"use client";
import React, { useState, useEffect, useMemo } from "react";
import ThaiFood from "./components/ThaiFood";
import ChineseFood from "./components/ChineseFood";
import IndianFood from "./components/IndianFood";
import ItalianFood from "./components/ItalianFood";
import JapaneseFood from "./components/JapaneseFood";
import KoreanFood from "./components/KoreanFood";
import TurkishFood from "./components/TurkishFood";
import getMenu from "@/app/actions/menus/getMenus";
import getRestaurant from "@/app/actions/restaurants/getRestaurant";
import { useSelector } from "react-redux";
import MenuCard from "./components/MenuCard";

const MenuPage = () => {
  const [allMenus, setAllMenus] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Get filters from Redux
  const filters = useSelector((state) => state.filters);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [menusData, restaurantsData] = await Promise.all([
          getMenu(),
          getRestaurant()
        ]);
        
        console.log("Restaurants data sample:", restaurantsData.slice(0, 2)); // Debug first 2 restaurants
        setAllMenus(menusData);
        setAllRestaurants(restaurantsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Create a map of restaurant IDs to restaurant details for quick lookup
  const restaurantMap = useMemo(() => {
    const map = {};
    allRestaurants.forEach(restaurant => {
      if (restaurant && restaurant._id) {
        map[restaurant._id] = restaurant;
      }
    });
    return map;
  }, [allRestaurants]);

  // Helper function to extract location string from restaurant object
  const getRestaurantLocation = (restaurant) => {
    if (!restaurant || !restaurant.location) return '';
    
    // If location is a string, return it directly
    if (typeof restaurant.location === 'string') {
      return restaurant.location.toLowerCase();
    }
    
    // If location is an object, try to extract the area/city
    if (typeof restaurant.location === 'object') {
      // Common field names for location in objects
      const possibleFields = ['area', 'city', 'name', 'address', 'deliveryArea', 'region'];
      
      for (let field of possibleFields) {
        if (restaurant.location[field] && typeof restaurant.location[field] === 'string') {
          return restaurant.location[field].toLowerCase();
        }
      }
      
      // If no specific field found, try to stringify and extract
      const locationString = JSON.stringify(restaurant.location).toLowerCase();
      return locationString;
    }
    
    return '';
  };

  // Filter all menus based on search criteria including restaurant names AND location
  const filteredMenus = useMemo(() => {
    if (!allMenus.length) return [];

    return allMenus.filter(menu => {
      const restaurant = restaurantMap[menu.restaurantId];
      const restaurantName = restaurant?.name || '';
      
      // Safely get restaurant location using helper function
      const restaurantLocation = getRestaurantLocation(restaurant);
      
      // Filter by search query - includes restaurant name
      const searchMatch = !filters.searchQuery || 
        (menu.title && menu.title.toLowerCase().includes(filters.searchQuery.toLowerCase())) ||
        (menu.cuisine && menu.cuisine.toLowerCase().includes(filters.searchQuery.toLowerCase())) ||
        (menu.description && menu.description.toLowerCase().includes(filters.searchQuery.toLowerCase())) ||
        (menu.category && menu.category.toLowerCase().includes(filters.searchQuery.toLowerCase())) ||
        restaurantName.toLowerCase().includes(filters.searchQuery.toLowerCase());

      // Filter by location - CRITICAL FIX: Only show items from selected location
      const locationMatch = !filters.location || 
        (restaurantLocation && restaurantLocation.includes(filters.location.toLowerCase()));

      // Filter by cuisine
      const cuisineMatch = filters.selectedCuisines.length === 0 || 
        (menu.cuisine && filters.selectedCuisines.includes(menu.cuisine));

      // Filter by rating
      const ratingMatch = !filters.selectedRating || 
        (menu.rating && menu.rating >= filters.selectedRating);

      // Filter by price
      const priceMatch = !filters.selectedPrice || 
        (filters.selectedPrice === "$" && menu.price < 300) ||
        (filters.selectedPrice === "$$" && menu.price >= 300 && menu.price < 500) ||
        (filters.selectedPrice === "$$$" && menu.price >= 500 && menu.price < 700) ||
        (filters.selectedPrice === "$$$$" && menu.price >= 700);

      // Filter by special offers
      const specialOfferMatch = !filters.isSpecialOfferSelected || 
        menu.isSpecialOffer;

      // Filter by combo
      const comboMatch = !filters.isComboSelected || 
        menu.isCombo;

      return searchMatch && locationMatch && cuisineMatch && ratingMatch && 
             priceMatch && specialOfferMatch && comboMatch;
    });
  }, [allMenus, filters, restaurantMap]);

  // Check if we have active filters
  const hasActiveFilters = filters.searchQuery || 
    filters.location ||
    filters.selectedCuisines.length > 0 || 
    filters.selectedRating > 0 || 
    filters.selectedPrice || 
    filters.isSpecialOfferSelected || 
    filters.isComboSelected;

  if (loading) {
    return (
      <div className="py-4">
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4">
      {/* Show search results when filters are active */}
      {hasActiveFilters ? (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Search Results ({filteredMenus.length} items found)
            </h2>
            <div className="text-right">
              {filters.searchQuery && (
                <p className="text-gray-600 text-sm">
                  Searching for: "{filters.searchQuery}"
                </p>
              )}
              {filters.location && (
                <p className="text-gray-600 text-sm">
                  Location: {filters.location}
                </p>
              )}
            </div>
          </div>
          
          {/* Display filtered results in horizontal scroll for mobile, grid for desktop */}
          {filteredMenus.length > 0 ? (
            <div>
              {/* Mobile: Horizontal Scroll */}
              <div className="md:hidden flex w-full space-x-4 overflow-x-auto scrollbar-hide pb-4">
                {filteredMenus.map(menu => (
                  <div key={menu._id} className="flex-shrink-0 w-64">
                    <MenuCard 
                      menu={menu} 
                      restaurants={allRestaurants}
                    />
                  </div>
                ))}
              </div>
              
              {/* Desktop: Grid Layout */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredMenus.map(menu => (
                  <MenuCard 
                    key={menu._id} 
                    menu={menu} 
                    restaurants={allRestaurants}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No items found matching your criteria.</p>
              {filters.location && (
                <p className="text-gray-400 mt-2">
                  No "{filters.searchQuery || 'items'}" found in {filters.location}. Try a different location or search term.
                </p>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Show regular cuisine sections when no filters are active */
        <>
          <ThaiFood menus={allMenus} restaurants={allRestaurants} />
          <ChineseFood menus={allMenus} restaurants={allRestaurants} />
          <IndianFood menus={allMenus} restaurants={allRestaurants} />
          <ItalianFood menus={allMenus} restaurants={allRestaurants} />
          <JapaneseFood menus={allMenus} restaurants={allRestaurants} />
          <KoreanFood menus={allMenus} restaurants={allRestaurants} />
          <TurkishFood menus={allMenus} restaurants={allRestaurants} />
        </>
      )}

      {/* Custom scrollbar styles */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default MenuPage;