// src/app/components/ProductCard.jsx

"use client"; 

import React from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/solid'; 

// Props now include the full 'product' object and the 'onOpenModal' function
const ProductCard = ({ product, title, originalPrice, offerPrice, imageUrl, discountRate, onOpenModal }) => {
    
    // Function to open the modal when the card is clicked
    const handleCardClick = () => {
        // This is the function passed down from SpecialOffers.jsx
        onOpenModal(product);
    };

    // This handler ensures that clicking the icon opens the modal
    // and prevents the click from bubbling up to the main card's onClick handler 
    // (though in this case, both handlers do the same thing, it's good practice).
    const handleIconClick = (e) => {
        // Stop the click from going to the main card div's onClick
        e.stopPropagation(); 
        // Immediately open the modal
        handleCardClick(); 
    };


    return (
        // **********************************************
        // ADDED: 'group' class to enable group-hover logic
        // ADDED: 'transform hover:scale-[1.02] transition-transform duration-300' back for design
        // **********************************************
        <div 
            className="relative bg-black text-white p-0 overflow-hidden cursor-pointer rounded-lg shadow-xl transform hover:scale-[1.02] transition-transform duration-300 group"
            onClick={handleCardClick} // <--- Card click opens the modal
        >
            
            {/* --- Image Section --- */}
            <div className="h-48 sm:h-56 bg-gray-900 flex items-center justify-center relative">
                <img 
                    src={imageUrl} 
                    alt={title} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                />

                {/* Discount Rate Badge (Top Right) */}
                {discountRate > 0 && (
                    <span className="absolute top-2 right-2 bg-orange-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg z-10">
                        -{discountRate}% OFF
                    </span>
                )}

                {/* Add to Cart Button (This is the + icon) */}
                <button 
                    // This uses the 'group-hover' class from the parent div to become visible
                    className="absolute bottom-2 right-2 p-2 text-orange-600 bg-white/90 rounded-full shadow-xl hover:bg-white transition duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 z-10"
                    onClick={handleIconClick} // <-- Icon click handler
                    aria-label={`View ${title} details`}
                >
                    <PlusCircleIcon className="h-7 w-7" />
                </button>
            </div>

            {/* --- Details Section --- */}
            <div className="p-4 pt-3 text-center">
                <p className="text-lg font-semibold truncate" title={title}>
                    {title}
                </p>
                <div className="mt-1 flex justify-center items-end space-x-2">
                    {/* Offer Price (orange/Magenta) */}
                    <p className="text-2xl font-bold text-orange-600">
                        ${offerPrice.toFixed(2)}
                    </p>
                    {/* Original Price (Strikethrough) */}
                    <p className="text-sm line-through text-gray-600">
                        ${originalPrice.toFixed(2)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;