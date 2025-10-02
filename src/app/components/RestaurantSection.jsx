"use client";

import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const RestaurantSection = () => {
  // Image URLs for the slider
  const imageUrls = [
    "https://i.ibb.co.com/C5zrpF2T/1.png",
    "https://i.ibb.co.com/5xFXDwxQ/2.png",
    "https://i.ibb.co.com/N2rR1sJ9/3.png",
    "https://i.ibb.co.com/wh4942Td/4.png",
    "https://i.ibb.co.com/WWyddxWk/5.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full h-screen bg-orange-600">
      <div className="grid grid-cols-1 md:grid-cols-2 text-white overflow-hidden">

        {/* Left Column: Image Slider */}
        <div className="relative h-full w-full flex items-center justify-center">
          <Image
            src={imageUrls[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Column: Content Area */}
        <div className="flex flex-col justify-center p-8 lg:p-20 text-left">
          <p className="text-sm uppercase tracking-widest font-medium opacity-80 mb-1">
            OUR COMMITMENT TO QUALITY
          </p>

          <h2 className="text-4xl lg:text-5xl font-extrabold leading-tight mb-6">
            Building Stronger <br className="hidden lg:inline" />
            Community Partnerships
          </h2>

          <p className="text-lg leading-relaxed max-w-xl mb-10">
            Our success is built on collaboration. By partnering with local restaurants,
            ethical suppliers, and leading food nutritionists, we ensure every dishes
            meets the highest standards of safety, quality, taste and nutritions. We believe in transparent sourcing
            and supporting the communities that help bring the best food to you.
          </p>

          <Link href={"/restaurants"}>
          <button 
            className="bg-white text-orange-600 font-bold uppercase py-4 px-10 text-base rounded-md tracking-wider transition duration-300 hover:bg-gray-100 w-fit"
          >
            BROWSE RESTAURANTS
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection;
