"use client";
import Image from "next/image";
import React from "react";
import {
  AiOutlineClose,
  AiOutlineMail,
  AiOutlinePhone,
  AiOutlineStar,
} from "react-icons/ai";

export default function ViewModal({ restaurants, isOpen, onClose }) {
  const viewDetails = restaurants.find((r) => r._id === isOpen);
  if (!viewDetails) return <p>Restaurant details not found</p>;

  const {
    banner,
    logo,
    name,
    bio,
    cuisines,
    deliveryFee,
    currency,
    estimatedDeliveryTime,
    location,
    contact,
    rating,
    reviewsCount,
    status,
    openingHours,
  } = viewDetails;

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-2xl scrollbar-hidden max-w-4xl mx-auto relative">
      {/* Close Button - Top Right */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 z-50 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-sm border border-white/20"
      >
        <AiOutlineClose className="text-xl" />
      </button>

      {/* Rest of your content remains the same */}
      <div className="relative">
        <Image
          src={banner}
          alt="Restaurant Banner"
          className="w-full h-60 object-cover"
          fill
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        <div className="relative -bottom-1 left-1/2 transform -translate-x-1/2 mb-[-3rem]">
          <Image
            src={logo}
            alt="Restaurant Logo"
            fill
            className="w-28 h-28 rounded-full border-4 border-orange-400 bg-white object-cover shadow-lg"
          />
        </div>
      </div>

      <div className="pt-20 px-6 pb-8 text-gray-800 dark:text-gray-200">
        {/* Name & Status */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">{name}</h2>
          <p
            className={`text-sm mt-1 font-medium ${
              status === "approved"
                ? "text-green-500"
                : status === "pending"
                ? "text-yellow-500"
                : "text-red-500"
            }`}
          >
            Status: {status}
          </p>
        </div>

        {/* Cuisines & Quick Info Card */}
        <div className="bg-orange-50 dark:bg-gray-800 p-4 rounded-xl shadow-md mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <p>
            <span className="font-semibold text-orange-500">Cuisine:</span>{" "}
            {cuisines?.join(", ")}
          </p>
          <p>
            <span className="font-semibold text-orange-500">Delivery Fee:</span>{" "}
            {deliveryFee} {currency}
          </p>
          <p>
            <span className="font-semibold text-orange-500">
              Delivery Time:
            </span>{" "}
            {estimatedDeliveryTime}
          </p>
          <p className="flex items-center gap-1">
            <AiOutlineStar className="text-orange-500" /> {rating} (
            {reviewsCount} reviews)
          </p>
        </div>

        {/* Bio */}
        <div className="mb-5">
          <h3 className="font-semibold text-orange-500 text-lg mb-1">
            About Restaurant
          </h3>
          <p className="leading-relaxed">{bio}</p>
        </div>

        {/* Location */}
        <div className="mb-5">
          <h3 className="font-semibold text-orange-500 text-lg mb-1">
            Location
          </h3>
          <p>
            {location.address}, {location.area}, {location.city},{" "}
            {location.country}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Coordinates: {location.coordinates.lat}, {location.coordinates.lng}
          </p>
        </div>

        {/* Contact */}
        <div className="mb-5">
          <h3 className="font-semibold text-orange-500 text-lg mb-1">
            Contact
          </h3>
          <p className="flex items-center gap-2">
            <AiOutlinePhone className="text-orange-500" /> {contact.phone}
          </p>
          <p className="flex items-center gap-2">
            <AiOutlineMail className="text-orange-500" /> {contact.email}
          </p>
        </div>

        {/* Opening Hours */}
        <div className="mb-5">
          <h3 className="font-semibold text-orange-500 text-lg mb-2">
            Opening Hours
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
            {Object.entries(openingHours).map(([day, hours]) => (
              <div
                key={day}
                className="border border-gray-300 dark:border-gray-700 rounded-lg p-2 text-center bg-white dark:bg-gray-800"
              >
                <p className="font-semibold text-orange-500 capitalize">
                  {day}
                </p>
                <p>
                  {hours.open} - {hours.close}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
