"use client"; 

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard'; 
import ProductModal from './ProductModal'; 
import rawProducts from "./rawProductsData"

// Utility CSS for hiding the scrollbar
const ScrollbarHideCSS = `
  /* For Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  /* For IE and Edge */
  .scrollbar-hide {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

const SpecialOffers = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isSticky, setIsSticky] = useState(true);

  // Filter out products on offer
  const offerProducts = rawProducts.filter(p => p.offerPrice && p.offerPrice < p.price);
  const largeImageUrl = offerProducts.length > 0 ? offerProducts[0].imageUrl : 'https://placehold.co/1200x800/000/FFFFFF/png?text=Popular+Offers';

  // Function to open the modal
  const openModal = (product) => setSelectedProduct(product);

  // Function to close the modal
  const closeModal = () => setSelectedProduct(null);

  // Hook to handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      const rightSection = document.querySelector('.right-section');
      if (!rightSection) return;
      
      const rightSectionBottom = rightSection.getBoundingClientRect().bottom;
      const windowHeight = window.innerHeight;
      
      // Sticky when the bottom of the right section is still within the viewport
      if (rightSectionBottom > windowHeight) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <style>{ScrollbarHideCSS}</style>
      <section className="bg-white text-white mx-auto px-4 py-8 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:min-h-screen">
          {/* --- Left Section (Sticky) --- */}
          <div
            className={`lg:sticky lg:top-4 w-full lg:w-1/2 rounded-xl overflow-hidden min-h-[400px] sm:min-h-[500px] lg:h-[calc(100vh-2rem)] bg-cover bg-center mb-8 lg:mb-0 relative ${isSticky ? 'z-10' : ''}`}
            style={{ backgroundImage: `url(${largeImageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 sm:p-10">
              <h2 className="text-3xl pb-24 sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                SEE OUR <span className='text-orange-600'>SPECIAL</span> OFFERS
              </h2>
             
            </div>
          </div>

          {/* --- Right Section: Product Grid (Scrollable) --- */}
          <div className="w-full lg:w-1/2 lg:max-h-screen lg:overflow-y-scroll scrollbar-hide right-section">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-4">
              {offerProducts.map((product) => (
                <ProductCard 
                  key={product._id}
                  product={product} 
                  onOpenModal={openModal} 
                  originalPrice={product.price}
                  offerPrice={product.offerPrice}
                  imageUrl={product.imageUrl}
                  discountRate={product.discountRate}
                  title={product.title}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- Product Modal Render --- */}
      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={closeModal} 
        />
      )}
    </>
  );
};

export default SpecialOffers;
