"use client";
import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link"; 

// --- Icon Components ---
const ChevronLeft = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.75 19.5L8.25 12l7.5-7.5"
    />
  </svg>
);
const ChevronRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={3}
    stroke="currentColor"
    className="w-5 h-5"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 4.5l7.5 7.5-7.5 7.5"
    />
  </svg>
);

// --- Data ---
const favoriteFoodCategories = [
  {
    id: "fav07",
    name: "Pasta",
    imageUrl: "https://i.ibb.co.com/sxMDMFm/Pasta.jpg", 
  },
  {
    id: "fav08",
    name: "Snacks",
    imageUrl: "https://i.ibb.co.com/XkL6XQDv/Snacks.jpg", 
  },
  {
    id: "fav09",
    name: "Noodles",
    imageUrl:
      "https://i.ibb.co.com/FqHZcYX1/noodles-in-orange-background-1.jpg", 
  },
  {
    id: "fav10",
    name: "Fried Chicken",
    imageUrl:
      "https://i.ibb.co.com/S4pQbgpq/fried-chicken-in-orange-background.jpg", 
  },
  {
    id: "fav11",
    name: "Sushi",
    imageUrl: "https://i.ibb.co.com/0j2RNP8V/sushi-in-orange-background.jpg", 
  },
  {
    id: "fav12",
    name: "Soups",
    imageUrl: "https://i.ibb.co.com/YFkxHZnF/soup-in-orange-background.jpg", 
  },
  {
    id: "fav01",
    name: "Pizza",
    imageUrl: "https://i.ibb.co.com/zTvN3vSk/Pizza.jpg", 
  },
  {
    id: "fav02",
    name: "Biryani",
    imageUrl:
      "https://i.ibb.co.com/KcyNS5wF/Biryani-in-orange-background-for-round-profile-picture.jpg", 
  },
  {
    id: "fav03",
    name: "Cakes",
    imageUrl: "https://i.ibb.co.com/GQc0p6qx/Cakes.jpg",
  },
  {
    id: "fav04",
    name: "Burgers",
    imageUrl: "https://i.ibb.co.com/XrDjBLcW/Burgers.jpg", 
  },
  {
    id: "fav05",
    name: "Shawarma",
    imageUrl: "https://i.ibb.co.com/B2R3qXw1/shawarma-in-orange-background.jpg", 
  },
  {
    id: "fav06",
    name: "Khichuri",
    imageUrl: "https://i.ibb.co.com/kgFdYnyX/Khichuri.jpg", 
  },
  {
    id: "fav13",
    name: "Kebab",
    imageUrl: "https://i.ibb.co.com/HD7LD1Jr/kebab.jpg", 
  },
];

// --- Component ---
const FavouriteFood = () => {
  // 1. Create a ref to attach to the scrollable container
  const scrollRef = useRef(null); 
  const scrollDistance = 300; 

  // 3. Handlers to scroll the container
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollDistance,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollDistance,
        behavior: "smooth",
      });
    }
  }; 
  
  // Helper function to create a clean, lowercase URL path
  const createPath = (name) => `/${name.toLowerCase().replace(/\s/g, "")}`;

  return (
    <section className="px-4">
      {/* RELATIVE container to position the absolute scroll buttons */}      
      <div className="relative">
        
        {/* Scrollable Container for Categories */}
        <div
          ref={scrollRef}
          className="flex w-full gap-x-4 overflow-x-auto py-4 px-2 scrollbar-hide scroll-smooth"
        >
          {favoriteFoodCategories.map((category) => (
            <Link
              key={category.id}
              href={createPath(category.name)} 
              className="flex-shrink-0 text-center group cursor-pointer w-24 sm:w-28"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105 mx-auto">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
                  fill
                  className="object-cover rounded-full opacity-90 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <p className="mt-2 text-sm sm:text-base font-semibold text-orange-500 transition-colors duration-300 group-hover:text-orange-700">
                {category.name}
              </p>
            </Link>
          ))}
        </div>

        {/* --- Scroll Buttons --- */}
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll categories left"
          className="absolute left-0 top-1/2 -translate-y-1/2 transform p-2 rounded-full bg-white shadow-lg border border-gray-200 z-10 hover:bg-gray-100 transition-colors hidden md:block"
        >
          <ChevronLeft />
        </button>
        
        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          aria-label="Scroll categories right"
          className="absolute right-0 top-1/2 -translate-y-1/2 transform p-2 rounded-full bg-white shadow-lg border border-gray-200 z-10 hover:bg-gray-100 transition-colors hidden md:block"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  );
};

export default FavouriteFood;