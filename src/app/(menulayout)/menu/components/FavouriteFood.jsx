"use client";
import React, { useRef } from 'react';
import Image from 'next/image';

// Import icons for the scroll buttons (using a common library like react-icons)
// For this example, I'll assume you have a simple icon component or use SVG path strings.
// If you use 'react-icons', you'd import: import { ChevronLeft, ChevronRight } from 'lucide-react';
const ChevronLeft = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
);
const ChevronRight = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
);

const favoriteFoodCategories = [
    {
        id: 'fav01',
        name: 'Pizza',
        imageUrl: 'https://i.ibb.co.com/zTvN3vSk/Pizza.jpg', // Pizza image
    },
    {
        id: 'fav02',
        name: 'Biryani',
        imageUrl: 'https://i.ibb.co.com/KcyNS5wF/Biryani-in-orange-background-for-round-profile-picture.jpg', // Biryani image
    },
    {
        id: 'fav03',
        name: 'Cakes',
        imageUrl: 'https://i.ibb.co.com/GQc0p6qx/Cakes.jpg1000', // Cake image
    },
    {
        id: 'fav04',
        name: 'Burgers',
        imageUrl: 'https://i.ibb.co.com/XrDjBLcW/Burgers.jpg', // Burger image
    },
    {
        id: 'fav05',
        name: 'Shawarma',
        imageUrl: 'https://i.ibb.co.com/B2R3qXw1/shawarma-in-orange-background.jpg', // Shawarma image
    },
    {
        id: 'fav06',
        name: 'Khichuri',
        imageUrl: 'https://i.ibb.co.com/kgFdYnyX/Khichuri.jpg', // Khichuri image
    },
    {
        id: 'fav07',
        name: 'Pasta',
        imageUrl: 'https://i.ibb.co.com/sxMDMFm/Pasta.jpg', // Pasta image
    },
    {
        id: 'fav08',
        name: 'Snacks',
        imageUrl: 'https://i.ibb.co.com/XkL6XQDv/Snacks.jpg', // Snacks image
    },
    // --- FIXED: The following IDs were duplicates of 'fav08' ---
    {
        id: 'fav09',
        name: 'Noodles',
        imageUrl: 'https://i.ibb.co.com/FqHZcYX1/noodles-in-orange-background-1.jpg', // Noodles image
    },
    {
        id: 'fav10',
        name: 'Fried Chicken',
        imageUrl: 'https://i.ibb.co.com/S4pQbgpq/fried-chicken-in-orange-background.jpg', // Fried Chicken image
    },
    {
        id: 'fav11',
        name: 'Sushi',
        imageUrl: 'https://i.ibb.co.com/0j2RNP8V/sushi-in-orange-background.jpg', // Sushi image
    },
    {
        id: 'fav12',
        name: 'Soups',
        imageUrl: 'https://i.ibb.co.com/YFkxHZnF/soup-in-orange-background.jpg', // Soups image
    },
    {
        id: 'fav13',
        name: 'Kebab',
        imageUrl: 'https://i.ibb.co.com/HD7LD1Jr/kebab.jpg', // Kebab image
    },
];

const FavouriteFood = () => {
    // 1. Create a ref to attach to the scrollable container
    const scrollRef = useRef(null);
    
    // 2. Define the scroll distance (e.g., scroll by 300 pixels or a percentage)
    const scrollDistance = 300; // Pixels to scroll each time

    // 3. Handlers to scroll the container
    const scrollLeft = () => {
        if (scrollRef.current) {
            // scrollRef.current.scrollLeft -= scrollRef.current.offsetWidth / 2; // Scroll half the container width
            scrollRef.current.scrollBy({
                left: -scrollDistance,
                behavior: 'smooth'
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            // scrollRef.current.scrollLeft += scrollRef.current.offsetWidth / 2; // Scroll half the container width
             scrollRef.current.scrollBy({
                left: scrollDistance,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="mb-12 px-4">
            
            {/* RELATIVE container to position the absolute scroll buttons */}
            <div className="relative">
                
                {/* Scrollable Container for Categories - Attach the ref here */}
                <div 
                    ref={scrollRef} 
                    className="flex w-full space-x-4 overflow-x-auto py-4 px-2 scrollbar-hide scroll-smooth" // Added scroll-smooth for Tailwind animation
                >
                    {favoriteFoodCategories.map((category) => (
                        // OPTIONAL IMPROVEMENT: Wrap in an anchor tag <a> if they are clickable links
                        <div key={category.id} className="flex-shrink-0 text-center group"> 
                            <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                                <Image
                                    src={category.imageUrl}
                                    alt={category.name}
                                    fill
                                    className="object-cover rounded-full opacity-90 group-hover:opacity-100"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            </div>
                            <p className="mt-2 text-sm sm:text-base font-semibold text-red-600 transition-colors duration-300 group-hover:text-red-700">
                                {category.name}
                            </p>
                        </div>
                    ))}
                </div>

                {/* --- Scroll Buttons --- */}
                
                {/* Left Scroll Button */}
                <button
                    onClick={scrollLeft}
                    aria-label="Scroll categories left"
                    className="absolute left-0 top-1/2 -translate-y-1/2 transform p-2 rounded-full bg-white shadow-lg border border-gray-200 z-10 hover:bg-gray-100 transition-colors hidden md:block" // Hidden on small screens (touch scrolling is better)
                >
                    <ChevronLeft />
                </button>

                {/* Right Scroll Button */}
                <button
                    onClick={scrollRight}
                    aria-label="Scroll categories right"
                    className="absolute right-0 top-1/2 -translate-y-1/2 transform p-2 rounded-full bg-white shadow-lg border border-gray-200 z-10 hover:bg-gray-100 transition-colors hidden md:block" // Hidden on small screens
                >
                    <ChevronRight />
                </button>
            </div>
        </section>
    );
};

export default FavouriteFood;