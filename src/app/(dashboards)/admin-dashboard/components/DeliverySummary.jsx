"use client";
import React from "react";

export default function DeliverySummary() {
  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Delivery Performance
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400">
            28 min
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Avg. Delivery Time</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-green-600 dark:text-green-400">
            6PM - 9PM
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Peak Order Time</p>
        </div>
        <div>
          <h3 className="text-3xl font-bold text-purple-600 dark:text-purple-400">
            1,240
          </h3>
          <p className="text-gray-500 dark:text-gray-400">Orders Today</p>
        </div>
      </div>
    </div>
  );
}
