// src/app/menu/[id]/reviews/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiStar, FiUser } from 'react-icons/fi';

const MenuItemReviewsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [menuItem, setMenuItem] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenuItemAndReviews = async () => {
      try {
        setLoading(true);
        
        // Fetch menu item details
        const itemResponse = await fetch(`/api/menu/${params.id}`);
        const itemData = await itemResponse.json();
        
        if (itemData.success) {
          setMenuItem(itemData.menuItem);
        }
        
        // Fetch reviews for this menu item
        const reviewsResponse = await fetch(`/api/reviews?itemId=${params.id}`);
        const reviewsData = await reviewsResponse.json();
        
        if (reviewsData.success) {
          // Extract item reviews from the reviews data
          const itemReviews = [];
          reviewsData.reviews.forEach(review => {
            const itemReview = review.itemReviews.find(item => item.itemId === params.id);
            if (itemReview && itemReview.rating > 0) {
              itemReviews.push({
                ...itemReview,
                customerEmail: review.customerEmail,
                createdAt: review.createdAt
              });
            }
          });
          setReviews(itemReviews);
        }
      } catch (error) {
        console.error('Error fetching menu item reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchMenuItemAndReviews();
    }
  }, [params.id]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!menuItem) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Menu Item Not Found</h2>
            <p className="text-gray-600 mb-4">The menu item you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <FiArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Menu Item Reviews</h1>
        </div>

        {/* Menu Item Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start">
            <img
              className="h-20 w-20 rounded-lg object-cover mr-4"
              src={menuItem.image || 'https://via.placeholder.com/80'}
              alt={menuItem.name}
            />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{menuItem.name}</h2>
              <p className="text-gray-600 mb-2">{menuItem.description}</p>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <FiStar className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{menuItem.rating || 'Not rated yet'}</span>
                </div>
                <span className="text-gray-500">({reviews.length} reviews)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
          </div>
          
          {reviews.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {reviews.map((review, index) => (
                <div key={index} className="px-6 py-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                        <FiUser className="h-6 w-6 text-gray-600" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          {review.customerEmail ? review.customerEmail.split('@')[0] : 'Anonymous'}
                        </h4>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FiStar
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Reviewed on {formatDate(review.createdAt)}
                      </p>
                      {review.comment && (
                        <p className="mt-2 text-sm text-gray-700">{review.comment}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <FiStar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No reviews yet</h3>
              <p className="mt-1 text-sm text-gray-500">Be the first to review this item!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemReviewsPage;