// src/app/(menulayout)/menu/[id]/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiStar, FiArrowLeft, FiShoppingCart, FiClock } from 'react-icons/fi';
import { useCart } from '@/lib/cartContext';
import { toast } from 'react-hot-toast';

const MenuItemPage = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  
  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Fetch menu item data directly - same pattern as MenuModal
  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        setLoading(true);
        
        // Fetch all menu items and find the one with matching ID
        const response = await fetch('/api/menu');
        const data = await response.json();
        
        if (data && Array.isArray(data)) {
          // Find the menu item with matching ID
          const foundItem = data.find(item => item._id === params.id);
          if (foundItem) {
            setMenuItem(foundItem);
          } else {
            console.error('Menu item not found in the data');
          }
        } else {
          console.error('Invalid data format from API');
        }
      } catch (error) {
        console.error('Error fetching menu item:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchMenuItem();
    }
  }, [params.id]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!menuItem) return;
    
    addToCart(menuItem, quantity, specialInstructions);
    
    // Show toast notification
    toast.success(
      <div className="flex items-center">
        <span className="font-medium">{menuItem.title}</span>
        <span className="mx-2">added to cart!</span>
      </div>,
      {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#fff",
          color: "#333",
          border: "1px solid #e5e7eb",
          borderRadius: "0.5rem",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        },
        iconTheme: {
          primary: "#f97316",
          secondary: "#fff",
        },
      }
    );
  };

  const viewReviews = () => {
    router.push(`/menu/${params.id}/reviews`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading menu item...</p>
        </div>
      </div>
    );
  }

  if (!menuItem) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiStar className="h-8 w-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Menu Item Not Found</h2>
            <p className="text-gray-600 mb-6">The menu item you're looking for doesn't exist or has been removed.</p>
            <div className="space-y-3">
              <button
                onClick={() => router.push('/menu')}
                className="w-full sm:w-auto px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium"
              >
                Browse Menu
              </button>
              <button
                onClick={() => router.back()}
                className="w-full sm:w-auto px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium ml-0 sm:ml-3"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-4 sm:px-6 py-4">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
                aria-label="Go back"
              >
                <FiArrowLeft className="h-5 w-5 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800">Menu Item Details</h1>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={menuItem.imageUrl}
                  alt={menuItem.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400';
                  }}
                />
                
                {/* Special Offer Badge */}
                {menuItem.isSpecialOffer && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {menuItem.discountRate}% OFF
                  </div>
                )}
                
                {/* Rating Badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold flex items-center shadow-lg">
                  <FiStar className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                  {menuItem.rating}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-3">
                <button
                  onClick={viewReviews}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium flex items-center justify-center"
                >
                  <FiStar className="h-5 w-5 mr-2" />
                  View Reviews
                </button>
                <button className="flex-1 border border-orange-500 text-orange-500 py-3 rounded-lg hover:bg-orange-50 transition-colors font-medium flex items-center justify-center">
                  <FiClock className="h-5 w-5 mr-2" />
                  Save for Later
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">{menuItem.title}</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{menuItem.description}</p>
              </div>

              {/* Price Section */}
              <div className="flex items-center space-x-4 p-4 bg-orange-50 rounded-lg">
                {menuItem.isSpecialOffer ? (
                  <>
                    <span className="text-3xl font-bold text-orange-600">৳{menuItem.offerPrice}</span>
                    <span className="text-xl text-gray-500 line-through">৳{menuItem.price}</span>
                    <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                      Save ৳{menuItem.price - menuItem.offerPrice}
                    </span>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-orange-600">৳{menuItem.price}</span>
                )}
              </div>

              {/* Category & Cuisine */}
              <div className="flex gap-4 text-sm">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  {menuItem.category}
                </div>
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  {menuItem.cuisine}
                </div>
                <div className={`px-3 py-1 rounded-full ${
                  menuItem.availability 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {menuItem.availability ? 'Available' : 'Not Available'}
                </div>
              </div>

              {/* Ingredients */}
              {menuItem.ingredients && menuItem.ingredients.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {menuItem.ingredients.map((ingredient, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm border"
                      >
                        {ingredient}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Dietary Tags */}
              {menuItem.dietaryTags && menuItem.dietaryTags.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Dietary Information</h3>
                  <div className="flex flex-wrap gap-2">
                    {menuItem.dietaryTags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Special Instructions */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Special Instructions</h3>
                <textarea
                  placeholder="Add any special requests (e.g., no onions, extra spicy, dietary restrictions)"
                  className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={4}
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                ></textarea>
              </div>

              {/* Add to Cart Section */}
              <div className="sticky bottom-6 bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between gap-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={decreaseQuantity}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                    <span className="px-6 py-3 text-lg font-semibold min-w-[60px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={increaseQuantity}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                      aria-label="Increase quantity"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
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

                  {/* Add to Cart Button */}
                  <button
                    onClick={handleAddToCart}
                    disabled={!menuItem.availability}
                    className="flex-1 bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg flex items-center justify-center gap-3 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    <FiShoppingCart className="h-6 w-6" />
                    Add to Cart - ৳{menuItem.isSpecialOffer ? 
                      (menuItem.offerPrice * quantity).toFixed(2) : 
                      (menuItem.price * quantity).toFixed(2)}
                  </button>
                </div>
                
                {!menuItem.availability && (
                  <p className="text-red-500 text-sm mt-2 text-center">
                    This item is currently unavailable
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemPage;