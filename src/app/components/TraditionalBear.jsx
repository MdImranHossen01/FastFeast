"use client";

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Array of beer data
const beers = [
  { name: 'Taste of Thailand', id: 'thaifood' },
  { name: 'Savor the Flavors of China', id: 'chinesefood' },
  { name: 'Experience the Tastes of India ', id: 'indianfood' },
  { name: 'Taste the Tradition of Italy', id: 'italianfood' },
  { name: "Discover the Art of Japan", id: 'japanesefood' },
  { name: 'Spice Up Your Day with Korea', id: 'koreanfood' },
  
];

// Array of random image URLs
const images = [
  'https://i.ibb.co.com/dwsf56Wd/Chicken-Drums.jpg',
  'https://i.ibb.co.com/jZBvwWF7/Crispy-Chicken-Sandwich.jpg',
  'https://i.ibb.co.com/hRPM5mts/Korean-Fried-Chicken-1.jpg',
  'https://i.ibb.co.com/5gW2CT6C/Honey-Garlic-Chicken.jpg',
  'https://i.ibb.co.com/qYj6sWzL/Chicken-Nuggets.jpg',
  'https://i.ibb.co.com/yFh1d3Ss/Popcorn-Chicken.jpg',
];

const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

const TraditionalBear = () => {
  const [currentImage, setCurrentImage] = useState(getRandomImage());

  const handleMouseEnter = (index) => {
    setCurrentImage(images[index % images.length]);
  };

  const handleMouseLeave = () => {
    setCurrentImage(getRandomImage());
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

          {/* Beer List - Compact spacing */}
          <div className="mt-4 md:mt-6 divide-y divide-gray-300 flex-grow">
            {beers.map((beer, index) => (
              <Link
                key={beer.id}
                href={`${beer.id}`}
                className="group flex items-center justify-between py-2 md:py-3 cursor-pointer transition-all duration-300 ease-in-out"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                {/* Beer Name - Responsive text size */}
                <span className="text-base md:text-lg font-semibold text-gray-800 transition-all duration-300 ease-in-out transform hover:text-orange-600 group-hover:scale-[1.02] group-hover:translate-x-1">
                  {beer.name}
                </span>

                {/* Arrow Icon */}
                <ArrowRight
                  size={16}
                  className="text-gray-500 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-amber-700"
                />
              </Link>
            ))}
          </div>

          {/* All Our Beers Button - Fixed at bottom */}
         <Link href={"/menu"}>
          <button className="mt-4 md:mt-6 px-4 w-full py-2 md:px-5 md:py-2.5 border border-gray-800 text-gray-800 font-medium uppercase text-xs md:text-sm hover:bg-orange-600 hover:text-white transition-colors duration-300">
            See All
          </button>
         </Link>
        </div>

        {/* Right Side: Image - Fills remaining space */}
        <div className="hidden mx-20 lg:flex relative overflow-hidden rounded-lg shadow-xl">
          {/* Image - Full bleed, transition, and zoom on hover effect */}
          <img
            src={currentImage}
            alt="Traditional beer or food pairing"
            className="w-full h-full items-center justify-center object-cover transition-transform duration-500 ease-in-out hover:scale-[1.05]"
          />
        </div>
      </div>
    </section>
  );
};

export default TraditionalBear;