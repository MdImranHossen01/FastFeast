// src/app/(menulayout)/menu/[id]/reviews/page.jsx
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
        
        // Fetch menu item details with rating using the updated API
        const itemResponse = await fetch(`/api/menu/${params.id}`);
        const itemData = await itemResponse.json();
        
        if (itemData.success) {
          setMenuItem(itemData.menuItem);
        } else {
          console.error('Failed to fetch menu item:', itemData.message);
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
                createdAt: review.createdAt,
                customerName: review.customerName || review.customerEmail?.split('@')[0] || 'Anonymous'
              });
            }
          });
          setReviews(itemReviews);
        } else {
          console.error('Failed to fetch reviews:', reviewsData.message);
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
    if (!dateString) return 'Unknown date';
    
    try {
      const options = { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      };
      return new Date(dateString).toLocaleDateString(undefined, options);
    } catch (error) {
      return 'Invalid date';
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reviews...</p>
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
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  const averageRating = menuItem.rating || 'Not rated yet';
  const totalReviews = reviews.length;

  return (
    <div className="p-4 sm:p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
            aria-label="Go back"
          >
            <FiArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Menu Item Reviews</h1>
            <p className="text-gray-600 mt-1">See what customers are saying about this item</p>
          </div>
        </div>

        {/* Menu Item Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <img
              className="h-24 w-24 sm:h-20 sm:w-20 rounded-lg object-cover flex-shrink-0"
              src={menuItem.imageUrl || menuItem.image || 'https://via.placeholder.com/80'}
              alt={menuItem.name || menuItem.title}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/80';
              }}
            />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {menuItem.name || menuItem.title}
              </h2>
              <p className="text-gray-600 mb-3 line-clamp-2">
                {menuItem.description}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center">
                  <div className="flex items-center mr-2">
                    <FiStar className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className={`ml-1 font-semibold ${getRatingColor(parseFloat(averageRating))}`}>
                      {averageRating}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">({totalReviews} {totalReviews === 1 ? 'review' : 'reviews'})</span>
                </div>
                {menuItem.price && (
                  <span className="text-lg font-bold text-orange-500">
                    ৳{menuItem.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Summary */}
        {totalReviews > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Reviews Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">{averageRating}</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{totalReviews}</div>
                <div className="text-sm text-gray-600">Total Reviews</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round((reviews.filter(r => r.rating >= 4).length / totalReviews) * 100)}%
                </div>
                <div className="text-sm text-gray-600">Positive Reviews</div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">
              Customer Reviews {totalReviews > 0 && `(${totalReviews})`}
            </h3>
          </div>
          
          {totalReviews > 0 ? (
            <div className="divide-y divide-gray-200">
              {reviews.map((review, index) => (
                <div key={index} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                        <FiUser className="h-5 w-5 text-orange-600" />
                      </div>
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          {review.customerName}
                        </h4>
                        <div className="flex items-center mt-1 sm:mt-0">
                          <div className="flex items-center mr-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FiStar
                                key={star}
                                className={`h-4 w-4 ${
                                  star <= review.rating 
                                    ? 'text-yellow-400 fill-current' 
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm font-medium text-gray-700">
                            {review.rating}.0
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Reviewed on {formatDate(review.createdAt)}
                      </p>
                      {review.comment && (
                        <p className="mt-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">
                          {review.comment}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiStar className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-500 mb-6">Be the first to review this menu item!</p>
              <button
                onClick={() => router.push(`/menu/${params.id}`)}
                className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium"
              >
                Back to Menu Item
              </button>
            </div>
          )}
        </div>

        {/* Back to Menu Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => router.push(`/menu/${params.id}`)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium"
          >
            Back to Menu Item Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemReviewsPage;