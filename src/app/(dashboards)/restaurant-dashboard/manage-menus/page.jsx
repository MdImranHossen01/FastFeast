"use client";

import React, { useState } from "react";
import { FaTag, FaLeaf, FaUtensils, FaSearch, FaPlus } from "react-icons/fa";

export default function ManageMenusPage() {
  const [menuItems, setMenuItems] = useState([
    {
      name: "Tom Yum Soup",
      description:
        "A spicy and sour Thai soup with shrimp, mushrooms, lemongrass, and kaffir lime leaves.",
      price: 320,
      cuisine: "Thai",
      category: "Soups",
      ingredients: ["Shrimp", "Mushrooms", "Lemongrass", "Kaffir Lime", "Chili", "Lime Juice"],
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
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: "",
    cuisine: "",
    category: "",
    ingredients: [],
    dietaryTags: [],
    availability: true,
    isSpecialOffer: false,
    discountRate: 0,
    offerPrice: 0,
  });

  const [ingredientInput, setIngredientInput] = useState("");
  const [dietaryInput, setDietaryInput] = useState("");

  const handleAddIngredient = () => {
    if (ingredientInput.trim() !== "") {
      setNewMenu({ ...newMenu, ingredients: [...newMenu.ingredients, ingredientInput] });
      setIngredientInput("");
    }
  };

  const handleAddDietary = () => {
    if (dietaryInput.trim() !== "") {
      setNewMenu({ ...newMenu, dietaryTags: [...newMenu.dietaryTags, dietaryInput] });
      setDietaryInput("");
    }
  };

  const handleSubmit = () => {
    setMenuItems([
      ...menuItems,
      { ...newMenu, price: Number(newMenu.price), offerPrice: Number(newMenu.offerPrice) },
    ]);
    setNewMenu({
      name: "",
      description: "",
      price: "",
      cuisine: "",
      category: "",
      ingredients: [],
      dietaryTags: [],
      availability: true,
      isSpecialOffer: false,
      discountRate: 0,
      offerPrice: 0,
    });
    setIngredientInput("");
    setDietaryInput("");
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-gray-900 text-center sm:text-left">
           Manage Menus
        </h1>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-gray-800 transition">
            <FaSearch /> Search Menu
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white hover:bg-gray-800 transition"
          >
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
            {menuItems.map((item, idx) => (
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
          </tbody>
        </table>
      </div>

      {/* Add Menu Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl">
            <h2 className="text-2xl font-extrabold mb-4">➕ Add Menu Item</h2>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Menu Name"
                className="input input-bordered w-full"
                value={newMenu.name}
                onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })}
              />
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered w-full"
                value={newMenu.description}
                onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })}
              />
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Price"
                  className="input input-bordered flex-1"
                  value={newMenu.price}
                  onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Cuisine"
                  className="input input-bordered flex-1"
                  value={newMenu.cuisine}
                  onChange={(e) => setNewMenu({ ...newMenu, cuisine: e.target.value })}
                />
              </div>
              <input
                type="text"
                placeholder="Category"
                className="input input-bordered w-full"
                value={newMenu.category}
                onChange={(e) => setNewMenu({ ...newMenu, category: e.target.value })}
              />

              {/* Ingredients */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add Ingredient"
                  className="input input-bordered flex-1"
                  value={ingredientInput}
                  onChange={(e) => setIngredientInput(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newMenu.ingredients.map((ing, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                    {ing}
                  </span>
                ))}
              </div>

              {/* Dietary Tags */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add Dietary Tag"
                  className="input input-bordered flex-1"
                  value={dietaryInput}
                  onChange={(e) => setDietaryInput(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleAddDietary}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newMenu.dietaryTags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1">
                    <FaLeaf /> {tag}
                  </span>
                ))}
              </div>

              {/* Availability & Special Offer */}
              <div className="flex gap-3 items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newMenu.availability}
                    onChange={(e) => setNewMenu({ ...newMenu, availability: e.target.checked })}
                  />
                  Available
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newMenu.isSpecialOffer}
                    onChange={(e) => setNewMenu({ ...newMenu, isSpecialOffer: e.target.checked })}
                  />
                  Special Offer
                </label>
              </div>

              {newMenu.isSpecialOffer && (
                <div className="flex gap-3">
                  <input
                    type="number"
                    placeholder="Discount %"
                    className="input input-bordered flex-1"
                    value={newMenu.discountRate}
                    onChange={(e) => setNewMenu({ ...newMenu, discountRate: e.target.value })}
                  />
                  <input
                    type="number"
                    placeholder="Offer Price"
                    className="input input-bordered flex-1"
                    value={newMenu.offerPrice}
                    onChange={(e) => setNewMenu({ ...newMenu, offerPrice: e.target.value })}
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 mt-4">
                <button
                  className="btn btn-ghost"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-primary"
                  onClick={handleSubmit}
                >
                  Add Menu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
