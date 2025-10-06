"use client";

import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import rawProducts from "./rawProductsData";

// Utility CSS for hiding the scrollbar
const ScrollbarHideCSS = `
  /* For Chrome, Safari and Opera */
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  /* For IE and Edge */
  .scrollbar-hide {
    -ms-overflow-style: none;   /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
`;

const SpecialOffers = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  // Sticky state is not needed for this layout fix.
  // const [isSticky, setIsSticky] = useState(true);

  // Filter out products on offer
  const offerProducts = rawProducts.filter(
    (p) => p.offerPrice && p.offerPrice < p.price
  );
  const largeImageUrl =
    offerProducts.length > 0
      ? offerProducts[0].imageUrl
      : "https://placehold.co/1200x800/000/FFFFFF/png?text=Popular+Offers";

  // Function to open the modal
  const openModal = (product) => setSelectedProduct(product);

  // Function to close the modal
  const closeModal = () => setSelectedProduct(null);

  // Removing the unnecessary useEffect hook to clean up the code.

  return (
    <>
      <style>{ScrollbarHideCSS}</style>
      
      {/* FIX: Removed h-screen from the main section. Added margin bottom for spacing. */}
      <section className="text-black w-full mb-12">
        {/* FIX: Added padding top/bottom to the container */}
        <div className="container px-4 mx-auto flex flex-col py-8 lg:flex-row gap-8">
          
          {/* --- Left Section (Sticky for large screens) --- */}
          <div
            // FIX: Removed unnecessary `h-fit`. Retained responsive height classes. 
            // The `lg:h-[calc(100vh-2rem)]` makes it full height on desktop.
            className={`w-full lg:w-1/2 rounded-xl overflow-hidden min-h-[400px] lg:h-[calc(100vh-2rem)] bg-cover bg-center mb-8 lg:mb-0 relative lg:sticky lg:top-4`}
            style={{ backgroundImage: `url(${largeImageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 sm:p-10 text-white"> {/* Added text-white here */}
              <h2 className="text-3xl pb-24 sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
                SEE OUR <span className="text-orange-600">SPECIAL</span> OFFERS
              </h2>
            </div>
          </div>

          {/* --- Right Section: Product Grid (Scrollable on small devices) --- */}
          <div 
            // FIX: Added max-h-screen and overflow-y-auto for small devices.
            // On large screens, the height is allowed to auto-expand (lg:max-h-none lg:overflow-visible).
            // Used mt-8 to offset the small device view if the card is visible first.
            className="w-full lg:w-1/2 max-h-screen overflow-y-auto scrollbar-hide lg:max-h-none lg:overflow-visible right-section"
          >
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
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </>
  );
};

export default SpecialOffers;