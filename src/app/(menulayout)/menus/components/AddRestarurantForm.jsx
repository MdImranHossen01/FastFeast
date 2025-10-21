"use client";

import React, { useState } from "react";
import Form from "next/form";
import { createRestaurant } from "@/app/actions/restaurants/createRestaurant";

const AddRestaurantForm = () => {
  // State for form fields that need special handling
  const [cuisines, setCuisines] = useState("");
  const [status, setStatus] = useState("pending");
  const [isFeatured, setIsFeatured] = useState("false");
  const [isActive, setIsActive] = useState("true");
  const [approved, setApproved] = useState("false");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // Options for area dropdown
  const areaOptions = [
    "Dhanmondi", "Mirpur", "Uttara", "Banani", "Gulshan", "Others"
  ];

  // Options for price range dropdown
  const priceRangeOptions = [
    "৳", "৳৳", "৳৳৳"
  ];

  // Handle form field changes
  const handleCuisinesChange = (e) => {
    setCuisines(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleIsFeaturedChange = (e) => {
    setIsFeatured(e.target.value);
  };

  const handleIsActiveChange = (e) => {
    setIsActive(e.target.value);
  };

  const handleApprovedChange = (e) => {
    setApproved(e.target.value);
  };

  const handleLatitudeChange = (e) => {
    setLatitude(e.target.value);
  };

  const handleLongitudeChange = (e) => {
    setLongitude(e.target.value);
  };

  const handleSubmit = (formData) => {
    // Process cuisines from comma-separated string to array
    const cuisinesArray = cuisines
      .split(",")
      .map(item => item.trim())
      .filter(item => item.length > 0);
    
    // Create coordinates object
    const coordinates = {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude)
    };
    
    // Add processed data to form data
    formData.append("cuisines", JSON.stringify(cuisinesArray));
    formData.append("status", status);
    formData.append("isFeatured", isFeatured === "true");
    formData.append("isActive", isActive === "true");
    formData.append("approved", approved === "true");
    formData.append("coordinates", JSON.stringify(coordinates));
    
    // Call the createRestaurant action
    return createRestaurant(formData);
  };

  return (
    <Form
      action={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <h1 className="text-2xl font-semibold text-center mb-6 text-orange-500">
        Add Restaurant
      </h1>
      
      {/* Basic Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Basic Information</h2>
        
        {/* Restaurant Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Restaurant Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter restaurant name"
            required
          />
        </div>

        {/* Slug */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="slug">
            Slug
          </label>
          <input
            type="text"
            id="slug"
            name="slug"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter URL-friendly name (e.g. restaurant-name)"
            required
          />
        </div>

        {/* Logo URL */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="logo">
            Logo URL
          </label>
          <input
            type="text"
            id="logo"
            name="logo"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter logo URL"
            required
          />
        </div>

        {/* Banner URL */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="banner">
            Banner URL
          </label>
          <input
            type="text"
            id="banner"
            name="banner"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter banner URL"
            required
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="bio">
            Description
          </label>
          <textarea
            id="bio"
            name="bio"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter restaurant description"
            rows={3}
            required
          />
        </div>
      </div>

      {/* Restaurant Details */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Restaurant Details</h2>
        
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
            placeholder="Enter rating (0-5)"
            required
          />
        </div>

        {/* Reviews Count */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="reviewsCount">
            Reviews Count
          </label>
          <input
            type="number"
            id="reviewsCount"
            name="reviewsCount"
            min="0"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter number of reviews"
            required
          />
        </div>

        {/* Cuisines */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="cuisines">
            Cuisines (comma separated)
          </label>
          <input
            type="text"
            id="cuisines"
            name="cuisines"
            value={cuisines}
            onChange={handleCuisinesChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. Italian, Chinese, Thai"
            required
          />
        </div>

        {/* Price Range */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="priceRange">
            Price Range
          </label>
          <select
            id="priceRange"
            name="priceRange"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">Select price range</option>
            {priceRangeOptions.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        {/* Estimated Delivery Time */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="estimatedDeliveryTime">
            Estimated Delivery Time
          </label>
          <input
            type="text"
            id="estimatedDeliveryTime"
            name="estimatedDeliveryTime"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="e.g. 30-40 min"
            required
          />
        </div>

        {/* Delivery Fee */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="deliveryFee">
            Delivery Fee
          </label>
          <input
            type="number"
            id="deliveryFee"
            name="deliveryFee"
            min="0"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter delivery fee (0 for free delivery)"
            required
          />
        </div>

        {/* Min Order Value */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="minOrderValue">
            Minimum Order Value
          </label>
          <input
            type="number"
            id="minOrderValue"
            name="minOrderValue"
            min="0"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter minimum order value"
            required
          />
        </div>

        {/* Average Cost For Two */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="avgCostForTwo">
            Average Cost For Two
          </label>
          <input
            type="number"
            id="avgCostForTwo"
            name="avgCostForTwo"
            min="0"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter average cost for two people"
            required
          />
        </div>
      </div>

      {/* Status and Settings */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Status and Settings</h2>
        
        {/* Status - Radio Buttons */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Status</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="statusPending"
                name="status"
                value="pending"
                checked={status === "pending"}
                onChange={handleStatusChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="statusPending" className="ml-2 text-gray-700">
                Pending
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="statusApproved"
                name="status"
                value="approved"
                checked={status === "approved"}
                onChange={handleStatusChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="statusApproved" className="ml-2 text-gray-700">
                Approved
              </label>
            </div>
          </div>
        </div>

        {/* Is Featured - Radio Buttons */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Is Featured?</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="featuredYes"
                name="isFeatured"
                value="true"
                checked={isFeatured === "true"}
                onChange={handleIsFeaturedChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="featuredYes" className="ml-2 text-gray-700">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="featuredNo"
                name="isFeatured"
                value="false"
                checked={isFeatured === "false"}
                onChange={handleIsFeaturedChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="featuredNo" className="ml-2 text-gray-700">
                No
              </label>
            </div>
          </div>
        </div>

        {/* Is Active - Radio Buttons */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Is Active?</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="activeYes"
                name="isActive"
                value="true"
                checked={isActive === "true"}
                onChange={handleIsActiveChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="activeYes" className="ml-2 text-gray-700">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="activeNo"
                name="isActive"
                value="false"
                checked={isActive === "false"}
                onChange={handleIsActiveChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="activeNo" className="ml-2 text-gray-700">
                No
              </label>
            </div>
          </div>
        </div>

        {/* Approved - Radio Buttons */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Approved?</label>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <input
                type="radio"
                id="approvedYes"
                name="approved"
                value="true"
                checked={approved === "true"}
                onChange={handleApprovedChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="approvedYes" className="ml-2 text-gray-700">
                Yes
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="approvedNo"
                name="approved"
                value="false"
                checked={approved === "false"}
                onChange={handleApprovedChange}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor="approvedNo" className="ml-2 text-gray-700">
                No
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Owner Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Owner Information</h2>
        
        {/* Owner ID */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="ownerId">
            Owner ID
          </label>
          <input
            type="text"
            id="ownerId"
            name="ownerId"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter owner ID"
            required
          />
        </div>

        {/* Owner Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="ownerEmail">
            Owner Email
          </label>
          <input
            type="email"
            id="ownerEmail"
            name="ownerEmail"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter owner email"
            required
          />
        </div>
      </div>

      {/* Location Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Location Information</h2>
        
        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="address">
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter street address"
            required
          />
        </div>

        {/* Area */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="area">
            Area
          </label>
          <select
            id="area"
            name="area"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">Select an area</option>
            {areaOptions.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter city"
            defaultValue="Dhaka"
            required
          />
        </div>

        {/* Country */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="country">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter country"
            defaultValue="Bangladesh"
            required
          />
        </div>

        {/* Coordinates */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="latitude">
              Latitude
            </label>
            <input
              type="number"
              id="latitude"
              name="latitude"
              value={latitude}
              onChange={handleLatitudeChange}
              step="any"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter latitude"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="longitude">
              Longitude
            </label>
            <input
              type="number"
              id="longitude"
              name="longitude"
              value={longitude}
              onChange={handleLongitudeChange}
              step="any"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter longitude"
              required
            />
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Information</h2>
        
        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter phone number"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter email address"
            required
          />
        </div>
      </div>

      {/* Opening Hours */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Opening Hours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map((day) => (
            <div key={day} className="mb-4">
              <label className="block text-gray-700 mb-2 capitalize">
                {day}
              </label>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <label className="text-xs text-gray-500">Open</label>
                  <input
                    type="time"
                    id={`${day}Open`}
                    name={`${day}Open`}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-gray-500">Close</label>
                  <input
                    type="time"
                    id={`${day}Close`}
                    name={`${day}Close`}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>
            </div>
          ))}
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

export default AddRestaurantForm;