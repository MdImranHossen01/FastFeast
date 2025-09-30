// G:\Level 1\backend\EJP-SCIC\End-Game\FastFeast\src\app\(menulayout)\menu\components\AddMenuForm.jsx
import React from "react";
import Form from "next/form";
import { createMenu } from "@/app/actions/menu/createMenu";

const AddMenuForm = () => {
  return (
    <Form
      action={createMenu}
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

      {/* Is Combo */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="isCombo"
          name="isCombo"
          className="h-5 w-5 text-orange-500 focus:ring-orange-500"
        />
        <label className="ml-3 text-gray-700" htmlFor="isCombo">
          Is Combo?
        </label>
      </div>

      {/* Special Offer */}
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="specialOffer"
          name="specialOffer"
          className="h-5 w-5 text-orange-500 focus:ring-orange-500"
        />
        <label className="ml-3 text-gray-700" htmlFor="specialOffer">
          Special Offer?
        </label>
      </div>

      {/* Offer Price */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="offerPrice">
          Offer Price
        </label>
        <input
          type="number"
          id="offerPrice"
          name="offerPrice"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter offer price"
          min="0"
          step="0.01"
        />
      </div>

      {/* Cuisine */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="cuisine">
          Cuisine
        </label>
        <input
          type="text"
          id="cuisine"
          name="cuisine"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter cuisine"
          required
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2" htmlFor="category">
          Category
        </label>
        <input
          type="text"
          id="category"
          name="category"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          placeholder="Enter category"
          required
        />
      </div>

      {/* Rating */}
      <div className="mb-6">
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

      {/* Restaurant Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Restaurant Information
        </h2>

        {/* Restaurant Logo URL */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="restaurant.logoUrl">
            Restaurant Logo URL
          </label>
          <input
            type="text"
            id="restaurant.logoUrl"
            name="restaurant.logoUrl"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter restaurant logo URL"
            required
          />
        </div>

        {/* Restaurant Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="restaurant.name">
            Restaurant Name
          </label>
          <input
            type="text"
            id="restaurant.name"
            name="restaurant.name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter restaurant name"
            required
          />
        </div>

        {/* Restaurant Address */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="restaurant.address">
            Restaurant Address
          </label>
          <input
            type="text"
            id="restaurant.address"
            name="restaurant.address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter restaurant address"
            required
          />
        </div>

        {/* Restaurant Mobile */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="restaurant.mobile">
            Restaurant Mobile
          </label>
          <input
            type="tel"
            id="restaurant.mobile"
            name="restaurant.mobile"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter restaurant mobile number"
            required
          />
        </div>

        {/* Restaurant Ratings */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="restaurant.ratings">
            Restaurant Ratings
          </label>
          <input
            type="number"
            id="restaurant.ratings"
            name="restaurant.ratings"
            step="0.1"
            max="5"
            min="0"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter restaurant ratings"
            required
          />
        </div>

        {/* Restaurant Location */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="restaurant.location">
            Restaurant Location
          </label>
          <input
            type="text"
            id="restaurant.location"
            name="restaurant.location"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter restaurant location"
            required
          />
        </div>

        {/* Restaurant Delivery Time */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="restaurant.deliveryTime">
            Delivery Time (mins)
          </label>
          <input
            type="number"
            id="restaurant.deliveryTime"
            name="restaurant.deliveryTime"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter delivery time"
            min="0"
            required
          />
        </div>
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