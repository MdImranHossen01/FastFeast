"use client";

import React, { useState } from "react";
import Form from "next/form";
import { createRider } from "@/app/actions/rider/createRider";

const AddRiderForm = () => {
  // State for form fields that need special handling
  const [vehicleType, setVehicleType] = useState("motorcycle");
  const [availability, setAvailability] = useState({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: true,
    sun: true
  });

  // Options for vehicle type
  const vehicleTypeOptions = [
    { value: "bicycle", label: "Bicycle" },
    { value: "motorcycle", label: "Motorcycle" },
    { value: "car", label: "Car" }
  ];

  // Options for area dropdown
  const areaOptions = [
    "Dhanmondi", "Mirpur", "Uttara", "Banani", "Gulshan", "Others"
  ];

  // Handle availability change
  const handleAvailabilityChange = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };

  const handleSubmit = (formData) => {
    // Add availability to form data
    formData.append("availability", JSON.stringify(availability));
    
    // Call the createRider action
    return createRider(formData);
  };

  return (
    <Form
      action={handleSubmit}
      className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <h1 className="text-2xl font-semibold text-center mb-6 text-orange-500">
        Become a FastFeast Rider
      </h1>
      
      {/* Personal Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Personal Information</h2>
        
        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="fullName">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your email address"
            required
          />
        </div>

        {/* Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* NID Number */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="nid">
            NID Number
          </label>
          <input
            type="text"
            id="nid"
            name="nid"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your NID number"
            required
          />
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="dateOfBirth">
            Date of Birth
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
      </div>

      {/* Address Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Address Information</h2>
        
        {/* Present Address */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="presentAddress">
            Present Address
          </label>
          <textarea
            id="presentAddress"
            name="presentAddress"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your present address"
            rows={2}
            required
          />
        </div>

        {/* Area */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="area">
            Preferred Working Area
          </label>
          <select
            id="area"
            name="area"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          >
            <option value="">Select your preferred working area</option>
            {areaOptions.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Vehicle Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Vehicle Information</h2>
        
        {/* Vehicle Type */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Vehicle Type</label>
          <div className="flex space-x-4">
            {vehicleTypeOptions.map((option) => (
              <div key={option.value} className="flex items-center">
                <input
                  type="radio"
                  id={option.value}
                  name="vehicleType"
                  value={option.value}
                  checked={vehicleType === option.value}
                  onChange={() => setVehicleType(option.value)}
                  className="h-4 w-4 text-orange-500 focus:ring-orange-500"
                />
                <label htmlFor={option.value} className="ml-2 text-gray-700">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Vehicle Model */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="vehicleModel">
            Vehicle Model
          </label>
          <input
            type="text"
            id="vehicleModel"
            name="vehicleModel"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your vehicle model"
            required
          />
        </div>

        {/* Vehicle Number */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="vehicleNumber">
            Vehicle Number
          </label>
          <input
            type="text"
            id="vehicleNumber"
            name="vehicleNumber"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your vehicle number"
            required
          />
        </div>

        {/* License Number */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="licenseNumber">
            Driving License Number
          </label>
          <input
            type="text"
            id="licenseNumber"
            name="licenseNumber"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your driving license number"
            required
          />
        </div>
      </div>

      {/* Bank Information */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Bank Information</h2>
        
        {/* Bank Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="bankName">
            Bank Name
          </label>
          <input
            type="text"
            id="bankName"
            name="bankName"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your bank name"
            required
          />
        </div>

        {/* Account Number */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="accountNumber">
            Account Number
          </label>
          <input
            type="text"
            id="accountNumber"
            name="accountNumber"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter your account number"
            required
          />
        </div>

        {/* Account Holder Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="accountHolderName">
            Account Holder Name
          </label>
          <input
            type="text"
            id="accountHolderName"
            name="accountHolderName"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter account holder name"
            required
          />
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Availability</h2>
        <p className="text-gray-600 mb-4">Select the days you are available to work:</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {Object.entries(availability).map(([day, isAvailable]) => (
            <div key={day} className="flex items-center">
              <input
                type="checkbox"
                id={day}
                checked={isAvailable}
                onChange={() => handleAvailabilityChange(day)}
                className="h-4 w-4 text-orange-500 focus:ring-orange-500"
              />
              <label htmlFor={day} className="ml-2 text-gray-700 capitalize">
                {day}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Emergency Contact</h2>
        
        {/* Emergency Contact Name */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="emergencyContactName">
            Emergency Contact Name
          </label>
          <input
            type="text"
            id="emergencyContactName"
            name="emergencyContactName"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter emergency contact name"
            required
          />
        </div>

        {/* Emergency Contact Phone */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="emergencyContactPhone">
            Emergency Contact Phone
          </label>
          <input
            type="tel"
            id="emergencyContactPhone"
            name="emergencyContactPhone"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter emergency contact phone number"
            required
          />
        </div>

        {/* Relationship */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="relationship">
            Relationship
          </label>
          <input
            type="text"
            id="relationship"
            name="relationship"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter relationship (e.g. Father, Spouse, Friend)"
            required
          />
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="mb-6">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="termsAccepted"
            name="termsAccepted"
            className="h-4 w-4 text-orange-500 focus:ring-orange-500"
            required
          />
          <label htmlFor="termsAccepted" className="ml-2 text-gray-700">
            I agree to the terms and conditions and privacy policy
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
      >
        Submit Application
      </button>
    </Form>
  );
};

export default AddRiderForm;