"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiStar, FiMapPin, FiPhone, FiClock, FiUser, FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi';
import Image from 'next/image';
import { useCart } from '@/lib/cartContext';

const MenuItemDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const fetchMenuItem = async () => {
      if (!params.id) return;

      try {
        setLoading(true);
        const response = await fetch(`/api/menu/${params.id}`);
        const data = await response.json();

        if (data.success) {
          setMenuItem(data.menuItem);
        } else {
          setError(data.message || 'Failed to fetch menu item details.');
        }
      } catch (err) {
        setError('An unexpected error occurred. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItem();
  }, [params.id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleAddToCart = () => {
    if (menuItem) {
      addToCart({
        ...menuItem,
        quantity
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 3000);
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error || !menuItem) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Item Not Found</h2>
          <p className="text-gray-600 mb-4">{error || 'The menu item you are looking for does not exist.'}</p>
          <button onClick={() => router.back()} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header with Back Button */}
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto p-4 flex items-center">
          <button onClick={() => router.back()} className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors">
            <FiArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Item Details</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Main Image and Basic Info */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="relative h-64 md:h-96 w-full">
            <Image src={menuItem.imageUrl} alt={menuItem.title} layout="fill" objectFit="cover" />
            {menuItem.isSpecialOffer && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                {menuItem.discountRate}% OFF
              </div>
            )}
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">{menuItem.title}</h2>
                <p className="text-3xl font-bold text-orange-500 mt-2">
                  ৳{menuItem.offerPrice || menuItem.price}
                  {menuItem.offerPrice && (
                    <span className="text-lg font-normal text-gray-500 line-through ml-2">৳{menuItem.price}</span>
                  )}
                </p>
              </div>
              <div className="text-right">
                {menuItem.rating && (
                  <div className="flex items-center">
                    <FiStar className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-lg font-semibold">{menuItem.rating}</span>
                    <span className="text-gray-500 ml-1">({menuItem.reviewCount || 0} reviews)</span>
                  </div>
                )}
              </div>
            </div>
            <p className="text-gray-600">{menuItem.description}</p>
          </div>
        </div>

        {/* Quantity and Add to Cart Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center">
              <span className="font-medium text-gray-700 mr-4">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-md">
                <button onClick={decreaseQuantity} className="p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors" disabled={quantity <= 1}>
                  <FiMinus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <button onClick={increaseQuantity} className="p-2 text-gray-600 hover:text-orange-500 hover:bg-orange-50 transition-colors">
                  <FiPlus className="h-4 w-4" />
                </button>
              </div>
            </div>
            <button onClick={handleAddToCart} className={`flex items-center px-6 py-3 rounded-md font-medium transition-all ${addedToCart ? 'bg-green-500 text-white' : 'bg-orange-500 text-white hover:bg-orange-600'}`}>
              {addedToCart ? (
                <>
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Added to Cart
                </>
              ) : (
                <>
                  <FiShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </>
              )}
            </button>
          </div>
          {addedToCart && (
            <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-green-800 text-sm">{quantity} × {menuItem.title} has been added to your cart.</p>
              <button onClick={() => router.push('/cart')} className="mt-2 text-green-600 font-medium text-sm hover:text-green-800">
                View Cart
              </button>
            </div>
          )}
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">Customer Reviews</h3>
          </div>
          <div className="p-6">
            {menuItem.reviews && menuItem.reviews.length > 0 ? (
              <div className="space-y-4">
                {menuItem.reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <FiUser className="h-6 w-6 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium text-gray-900">
                            {review.customerEmail ? review.customerEmail.split('@')[0] : 'Anonymous Customer'}
                          </h4>
                          <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FiStar key={star} className={`h-4 w-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">Reviewed on {formatDate(review.createdAt)}</p>
                        {review.comment && <p className="mt-2 text-sm text-gray-700">{review.comment}</p>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiStar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
                <p className="mt-1 text-sm text-gray-500">Be the first to review this item!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetailsPage;