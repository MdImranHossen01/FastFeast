"use client";
import React from "react";

export default function TopRestaurants() {
  const topRestaurants = [
    { name: "Pizza Palace", orders: 301, earnings: "$3,280" },
    { name: "Burger Town", orders: 275, earnings: "$2,950" },
    { name: "Spicy Hub", orders: 243, earnings: "$2,610" },
    { name: "Sushi Waves", orders: 198, earnings: "$2,210" },
  ];

  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Top Restaurants
      </h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
            <th className="py-2">Name</th>
            <th className="py-2">Orders</th>
            <th className="py-2">Earnings</th>
          </tr>
        </thead>
        <tbody>
          {topRestaurants.map((restaurant, index) => (
            <tr
              key={index}
              className="text-gray-700 dark:text-gray-300 border-b dark:border-gray-700"
            >
              <td className="py-3">{restaurant.name}</td>
              <td className="py-3">{restaurant.orders}</td>
              <td className="py-3">{restaurant.earnings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
