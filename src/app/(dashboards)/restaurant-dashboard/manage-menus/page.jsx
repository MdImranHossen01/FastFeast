import Image from "next/image";
import React from "react";
import { FaTag, FaLeaf, FaUtensils, FaSearch, FaList } from "react-icons/fa";

export default function ManageMenusPage() {
  const menu = {
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
    isCombo: false,
    isSpecialOffer: true,
    discountRate: 20,
    offerPrice: 256,
    reviewsCount: 0,
    rating: 0,
  };

  return (
    <div className="min-h-screen bg-base-200 p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
        <h1 className="text-4xl font-extrabold text-gray-900">
          🍜 Manage Menus
        </h1>
        <div className="flex gap-3">
          {/* Search Button */}
          <button className="text-black font-bold px-4 py-2 rounded flex items-center gap-2">
            <FaSearch /> Search Menu
          </button>
          {/* All Orders Button */}
          <button className="text-black font-bold px-4 py-2 rounded flex items-center gap-2">
            <FaList /> All Orders
          </button>
        </div>
      </div>

      {/* Menu Card */}
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-3xl mx-auto hover:shadow-2xl transition-shadow duration-300">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Image */}
          <div className="relative w-full md:w-64 h-48 rounded-xl overflow-hidden border">
            <Image
              src="https://i.ibb.co/G7vLF1h/soup.jpg"
              alt={menu.name}
              layout="fill"
              objectFit="cover"
            />
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-2">
              {menu.name}
              {menu.isSpecialOffer && (
                <span className="badge badge-warning text-white flex items-center gap-1">
                  <FaTag /> {menu.discountRate}% Off
                </span>
              )}
            </h2>
            <p className="text-gray-800 mt-2 leading-relaxed">{menu.description}</p>

            {/* Cuisine & Category */}
            <div className="mt-3 text-sm text-gray-800 flex items-center gap-1">
              <FaUtensils /> {menu.cuisine} • {menu.category}
            </div>

            {/* Ingredients */}
            <div className="mt-4">
              <h4 className="text-sm font-extrabold text-gray-900 mb-1">Ingredients:</h4>
              <div className="flex flex-wrap gap-2">
                {menu.ingredients.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Dietary Tags */}
            <div className="mt-4">
              <h4 className="text-sm font-extrabold text-gray-900 mb-1">Dietary Tags:</h4>
              <div className="flex flex-wrap gap-2">
                {menu.dietaryTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm flex items-center gap-1"
                  >
                    <FaLeaf /> {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="mt-6 flex items-center gap-3">
              {menu.isSpecialOffer ? (
                <>
                  <p className="text-2xl font-extrabold text-orange-600">
                    ৳ {menu.offerPrice}
                  </p>
                  <p className="line-through text-gray-400">৳ {menu.price}</p>
                </>
              ) : (
                <p className="text-2xl font-extrabold text-orange-600">৳ {menu.price}</p>
              )}
            </div>

            {/* Availability */}
            <p
              className={`mt-3 text-sm font-extrabold ${
                menu.availability ? "text-green-700" : "text-red-700"
              }`}
            >
              {menu.availability ? "Available" : "Out of Stock"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
