"use client";

import React, { useState } from "react";
import { FaTag, FaLeaf, FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function ManageMenusPage() {
  const [menuItems, setMenuItems] = useState([
    {
      name: "Tom Yum Soup",
      description:
        "A spicy and sour Thai soup with shrimp, mushrooms, lemongrass, and kaffir lime leaves.",
      price: 320,
      category: "Soups",
      ingredients: ["Shrimp", "Mushrooms", "Lemongrass", "Kaffir Lime", "Chili", "Lime Juice"],
      dietaryTags: ["Gluten-Free", "Pescatarian"],
      isSpecialOffer: true,
      discountRate: 20,
      offerPrice: 256,
    },
    {
      name: "Pad Thai",
      description: "Stir-fried noodles with shrimp, tofu, peanuts, and bean sprouts.",
      price: 280,
      category: "Main Course",
      ingredients: ["Noodles", "Shrimp", "Tofu", "Peanuts", "Bean Sprouts"],
      dietaryTags: ["Gluten-Free"],
      isSpecialOffer: false,
      discountRate: 0,
      offerPrice: 0,
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    ingredients: [],
    dietaryTags: [],
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
    if (editIndex !== null) {
      const updatedMenus = [...menuItems];
      updatedMenus[editIndex] = { ...newMenu, price: Number(newMenu.price), offerPrice: Number(newMenu.offerPrice) };
      setMenuItems(updatedMenus);
    } else {
      setMenuItems([...menuItems, { ...newMenu, price: Number(newMenu.price), offerPrice: Number(newMenu.offerPrice) }]);
    }
    resetForm();
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setNewMenu({ ...menuItems[index] });
    setShowModal(true);
  };

  const handleDelete = (index) => {
    if (confirm("Are you sure you want to delete this menu item?")) {
      setMenuItems(menuItems.filter((_, i) => i !== index));
    }
  };

  const resetForm = () => {
    setNewMenu({
      name: "",
      description: "",
      price: "",
      category: "",
      ingredients: [],
      dietaryTags: [],
      isSpecialOffer: false,
      discountRate: 0,
      offerPrice: 0,
    });
    setIngredientInput("");
    setDietaryInput("");
    setEditIndex(null);
    setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-8 text-gray-800 dark:text-gray-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-4xl font-extrabold text-center sm:text-left">Manage Menus</h1>
        <button
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition"
          onClick={() => setShowModal(true)}
        >
          <FaPlus /> Add Menu
        </button>
      </div>

      {/* Menu Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-2xl shadow-md">
        <table className="w-full text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-b">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Category</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Special Offer</th>
              <th className="py-3 px-4">Ingredients</th>
              <th className="py-3 px-4">Dietary Tags</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition align-top">
                <td className="py-3 px-4 font-semibold">{item.name}</td>
                <td className="py-3 px-4">{item.category}</td>
                <td className="py-3 px-4">
                  {item.isSpecialOffer ? (
                    <div className="flex items-center gap-2">
                      <span className="text-orange-500 font-bold">৳ {item.offerPrice}</span>
                      <span className="line-through text-gray-400">৳ {item.price}</span>
                    </div>
                  ) : (
                    <span className="text-orange-500 font-bold">৳ {item.price}</span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {item.isSpecialOffer && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white rounded-full text-xs">
                      <FaTag /> {item.discountRate}%
                    </span>
                  )}
                </td>
                <td className="py-3 px-4">
                  {item.ingredients.map((ing, i) => (
                    <div key={i} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs inline-block mr-1 mb-1">{ing}</div>
                  ))}
                </td>
                <td className="py-3 px-4">
                  {item.dietaryTags.map((tag, i) => (
                    <div key={i} className="px-2 py-1 bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-100 rounded-full text-xs flex items-center gap-1 inline-block mr-1 mb-1">
                      <FaLeaf /> {tag}
                    </div>
                  ))}
                </td>
                <td className="py-3 px-4 flex gap-2">
                  <button onClick={() => handleEdit(idx)} className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(idx)} className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200">
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto text-gray-900 dark:text-gray-100">
            <h2 className="text-2xl font-extrabold mb-4">{editIndex !== null ? " Edit Menu Item" : "➕ Add Menu Item"}</h2>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Menu Name" className="input input-bordered w-full" value={newMenu.name} onChange={(e) => setNewMenu({ ...newMenu, name: e.target.value })} />
              <textarea placeholder="Description" className="textarea textarea-bordered w-full" value={newMenu.description} onChange={(e) => setNewMenu({ ...newMenu, description: e.target.value })} />
              <input type="number" placeholder="Price" className="input input-bordered w-full" value={newMenu.price} onChange={(e) => setNewMenu({ ...newMenu, price: e.target.value })} />
              <input type="text" placeholder="Category" className="input input-bordered w-full" value={newMenu.category} onChange={(e) => setNewMenu({ ...newMenu, category: e.target.value })} />

              {/* Ingredients */}
              <div className="flex gap-2">
                <input type="text" placeholder="Add Ingredient" className="input input-bordered flex-1" value={ingredientInput} onChange={(e) => setIngredientInput(e.target.value)} />
                <button type="button" onClick={handleAddIngredient} className="btn btn-primary">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newMenu.ingredients.map((ing, idx) => (
                  <span key={idx} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">{ing}</span>
                ))}
              </div>

              {/* Dietary Tags */}
              <div className="flex gap-2">
                <input type="text" placeholder="Add Dietary Tag" className="input input-bordered flex-1" value={dietaryInput} onChange={(e) => setDietaryInput(e.target.value)} />
                <button type="button" onClick={handleAddDietary} className="btn btn-primary">Add</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newMenu.dietaryTags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-green-100 dark:bg-green-700 text-green-600 dark:text-green-100 rounded-full text-xs flex items-center gap-1">
                    <FaLeaf /> {tag}
                  </span>
                ))}
              </div>

              {/* Special Offer */}
              <div className="flex gap-3 items-center">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={newMenu.isSpecialOffer} onChange={(e) => setNewMenu({ ...newMenu, isSpecialOffer: e.target.checked })} />
                  Special Offer
                </label>
              </div>
              {newMenu.isSpecialOffer && (
                <div className="flex gap-3">
                  <input type="number" placeholder="Discount %" className="input input-bordered flex-1" value={newMenu.discountRate} onChange={(e) => setNewMenu({ ...newMenu, discountRate: e.target.value })} />
                  <input type="number" placeholder="Offer Price" className="input input-bordered flex-1" value={newMenu.offerPrice} onChange={(e) => setNewMenu({ ...newMenu, offerPrice: e.target.value })} />
                </div>
              )}

              <div className="flex justify-end gap-3 mt-4">
                <button className="btn btn-ghost" onClick={resetForm}>Cancel</button>
                <button className="btn btn-primary" onClick={handleSubmit}>{editIndex !== null ? "Update Menu" : "Add Menu"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
