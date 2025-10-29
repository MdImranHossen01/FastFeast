"use client";

import React, { useState } from "react";
import { FaTag, FaLeaf, FaUtensils, FaPlus, FaSearch } from "react-icons/fa";

export default function ManageMenusPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const menuItems = [
    {
      name: "Tom Yum Soup",
      description:
        "A spicy and sour Thai soup with shrimp, mushrooms, lemongrass, and kaffir lime leaves.",
      price: 320,
      cuisine: "Thai",
      category: "Soups",
      ingredients: [
        "Shrimp",
        "Mushrooms",
        "Lemongrass",
        "Kaffir Lime",
        "Chili",
        "Lime Juice",
      ],
      dietaryTags: ["Gluten-Free", "Pescatarian"],
      availability: true,
      isSpecialOffer: true,
      discountRate: 20,
      offerPrice: 256,
    },
    {
      name: "Pad Thai",
      description: "Stir-fried noodles with shrimp, tofu, peanuts, and bean sprouts.",
      price: 280,
      cuisine: "Thai",
      category: "Main Course",
      ingredients: ["Noodles", "Shrimp", "Tofu", "Peanuts", "Bean Sprouts"],
      dietaryTags: ["Gluten-Free"],
      availability: true,
      isSpecialOffer: false,
      discountRate: 0,
      offerPrice: 0,
    },
  ];

  // Filter menu based on search query
  const filteredMenu = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-gray-900">🍜 Manage Menus</h1>

        {/* Search Input */}
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
            <FaSearch /> Search
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition">
            <FaPlus /> Add Menu
          </button>
        </div>
      </div>

      {/* Menu Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow-md">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-900 border-b">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Cuisine</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Special Offer</th>
              <th className="py-3 px-4">Availability</th>
              <th className="py-3 px-4">Ingredients</th>
              <th className="py-3 px-4">Dietary Tags</th>
            </tr>
          </thead>
          <tbody>
            {filteredMenu.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 transition">
                <td className="py-3 px-4 font-semibold">{item.name}</td>
                <td className="py-3 px-4">{item.cuisine}</td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4">
                  {item.isSpecialOffer ? (
                    <div className="flex items-center gap-2">
                      <span className="text-orange-600 font-bold">৳ {item.offerPrice}</span>
                      <span className="line-through text-gray-400">৳ {item.price}</span>
                    </div>
                  ) : (
                    <span className="text-orange-600 font-bold">৳ {item.price}</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {item.isSpecialOffer && (
                    <span className="badge badge-warning text-white flex items-center gap-1">
                      <FaTag /> {item.discountRate}%
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  <span className={`font-semibold ${item.availability ? "text-green-600" : "text-red-600"}`}>
                    {item.availability ? "Available" : "Out of Stock"}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {item.ingredients.map((ing, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 rounded-full text-xs">{ing}</span>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex flex-wrap gap-1">
                    {item.dietaryTags.map((tag, i) => (
                      <span key={i} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                        <FaLeaf /> {tag}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {filteredMenu.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-6 text-gray-500">
                  No menu items found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
