"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Array of dish data
const dishes = [
  { name: 'Taste of Thailand', id: 'thaifood', imageUrl: '/Taste-of-Thailand .jpg' },
  { name: 'Savor the Flavors of China', id: 'chinesefood', imageUrl: '/Savor-the-Flavors-of-China__.jpg' },
  { name: 'Experience the Tastes of India', id: 'indianfood', imageUrl: '/Experience-the-Tastes-of-India__.jpg' },
  { name: 'Taste the Tradition of Italy', id: 'italianfood', imageUrl: '/Taste-the-Tradition-of-Italy__.jpg' },
  { name: "Discover the Art of Japan", id: 'japanesefood', imageUrl: '/Taste-the-Tradition-of-japanese food.jpg' },
  { name: 'Spice Up Your Day with Korea', id: 'koreanfood', imageUrl: '/Spice-Up-Your-Day-with-Korean-food.jpg' },
];

const TraditionalBear = () => {
  const [currentImage, setCurrentImage] = useState(dishes[0].imageUrl);

  const handleMouseEnter = (index) => {
    setCurrentImage(dishes[index].imageUrl);
  };


  return (
    // Full viewport height section with no scrolling
    <section className="h-screen w-full bg-[#fcf9f0] overflow-hidden">
      {/* Container that fills the entire viewport */}
      <div className="h-full w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 p-4 md:p-6">
        {/* Left Side: Text and List - Scrollable if needed */}
        <div className="flex flex-col h-full mx-20 overflow-y-auto">
          {/* Header text */}
          <div className="space-y-2 md:space-y-3">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-gray-800 leading-tight">
              Our traditional <span className="font-bold">dishes</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              Celebrates the rich culinary heritage passed down through generations. Each recipe tells a story of cultural identity.
            </p>
          </div>

          {/* Dish List - Compact spacing */}
          <div className="mt-4 md:mt-6 divide-y divide-gray-300 flex-grow">
            {dishes.map((dish, index) => (
              <div
                key={dish.id}
                className="group flex items-center justify-between py-2 md:py-3 cursor-pointer transition-all duration-300 ease-in-out"
                onMouseEnter={() => handleMouseEnter(index)}
                // onMouseLeave removed for smoother image transitions
              >
                {/* Dish Name - Responsive text size */}
                <Link
                  href={`/${dish.id}`}
                  className="text-base md:text-lg font-semibold text-gray-800 transition-all duration-300 ease-in-out transform hover:text-orange-600 group-hover:scale-[1.02] group-hover:translate-x-1"
                >
                  {dish.name}
                </Link>

                {/* Arrow Icon */}
                <Link href={`/${dish.id}`}>
                  <ArrowRight
                    size={16}
                    className="text-gray-500 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-amber-700"
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* All Our Dishes Button - Fixed at bottom */}
          <Link href={"/menu"}>
            <button className="mt-4 md:mt-6 px-4 w-full py-2 md:px-5 md:py-2.5 border border-gray-800 text-gray-800 font-medium uppercase text-xs md:text-sm hover:bg-orange-600 hover:text-white transition-colors duration-300">
              See All
            </button>
          </Link>
        </div>

        {/* Right Side: Image - Fills remaining space */}
        {/* The 'relative' class is crucial for 'fill' to work */}
        <div className="hidden mx-20 lg:flex relative overflow-hidden rounded-lg shadow-xl"> 
          {/* Image - Full bleed, transition, and zoom on hover effect */}
          <Image
            src={currentImage}
            alt="Traditional dish or food"
            fill
            priority // 👈 Added: Recommended for LCP element / above-the-fold content
            sizes="(max-width: 1024px) 100vw, 50vw" // 👈 Added: Specifies size for fill prop on large screens
            className="items-center justify-center object-cover transition-all duration-500 ease-in-out hover:scale-[1.05]" 
            onError={(e) => {
              console.log('Image failed to load:', currentImage);
              e.target.style.backgroundColor = '#f3f4f6';
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default TraditionalBear;