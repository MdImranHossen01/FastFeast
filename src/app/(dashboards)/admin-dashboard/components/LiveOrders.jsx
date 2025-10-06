"use client";
import React from "react";

export default function LiveOrders() {
  const orders = [
    {
      id: "#ORD-1234",
      customer: "Liam",
      restaurant: "Burger Town",
      status: "On the way",
    },
    {
      id: "#ORD-1235",
      customer: "Olivia",
      restaurant: "Sushi Waves",
      status: "Preparing",
    },
    {
      id: "#ORD-1236",
      customer: "Noah",
      restaurant: "Spicy Hub",
      status: "Delivered",
    },
  ];

  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Live Orders
      </h2>
      <ul className="space-y-3">
        {orders.map((order, i) => (
          <li
            key={i}
            className="flex justify-between items-center border-b pb-2 text-gray-700 dark:text-gray-300"
          >
            <div>
              <p className="font-semibold">{order.id}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {order.customer} • {order.restaurant}
              </p>
            </div>
            <span
              className={`px-3 py-1 text-xs rounded-full ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300"
                  : order.status === "On the way"
                  ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-300"
              }`}
            >
              {order.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
