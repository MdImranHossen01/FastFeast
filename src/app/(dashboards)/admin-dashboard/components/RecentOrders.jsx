"use client";
import React from "react";

export default function RecentOrders() {
  const orders = [
    { id: "#1021", customer: "Alice", total: "$28.50", status: "Delivered" },
    { id: "#1022", customer: "Bob", total: "$15.20", status: "On the way" },
    { id: "#1023", customer: "Clara", total: "$45.00", status: "Pending" },
  ];

  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Recent Orders
      </h2>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="text-gray-600 dark:text-gray-300 border-b dark:border-gray-700">
            <th className="py-2">Order ID</th>
            <th className="py-2">Customer</th>
            <th className="py-2">Total</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr
              key={i}
              className="text-gray-700 dark:text-gray-300 border-b dark:border-gray-700"
            >
              <td className="py-3">{order.id}</td>
              <td className="py-3">{order.customer}</td>
              <td className="py-3">{order.total}</td>
              <td
                className={`py-3 font-medium ${
                  order.status === "Delivered"
                    ? "text-green-500"
                    : order.status === "On the way"
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {order.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
