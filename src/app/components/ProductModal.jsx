// src/app/components/ProductModal.jsx

"use client";

import React, { useState } from 'react';
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline'; // Icons for quantity and close

/**
 * Renders a modal for product customization and order confirmation.
 * @param {object} product - The product data to display.
 * @param {function} onClose - Function to close the modal.
 */
const ProductModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  if (!product) return null; // Don't render if no product is passed

  const handleConfirmOrder = () => {
    // Add logic here to dispatch the final order to the cart
    onClose(); 
  };

  return (
    // Backdrop for the modal
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={onClose}>
      
      {/* Modal Content - mimics the design from the image */}
      <div 
        className="bg-white text-gray-800 w-full max-w-md mx-auto rounded-lg shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()} // Stop click propagation to prevent closing on content click
      >
        
        {/* Modal Header & Image Container */}
        <div className="relative h-48 sm:h-64 overflow-hidden">
          <img 
            src={product.imageUrl} 
            alt={product.title} 
            className="w-full h-full object-cover" 
          />
          {/* Close Button */}
          <button 
            className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full shadow-lg hover:bg-white transition"
            onClick={onClose}
            aria-label="Close modal"
          >
            <XMarkIcon className="h-6 w-6 text-gray-700" />
          </button>
        </div>

        {/* Modal Body: Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-grow">
          {/* Product Title and Price */}
          <h3 className="text-2xl font-extrabold mb-1">{product.title}</h3>
          <p className="text-3xl font-bold text-orange-600 mb-4">
            ${product.offerPrice.toFixed(2)}
          </p>

          {/* Product Description */}
          <p className="text-gray-600 mb-6">
            {product.description || 'A delightful dish with special flavors and high-quality ingredients.'}
          </p>

          {/* Special Instructions Section */}
          <div className="mb-6 border-t border-gray-200 pt-4">
            <h4 className="text-lg font-semibold mb-2">Special Instructions</h4>
            <p className="text-sm text-gray-500 mb-2">
              Special requests are subject to the restaurant's approval. Tell us here!
            </p>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-orange-600 focus:border-orange-600 resize-none text-sm"
              rows="3"
              placeholder="E.g., No cilantro, extra spicy..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
            />
          </div>
        </div>

        {/* Modal Footer: Quantity Selector and Add to Cart Button */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center sticky bottom-0">
          
          {/* Quantity Selector */}
          <div className="flex items-center space-x-2 border border-gray-300 rounded-full p-1">
            <button 
              className="p-2 rounded-full hover:bg-gray-200 disabled:opacity-50 transition"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity === 1}
            >
              <MinusIcon className="h-5 w-5" />
            </button>
            <span className="font-bold w-6 text-center">{quantity}</span>
            <button 
              className="p-2 rounded-full hover:bg-gray-200 transition"
              onClick={() => setQuantity(q => q + 1)}
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Add to Cart Button */}
          <button
            className="flex-1 ml-4 py-3 bg-orange-600 text-white font-bold rounded-full text-lg shadow-lg hover:bg-pink-700 transition"
            onClick={handleConfirmOrder}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;