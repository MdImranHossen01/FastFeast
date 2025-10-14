// src/app/riders/[id]/reviews/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiStar, FiUser } from 'react-icons/fi';

const RiderReviewsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [rider, setRider] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRiderAndReviews = async () => {
      try {
        setLoading(true);
        
        // Fetch rider details with reviews
        const riderResponse = await fetch(`/api/riders/${params.id}`);
        const riderData = await riderResponse.json();
        
        if (riderData.success) {
          setRider(riderData.rider);
          setReviews(riderData.rider.reviews || []);
        }
      } catch (error) {
        console.error('Error fetching rider reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRiderAndReviews();
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

  if (!rider) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Rider Not Found</h2>
            <p className="text-gray-600 mb-4">The rider you're looking for doesn't exist or has been removed.</p>
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
          <h1 className="text-2xl font-bold text-gray-800">Rider Reviews</h1>
        </div>

        {/* Rider Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start">
            <img
              className="h-20 w-20 rounded-full object-cover mr-4"
              src={rider.photoUrl || `https://avatar.vercel.sh/${rider.email}`}
              alt={rider.name}
            />
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{rider.name}</h2>
              <p className="text-gray-600 mb-2">{rider.email}</p>
              <div className="flex items-center">
                <div className="flex items-center mr-2">
                  <FiStar className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{rider.rating || 'Not rated yet'}</span>
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
              <p className="mt-1 text-sm text-gray-500">This rider hasn't received any reviews yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderReviewsPage;