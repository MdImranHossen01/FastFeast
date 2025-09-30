"use client";
import React from "react";

export default function TrendingFoods() {
  const foods = [
    { name: "Pepperoni Pizza", orders: 940, revenue: "$8,300" },
    { name: "Cheese Burger", orders: 870, revenue: "$7,950" },
    { name: "Sushi Combo", orders: 710, revenue: "$7,120" },
    { name: "Spicy Ramen", orders: 645, revenue: "$6,580" },
  ];

  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Most Ordered Foods
      </h2>
      <ul className="divide-y dark:divide-gray-700">
        {foods.map((item, i) => (
          <li
            key={i}
            className="py-3 flex justify-between text-gray-700 dark:text-gray-300"
          >
            <span>{item.name}</span>
            <span>
              {item.orders} orders – {item.revenue}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
