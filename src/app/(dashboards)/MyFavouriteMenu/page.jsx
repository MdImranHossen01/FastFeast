"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { generateSlug } from "@/app/restaurants/components/generateSlug";
import { useSession } from 'next-auth/react';

const MyFavouriteMenuPage = () => {
  const { data: session, status } = useSession();
  const [favoriteMenus, setFavoriteMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch favorite menus from the API
  useEffect(() => {
    const fetchFavorites = async () => {
      // Wait for session to load
      if (status === 'loading') return;
      
      // If not logged in, set error and stop loading
      if (!session) {
        setError('Please login to view your favorite menus');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/favorites');
        
        if (!response.ok) {
          throw new Error('Failed to fetch favorites');
        }
        
        const data = await response.json();
        setFavoriteMenus(data);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [session, status]);

  // Remove a menu from favorites
  const removeFromFavorites = async (menuId) => {
    try {
      const response = await fetch(`/api/favorites/${menuId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update state by filtering out the removed item
        // Compare by converting ObjectIds to strings
        setFavoriteMenus(favoriteMenus.filter(fav => fav.menuId.toString() !== menuId.toString()));
      } else {
        console.error('Failed to remove from favorites');
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  // Show loading spinner while session or data is loading
  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Favorite Menus</h1>
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">Please Login</h2>
          <p className="text-gray-500 mb-6">You need to login to view your favorite menus</p>
          <Link href="/(auth)/login" className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Login
          </Link>
        </div>
      </div>
    );
  }

  // Show error message if fetching failed
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Favorite Menus</h1>
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  // Show empty state if no favorites
  if (favoriteMenus.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">My Favorite Menus</h1>
        <div className="text-center py-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No favorite menus yet</h2>
          <p className="text-gray-500 mb-6">Start adding your favorite menus to see them here!</p>
          <Link href="/menu" className="inline-block bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Browse Menus
          </Link>
        </div>
      </div>
    );
  }

  // Main render: display the grid of favorite menus
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">My Favorite Menus ({favoriteMenus.length})</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {favoriteMenus.map((favorite) => {
          // The menu and restaurant data are nested inside the 'favorite' object
          const menu = favorite.menu;
          const restaurant = favorite.restaurant;
          const restaurantSlug = restaurant ? generateSlug(restaurant.name, restaurant.location?.area) : "";
          
          return (
            <div
              // Use the favorite document's ID as the key, converted to string
              key={favorite._id.toString()} 
              className="transform rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={menu.imageUrl}
                  alt={menu.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-xl"
                />
                {/* Price Badge */}
                <div className="absolute top-2 right-2 bg-orange-500 rounded-full px-2 py-1 text-xs font-bold text-white">
                  ৳{menu.price}
                </div>
                {/* Remove from favorites button */}
                <button
                  onClick={() => removeFromFavorites(menu._id)} // Pass the menu's ObjectId
                  className="absolute top-2 left-2 bg-white rounded-full p-1.5 shadow-md hover:bg-red-50 transition-colors"
                  title="Remove from favorites"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-orange-500">
                  {menu.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {menu.description}
                </p>

                {/* Restaurant Info */}
                <div className="mt-3 flex items-center">
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
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyFavouriteMenuPage;