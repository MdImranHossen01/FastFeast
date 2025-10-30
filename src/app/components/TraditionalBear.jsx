"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Array of dish data
const dishes = [
  {
    name: "Taste of Thailand",
    id: "thaifood",
    imageUrl: "/Taste-of-Thailand .jpg",
  },
  {
    name: "Savor the Flavors of China",
    id: "chinesefood",
    imageUrl: "/Savor-the-Flavors-of-China__.jpg",
  },
  {
    name: "Experience the Tastes of India",
    id: "indianfood",
    imageUrl: "/Experience-the-Tastes-of-India__.jpg",
  },
  {
    name: "Taste the Tradition of Italy",
    id: "italianfood",
    imageUrl: "/Taste-the-Tradition-of-Italy__.jpg",
  },
  {
    name: "Discover the Art of Japan",
    id: "japanesefood",
    imageUrl: "/Taste-the-Tradition-of-japanese food.jpg",
  },
  {
    name: "Spice Up Your Day with Korea",
    id: "koreanfood",
    imageUrl: "/Spice-Up-Your-Day-with-Korean-food.jpg",
  },
];

const TraditionalBear = () => {
  const [currentImage, setCurrentImage] = useState(dishes[0].imageUrl);
  const [animationPhase, setAnimationPhase] = useState(0);

  const handleMouseEnter = (index) => {
    setCurrentImage(dishes[index].imageUrl);
  };

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setAnimationPhase((prev) => {
        if (prev === 2) return 0; // Reset to start after completion
        return prev + 1;
      });
    }, 2500); // Change phase every 5 seconds

    return () => clearInterval(animationInterval);
  }, []);

  return (
    // Full viewport height section with no scrolling
    <section className="md:max-h-screen w-full overflow-hidden relative">
      {/* Animated SVG - Drop animation from top middle */}
      <div
        className={`absolute left-1/2 transform -translate-x-1/2 z-10 transition-all duration-500 hidden md:block ${
          animationPhase === 0
            ? "top-0 opacity-0 -translate-y-full scale-75" // Start position (top, hidden)
            : animationPhase === 1
            ? "top-1/2 -translate-y-1/2 opacity-100 scale-100" // Middle position (visible)
            : "top-full opacity-0 translate-y-0 scale-50" // End position (bottom, hidden)
        }`}
      >
        <div className="w-32 h-32 md:w-48 md:h-48 lg:w-56 lg:h-56">
          <Image
            src="/animateBriyani.svg"
            alt="Animated Biryani"
            width={224}
            height={224}
            className="w-full h-full object-contain drop-shadow-lg"
            priority
          />
        </div>
      </div>

      {/* Rest of your component remains the same */}
      <div className="container px-4 mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 h-full items-center py-8">
        {/* Left Side: Text and List - Scrollable if needed */}
        <div className="flex flex-col md:w-2/3 mx-auto h-full max-h-full overflow-y-auto">
          {/* Header text */}
          <div className="space-y-2  md:space-y-3 flex-shrink-0">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-serif text-gray-800 dark:text-white leading-tight">
              Our traditional <span className="font-bold">dishes</span>
            </h2>
            <p className="text-sm md:text-base text-gray-600 dark:text-gray-300">
              Celebrates the rich culinary heritage passed down through
              generations. Each recipe tells a story of cultural identity.
            </p>
          </div>

          {/* Dish List - Compact spacing */}
          <div className="mt-4 md:mt-6 divide-y divide-gray-300 flex-grow pr-12 overflow-y-auto">
            {dishes.map((dish, index) => (
              <div
                key={dish.id}
                className="group flex items-center justify-between py-2 md:py-3 cursor-pointer transition-all duration-300 ease-in-out"
                onMouseEnter={() => handleMouseEnter(index)}
              >
                {/* Dish Name - Responsive text size */}
                <Link
                  href={`/${dish.id}`}
                  className="text-base md:text-lg font-semibold text-gray-800 dark:text-gray-200 transition-all duration-300 ease-in-out transform hover:text-orange-600  group-hover:scale-[1.02] group-hover:translate-x-1"
                >
                  {dish.name}
                </Link>

                {/* Arrow Icon */}
                <Link href={`/${dish.id}`}>
                  <ArrowRight
                    size={16}
                    className="text-gray-500 dark:text-gray-300 transition-transform duration-300 ease-in-out group-hover:translate-x-1 group-hover:text-amber-700"
                  />
                </Link>
              </div>
            ))}
          </div>

          {/* All Our Dishes Button - Fixed at bottom */}
          <Link href={"/menu"} className="flex-shrink-0">
            <button className="mt-4 md:mt-6 px-4 w-full py-2 md:px-5 md:py-2.5 border border-gray-800 dark:border-gray-300 text-gray-800 dark:text-gray-300 font-medium uppercase text-xs md:text-sm hover:bg-orange-600 hover:text-white transition-colors duration-300">
              See All
            </button>
          </Link>
        </div>

        {/* Right Side: Image - Fills remaining space */}
        <div className="hidden h-full lg:flex relative overflow-hidden  lg:px-12">
          <div className="relative md:w-2/3 h-full mx-auto">
            <Image
              src={currentImage}
              alt="Traditional dish or food"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="items-center rounded-xl justify-center object-cover transition-all duration-500 ease-in-out hover:scale-[1.05]"
              onError={(e) => {
                e.target.style.backgroundColor = "#f3f4f6";
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TraditionalBear;
