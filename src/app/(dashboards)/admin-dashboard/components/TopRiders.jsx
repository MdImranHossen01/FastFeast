"use client";
import React from "react";

export default function TopRiders() {
  const riders = [
    { name: "Emma Smith", orders: 320, rating: 4.9, earnings: "$2,800" },
    { name: "John Carter", orders: 298, rating: 4.8, earnings: "$2,540" },
    { name: "Sophia Lee", orders: 285, rating: 4.7, earnings: "$2,460" },
  ];

  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Top Riders
      </h2>
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
            <th className="py-2">Name</th>
            <th className="py-2">Orders</th>
            <th className="py-2">Rating</th>
            <th className="py-2">Earnings</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, i) => (
            <tr
              key={i}
              className="text-gray-700 dark:text-gray-300 border-b dark:border-gray-700"
            >
              <td className="py-3">{rider.name}</td>
              <td className="py-3">{rider.orders}</td>
              <td className="py-3">{rider.rating} ⭐</td>
              <td className="py-3">{rider.earnings}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
