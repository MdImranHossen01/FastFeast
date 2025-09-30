"use client";
import React from "react";

export default function RecentActivities() {
  const activities = [
    "John Doe registered a new restaurant.",
    "Payment of $450 received from Food Vault.",
    "Rider Emma delivered 5 new orders.",
    "New blog post added by Admin.",
  ];

  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Recent Activities
      </h2>
      <ul className="space-y-3">
        {activities.map((activity, index) => (
          <li
            key={index}
            className="text-gray-700 dark:text-gray-300 text-sm border-b border-gray-100 dark:border-gray-700 pb-2"
          >
            • {activity}
          </li>
        ))}
      </ul>
    </div>
  );
}
