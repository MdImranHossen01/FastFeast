// src/app/(menulayout)/menu/components/MenuModal.jsx
"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/lib/cartContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

const MenuModal = ({ isOpen, onClose, menu }) => {
  const [quantity, setQuantity] = React.useState(1);
  const [specialInstructions, setSpecialInstructions] = React.useState("");
  const { addToCart } = useCart();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    addToCart(menu, quantity, specialInstructions);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white text-gray-800 w-full max-w-md mx-auto rounded-lg shadow-2xl max-h-[90vh] overflow-hidden grid grid-rows-[auto_1fr_auto]" onClick={(e) => e.stopPropagation()}>
          {/* Image */}

        <div className="relative h-48 sm:h-64 overflow-hidden">
          <Image
            src={menu.imageUrl}
            alt={menu.title}
            layout="fill"
            objectFit="cover"
            className="rounded-t-xl"
            fill
          />
          {/* Close button */}
          <button
            className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full shadow-lg hover:bg-white transition"
            onClick={onClose}
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="p-6 overflow-y-auto flex-grow">
          <div className="flex justify-between items-start mb-4">
            <h2 id="modal-title" className="text-2xl font-bold text-gray-800">
              {menu.title}
            </h2>
            <span className="text-xl font-bold text-orange-500">
              ৳{menu.price}
            </span>
          </div>

          <p className="text-gray-600 mb-6">{menu.description}</p>

          {/* Additional details */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Cuisine</p>
                <p className="font-medium">{menu.cuisine}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{menu.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Rating</p>
                <p className="font-medium">{menu.rating} ★</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Availability</p>
                <p
                  className={`font-medium ${
                    menu.availability ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {menu.availability ? "Available" : "Not Available"}
                </p>
              </div>
            </div>
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
            <div className="flex flex-wrap gap-2">
              {menu.ingredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                >
                  {ingredient}
                </span>
              ))}
            </div>
          </div>

          {/* Dietary Tags */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Dietary Information</h3>
            <div className="flex flex-wrap gap-2">
              {menu.dietaryTags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Special instructions */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Special Instructions</h3>
            <textarea
              placeholder="e.g. No mayo, extra spicy"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              rows={3}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
            ></textarea>
          </div>
        </div>

        {/* Sticky Add to cart button with quantity selector */}
        <div className="sticky gap-4 bottom-0 bg-white border-t border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={decreaseQuantity}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100"
              aria-label="Decrease quantity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 12H4"
                />
              </svg>
            </button>
            <span className="px-4 py-2">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100"
              aria-label="Increase quantity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className="px-6 py-3 w-full bg-orange-500 text-white font-semibold rounded-full hover:bg-orange-600 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
