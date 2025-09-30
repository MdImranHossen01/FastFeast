"use client";
import React from "react";

export default function PopularDishes() {
  const dishes = [
    { name: "Cheese Burger", restaurant: "Burger Town", orders: 512 },
    { name: "Pepperoni Pizza", restaurant: "Pizza Palace", orders: 468 },
    { name: "Spicy Ramen", restaurant: "Spicy Hub", orders: 432 },
  ];

  return (
    <div className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow">
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
        Popular Dishes
      </h2>
      <ul className="space-y-3">
        {dishes.map((dish, i) => (
          <li
            key={i}
            className="flex justify-between text-gray-700 dark:text-gray-300"
          >
            <div>
              <p className="font-medium">{dish.name}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {dish.restaurant}
              </p>
            </div>
            <span className="text-sm font-semibold">{dish.orders} orders</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
