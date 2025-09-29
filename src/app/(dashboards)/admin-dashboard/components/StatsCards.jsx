"use client";
import React from "react";

export default function StatsCards() {
  const stats = [
    { label: "Total Orders", value: "8,245", change: "+12%" },
    { label: "Total Revenue", value: "$91,230", change: "+8.5%" },
    { label: "Active Users", value: "4,582", change: "+5.2%" },
    { label: "Restaurants", value: "126", change: "+3.1%" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((item, i) => (
        <div
          key={i}
          className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition"
        >
          <h3 className="text-sm text-gray-500 dark:text-gray-400">
            {item.label}
          </h3>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {item.value}
          </p>
          <span className="text-green-500 text-sm font-medium">
            {item.change}
          </span>
        </div>
      ))}
    </div>
  );
}
