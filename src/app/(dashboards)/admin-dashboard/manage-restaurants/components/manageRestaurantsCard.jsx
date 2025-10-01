import React from "react";
import PendingRestaurants from "./pendingRestaurants";
import ApprovedRestaurants from "./approvedRestaurants";

export default function ManageRestaurantsCard({ restaurants }) {
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-2xl sm:text-3xl font-bold dark:text-white py-1 pt-4 text-left">
          Manage Restaurants
        </h2>
        <input
          type="text"
          placeholder="search restaurant..."
          className="
            input input-bordered 
            bg-gray-100 text-gray-800 
            dark:bg-gray-800 dark:text-gray-200 
            border-gray-300 dark:border-gray-600 py-1
       mt-4"
        />
      </div>

      {/* Pending Restaurant Requests */}
      <h2 className="text-2xl text-center font-bold dark:text-white py-5">
        Pending Restaurant Requests
      </h2>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-1">
        <PendingRestaurants restaurants={restaurants} />
      </div>

      {/* Approved Restaurants */}
      <h2 className="text-2xl text-center font-bold dark:text-white py-5">
        Approved Restaurants
      </h2>
      <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <ApprovedRestaurants restaurants={restaurants} />
      </div>
    </div>
  );
}
