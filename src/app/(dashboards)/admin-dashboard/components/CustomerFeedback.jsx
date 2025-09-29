"use client";
import React from "react";

export default function CustomerFeedback() {
  const reviews = [
    { name: "Liam", review: "Fast delivery and great food!", rating: 5 },
    {
      name: "Sophia",
      review: "Burger was cold but service was good.",
      rating: 3,
    },
    { name: "Mia", review: "Loved the sushi! Highly recommend 🍣", rating: 5 },
  ];

  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Customer Feedback
      </h2>
      <div className="space-y-4">
        {reviews.map((r, i) => (
          <div key={i} className="p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
            <p className="text-gray-800 dark:text-gray-200 font-semibold">
              {r.name}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {r.review}
            </p>
            <p className="text-yellow-500 mt-1">{"⭐".repeat(r.rating)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
