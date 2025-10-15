"use client";

import React, { useState, useEffect } from "react";
import PendingRestaurants from "./components/pendingRestaurants";
import ApprovedRestaurants from "./components/approvedRestaurants";
import ManageRestaurantsCard from "./components/manageRestaurantsCard";
import getRestaurants from "@/app/actions/restaurants/getRestaurant";

export default function ManageRestaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const data = await getRestaurants();

        if (!Array.isArray(data)) {
          throw new Error("Invalid data format received");
        }

        setRestaurants(data);
      } catch (err) {
        console.error("Error fetching restaurants:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) {
    return (
      <div className="pb-5 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 min-h-screen px-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pb-5 text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-900 min-h-screen px-6">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-semibold text-red-800 mb-2">
            Error Loading Restaurants
          </h2>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-5 text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 min-h-screen px-6">
      <ManageRestaurantsCard restaurants={restaurants} />
    </div>
  );
}
