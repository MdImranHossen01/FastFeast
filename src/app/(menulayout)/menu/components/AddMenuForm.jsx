"use client";

import React, { useState } from "react";
import Form from "next/form";
import { createMenu } from "@/app/actions/menu/createMenu";

const AddMenuForm = () => {
  const [ingredients, setIngredients] = useState("");
  const [dietaryTags, setDietaryTags] = useState("");
  const [availability, setAvailability] = useState("true");
  const [isCombo, setIsCombo] = useState("false");

  // Options for cuisine dropdown
  const cuisineOptions = [
    "Thai", "Italian", "Indian", "Chinese", "Japanese", "Korean", "Turkish", "Others"
  ];

  // Options for category dropdown
  const categoryOptions = [
    "Kebab", "Khichuri", "Shawarma", "Burgers", "Cakes", "Biryani", 
    "Pizza", "Soups", "Sushi", "Fried Chicken", "Noodles", "Snacks", "Pasta", "Others"
  ];

  const handleIngredientsChange = (e) => {
    setIngredients(e.target.value);
  };

  const handleDietaryTagsChange = (e) => {
    setDietaryTags(e.target.value);
  };

  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.value);
  };

  const handleIsComboChange = (e) => {
    setIsCombo(e.target.value);
  };

  const handleSubmit = (formData) => {
    // Process ingredients and dietary tags from comma-separated strings to arrays
    const ingredientsArray = ingredients
      .split(",")
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    const dietaryTagsArray = dietaryTags
      .split(",")
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    // Add processed arrays to form data
    formData.append("ingredients", JSON.stringify(ingredientsArray));
    formData.append("dietaryTags", JSON.stringify(dietaryTagsArray));
    formData.append("availability", availability === "true");
    formData.append("isCombo", isCombo === "true");
    
    // Call the createMenu action
    return createMenu(formData);
  };

  return (
    <Form
      action={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <h1 className="text-2xl font-semibold text-center mb-6 text-orange-500">
        Add Menu Item
      </h1>
      
      {/* Image URL */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="imageUrl">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter image URL"
          required
        />
      </div>

      {/* Title */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="title">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter menu title"
          required
        />
      </div>

      {/* Description */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter description"
          required
        />
      </div>

      {/* Price */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="price">
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter price"
          min="0"
          step="0.01"
          required
        />
      </div>

      {/* Is Combo - Radio Buttons */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Is Combo?</label>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="comboYes"
              name="isCombo"
              value="true"
              checked={isCombo === "true"}
              onChange={handleIsComboChange}
              className="h-4 w-4 text-orange-500 focus:ring-orange-500"
            />
            <label htmlFor="comboYes" className="ml-2 text-gray-700">
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="comboNo"
              name="isCombo"
              value="false"
              checked={isCombo === "false"}
              onChange={handleIsComboChange}
              className="h-4 w-4 text-orange-500 focus:ring-orange-500"
            />
            <label htmlFor="comboNo" className="ml-2 text-gray-700">
              No
            </label>
          </div>
        </div>
      </div>

      {/* Availability - Radio Buttons */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Available?</label>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="availableYes"
              name="availability"
              value="true"
              checked={availability === "true"}
              onChange={handleAvailabilityChange}
              className="h-4 w-4 text-orange-500 focus:ring-orange-500"
            />
            <label htmlFor="availableYes" className="ml-2 text-gray-700">
              Yes
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="availableNo"
              name="availability"
              value="false"
              checked={availability === "false"}
              onChange={handleAvailabilityChange}
              className="h-4 w-4 text-orange-500 focus:ring-orange-500"
            />
            <label htmlFor="availableNo" className="ml-2 text-gray-700">
              No
            </label>
          </div>
        </div>
      </div>

      {/* Cuisine Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="cuisine">
          Cuisine
        </label>
        <select
          id="cuisine"
          name="cuisine"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        >
          <option value="">Select a cuisine</option>
          {cuisineOptions.map((cuisine) => (
            <option key={cuisine} value={cuisine}>
              {cuisine}
            </option>
          ))}
        </select>
      </div>

      {/* Category Dropdown */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          name="category"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          required
        >
          <option value="">Select a category</option>
          {categoryOptions.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Rating */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="rating">
          Rating
        </label>
        <input
          type="number"
          id="rating"
          name="rating"
          step="0.1"
          max="5"
          min="0"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter rating"
          required
        />
      </div>

      {/* Ingredients */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="ingredients">
          Ingredients (comma separated)
        </label>
        <input
          type="text"
          id="ingredients"
          name="ingredients"
          value={ingredients}
          onChange={handleIngredientsChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="e.g. Shrimp, Mushrooms, Lemongrass"
        />
      </div>

      {/* Dietary Tags */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="dietaryTags">
          Dietary Tags (comma separated)
        </label>
        <input
          type="text"
          id="dietaryTags"
          name="dietaryTags"
          value={dietaryTags}
          onChange={handleDietaryTagsChange}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="e.g. Gluten-Free, Pescatarian"
        />
      </div>

      {/* Restaurant ID */}
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="restaurantId">
          Restaurant ID
        </label>
        <input
          type="text"
          id="restaurantId"
          name="restaurantId"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter restaurant ID"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Submit
      </button>
    </Form>
  );
};

export default AddMenuForm;