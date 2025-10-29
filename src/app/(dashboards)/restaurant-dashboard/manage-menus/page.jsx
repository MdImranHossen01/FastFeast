import React from "react";
import { FaTag, FaLeaf, FaUtensils, FaPercent } from "react-icons/fa";

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
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Manage Menus</h1>

      {/* Menu Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 max-w-3xl mx-auto">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Image */}
          <img
            src="https://i.ibb.co/G7vLF1h/soup.jpg"
            alt={menu.name}
            className="w-full md:w-64 h-48 object-cover rounded-xl"
          />

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              {menu.name}
              {menu.isSpecialOffer && (
                <span className="badge badge-warning text-white flex items-center gap-1">
                  <FaTag /> {menu.discountRate}% Off
                </span>
              )}
            </h2>
            <p className="text-gray-600 mt-2">{menu.description}</p>

            {/* Cuisine & Category */}
            <div className="mt-3 text-sm text-gray-500">
              <p>
                <FaUtensils className="inline mr-1" /> {menu.cuisine} •{" "}
                {menu.category}
              </p>
            </div>

            {/* Ingredients */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                Ingredients:
              </h4>
              <div className="flex flex-wrap gap-2">
                {menu.ingredients.map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Dietary Tags */}
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">
                Dietary Tags:
              </h4>
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
            <div className="mt-5 flex items-center gap-3">
              {menu.isSpecialOffer ? (
                <>
                  <p className="text-2xl font-bold text-primary">
                    ৳ {menu.offerPrice}
                  </p>
                  <p className="line-through text-gray-400">৳ {menu.price}</p>
                </>
              ) : (
                <p className="text-2xl font-bold text-primary">
                  ৳ {menu.price}
                </p>
              )}
            </div>

            {/* Availability */}
            <p
              className={`mt-3 text-sm font-medium ${
                menu.availability ? "text-green-600" : "text-red-600"
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
