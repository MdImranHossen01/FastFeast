"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const RestaurantSection = () => {
  // Image URLs for the slider
  const imageUrls = [
    "https://i.ibb.co.com/mV0WTNw8/1.png",
    "https://i.ibb.co.com/KjLd2tgg/2.png",
    "https://i.ibb.co.com/xS38vtXR/3.png",
    "https://i.ibb.co.com/bMVGczn9/4.png",
    "https://i.ibb.co.com/VYgTdVCq/5.png",
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
    <section className="w-full min-h-screen bg-gradient-to-r from-orange-200 via-orange-100 to-white md:h-screen">
      <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-2 text-gray-800 min-h-screen md:h-full items-center">
        {/* Left Column: Image Slider */}
        <div className="relative w-full h-[300px] md:h-full">
          {/* FIX: Use object-contain on large screens to avoid cutting off the image */}
          <Image
            src={imageUrls[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            fill
            className="object-cover md:object-contain z-0"
            priority
          />
        </div>

        {/* Right Column: Content Area */}
        <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-20 text-left min-h-[50vh] md:min-h-0">
          <p className="text-sm uppercase tracking-widest font-medium opacity-80 mb-1">
            OUR COMMITMENT TO QUALITY
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 sm:mb-6">
            Building Stronger <br className="hidden lg:inline" />
            <span className="text-orange-600">Community</span> Partnerships
          </h2>

          <p className="text-base sm:text-lg leading-relaxed max-w-xl mb-6 sm:mb-10">
            Our success is built on collaboration. By partnering with local
            restaurants, ethical suppliers, and leading food nutritionists, we
            ensure every dish meets the highest standards of safety, quality,
            taste, and nutrition. We believe in transparent sourcing and
            supporting the communities that help bring the best food to you.
          </p>

          <Link href={"/restaurants"}>
            <button className="relative py-3 sm:py-4 px-8 sm:px-10 overflow-hidden cursor-pointer font-bold text-orange-600 bg-gray-100 border border-orange-600 rounded-lg shadow-inner group">
              <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-orange-600 group-hover:w-full ease"></span>
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-orange-600 group-hover:w-full ease"></span>
              <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-orange-600 group-hover:h-full ease"></span>
              <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-orange-600 group-hover:h-full ease"></span>
              <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-orange-600 opacity-0 group-hover:opacity-100"></span>
              <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                BROWSE RESTAURANTS
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection;
