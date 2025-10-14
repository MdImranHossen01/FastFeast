"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import MenuModal from "./MenuModal";
import Link from "next/link";
import { generateSlug } from "@/app/restaurants/components/generateSlug";
import { useSession } from "next-auth/react";

const MenuCard = ({ menu, restaurants }) => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurant, setRestaurant] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Find the restaurant data based on restaurantId
  useEffect(() => {
    if (restaurants && menu.restaurantId) {
      const foundRestaurant = restaurants.find(r => r._id === menu.restaurantId);
      setRestaurant(foundRestaurant);
    }
  }, [restaurants, menu.restaurantId]);

  // Check if menu is in favorites when component mounts or session changes
  useEffect(() => {
    const checkFavorite = async () => {
      // Only check if user is logged in and menu has an ID
      if (!session?.user?.id || !menu._id) {
        setIsFavorite(false); // Reset to false if no session or menu ID
        return;
      }
      
      try {
        const response = await fetch('/api/favorites');
        if (response.ok) {
          const favorites = await response.json();
          // Convert both IDs to strings for reliable comparison
          const isFav = favorites.some(fav => fav.menuId.toString() === menu._id.toString());
          setIsFavorite(isFav);
        } else {
          console.error('Failed to check favorite status, response not ok');
        }
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    checkFavorite();
  }, [session, menu._id]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Toggle favorite status (add or remove) with enhanced logging
  const toggleFavorite = async (e) => {
    e.stopPropagation(); // Prevent other click events like opening modal
    
    if (!session) {
      alert('Please login to add favorites');
      return;
    }

    setIsLoading(true);
    
    try {
      if (isFavorite) {
        // Remove from favorites
        const response = await fetch(`/api/favorites/${menu._id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setIsFavorite(false);
          console.log(`Successfully removed "${menu.title}" from favorites.`);
        } else {
          const errorData = await response.json();
          console.error('Failed to remove from favorites:', errorData);
          alert(`Failed to remove from favorites: ${errorData.error || 'Unknown error'}`);
        }
      } else {
        // Add to favorites
        console.log('--- Attempting to add to favorites ---');
        console.log('Session User ID:', session.user.id);
        console.log('Menu Object:', menu);
        console.log('Restaurant Object:', restaurant);
        
        const response = await fetch('/api/favorites', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            menu: menu,
            restaurant: restaurant
          }),
        });

        console.log('Received response status:', response.status);

        if (response.ok) {
          setIsFavorite(true);
          console.log(`Successfully added "${menu.title}" to favorites.`);
        } else {
          const errorData = await response.json();
          console.error('--- Failed to add to favorites ---');
          console.error('Server Response:', errorData);
          alert(`Failed to add to favorites: ${errorData.error || 'Unknown error'}`);
          
          // If the server says it already exists (status 409), update the UI to reflect that
          if (response.status === 409) {
            setIsFavorite(true);
          }
        }
      }
    } catch (error) {
      console.error('--- Network or client-side error in toggleFavorite ---');
      console.error(error);
      alert('A network error occurred. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Generate restaurant slug if restaurant exists
  const restaurantSlug = restaurant ? generateSlug(restaurant.name, restaurant.location?.area) : "";

  return (
    <div>
      <div
        key={menu._id || menu.id}
        className="flex-shrink-0 w-full transform rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <div className="relative h-40 w-full">
          <Image
            src={menu.imageUrl}
            alt={menu.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
          />
          {/* Location Badge - Left Side */}
          <div className="absolute top-2 left-2 bg-orange-500 rounded-full px-2 py-1 text-xs font-bold text-white flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {restaurant?.location?.area || "Location"}
          </div>
          {/* Price Badge - Right Side */}
          <div className="absolute top-2 right-2 bg-orange-500 rounded-full px-2 py-1 text-xs font-bold text-white">
            ৳{menu.price}
          </div>
          {/* Special Offer Badge - Only show if it's a special offer */}
          {menu.isSpecialOffer && (
            <div className="absolute bottom-2 right-2 bg-red-500 rounded-full px-2 py-1 text-xs font-bold text-white">
              {menu.discountRate}% OFF
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            {/* Made the title clickable with Link component */}
            <Link href={`/menu/${menu._id}`} className="text-lg font-semibold text-orange-500 hover:text-orange-600 transition-colors">
              {menu.title}
            </Link>
            {/* Heart Icon - filled if favorite, outlined if not */}
            <button
              onClick={toggleFavorite}
              disabled={isLoading}
              className={`h-5 w-5 ml-2 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
              }`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transition-colors ${
                  isFavorite 
                    ? 'text-red-500 fill-red-500' 
                    : 'text-gray-400 fill-none hover:text-red-500 hover:fill-red-500'
                }`}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
          <p className="mt-1 text-sm text-gray-600 line-clamp-2">
            {menu.description}
          </p>

          {/* Restaurant Info with Add to Cart Button */}
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              {/* Make restaurant logo and name clickable */}
              {restaurant ? (
                <Link href={`/restaurants/${restaurantSlug}`} className="flex items-center hover:opacity-80 transition-opacity">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={restaurant.logo}
                      alt={restaurant.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-700 font-medium hover:text-orange-500 transition-colors">
                    {restaurant.name}
                  </span>
                </Link>
              ) : (
                <div className="flex items-center">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                    <Image
                      src={menu.imageUrl}
                      alt={menu.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <span className="ml-2 text-sm text-gray-700 font-medium">
                    Restaurant
                  </span>
                </div>
              )}
            </div>

            {/* Large Circular Add to Cart Button */}
            <button 
              onClick={openModal}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white transition-all duration-300 hover:bg-orange-600 hover:scale-110 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu Modal */}
      <MenuModal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        menu={menu} 
        restaurant={restaurant}
      />
    </div>
  );
};

export default MenuCard;