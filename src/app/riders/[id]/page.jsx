// src/app/riders/[id]/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiPhone,
  FiMapPin,
  FiTruck,
  FiMail,
  FiCalendar,
  FiStar,
  FiPackage,
  FiCheckCircle,
  FiUser,
} from "react-icons/fi";
import Image from "next/image";

const RiderDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [rider, setRider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRiderDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching rider details for ID:", params.id);

        const riderResponse = await fetch(`/api/riders/${params.id}`);
        const riderData = await riderResponse.json();

        console.log("Rider API response:", riderData);

        if (riderData.success) {
          setRider(riderData.rider);
        } else {
          setError(riderData.message || "Failed to fetch rider details");
          console.error("Failed to fetch rider details:", riderData.message);
        }
      } catch (error) {
        console.error("Error fetching rider details:", error);
        setError("Failed to load rider details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRiderDetails();
    }
  }, [params.id]);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        <span className="ml-3 text-gray-600">Loading rider details...</span>
      </div>
    );
  }

  if (error || !rider) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="py-20 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {error || "Rider Not Found"}
            </h2>
            <p className="text-gray-600 mb-4">
              {error
                ? "There was an error loading the rider details."
                : "The rider you're looking for doesn't exist or has been removed."}
            </p>
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
    <div className="py-20 min-h-screen">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <FiArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Rider Details</h1>
        </div>
        {/* Rider Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="relative h-24 w-24 rounded-full overflow-hidden">
                <Image
                  src={
                    rider.image ||
                    rider.photoUrl ||
                    `https://avatar.vercel.sh/${rider.email}`
                  }
                  alt={rider.name}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    e.target.src = `https://avatar.vercel.sh/${rider.name}`;
                  }}
                />
              </div>
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {rider.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <FiMail className="mr-2 text-gray-500" />
                  <span className="text-gray-800 dark:text-gray-300">{rider.email}</span>
                </div>
                <div className="flex items-center">
                  <FiPhone className="mr-2 text-gray-500" />
                  <span className="text-gray-800 dark:text-gray-300">{rider.phone || "Not provided"}</span>
                </div>
                <div className="flex items-center">
                  <FiTruck className="mr-2 text-gray-500" />
                  <span className="text-gray-800 dark:text-gray-300">Vehicle: {rider.vehicleType || "Not specified"}</span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="mr-2 text-gray-500" />
                  <span className="text-gray-800 dark:text-gray-300">Joined: {formatDate(rider.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <FiStar className="mr-2 text-gray-500 dark:text-gray-300" />
                  <span className="text-gray-800 dark:text-gray-300">
                    Rating: {rider.stats?.averageRating || "Not rated yet"}
                  </span>
                </div>
                <div className="flex items-center">
                  <FiMapPin className="mr-2 text-gray-500" />
                  <span className="text-gray-800 dark:text-gray-300">
                    {rider.currentLocation
                      ? `Lat: ${rider.currentLocation.lat}, Lng: ${rider.currentLocation.lng}`
                      : "Location not available"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
       
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiPackage className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Orders
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {rider.stats?.activeOrders || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <FiCheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Completed Orders
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {rider.stats?.completedOrders || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <FiStar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Earnings
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  ৳{rider.stats?.totalEarnings || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <FiStar className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Average Rating
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {rider.stats?.averageRating || 0}/5
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-900">
              Customer Reviews
            </h3>
            <span className="text-sm text-gray-500">
              {rider.reviews?.length || 0} reviews
            </span>
          </div>

          {rider.reviews && rider.reviews.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {rider.reviews.slice(0, 5).map((review, index) => (
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
                          {review.customerEmail
                            ? review.customerEmail.split("@")[0]
                            : "Anonymous"}
                        </h4>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FiStar
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? "text-yellow-400 fill-current"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Reviewed on {formatDate(review.createdAt)}
                      </p>
                      {review.comment && (
                        <p className="mt-2 text-sm text-gray-700">
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
              <FiStar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">
                No reviews yet
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This rider hasn't received any reviews yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderDetailsPage;
