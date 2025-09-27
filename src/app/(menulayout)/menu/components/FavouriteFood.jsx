"use client";
import React from 'react';
import Image from 'next/image';

const favoriteFoodCategories = [
    {
        id: 'fav01',
        name: 'Pizza',
        imageUrl: 'https://images.unsplash.com/photo-1598514830172-8d76b9e289a6?q=80&w=870', // Example URL
    },
    {
        id: 'fav02',
        name: 'Biryani',
        imageUrl: 'https://images.unsplash.com/photo-1589993352721-66795499252e?q=80&w=870', // Example URL
    },
    {
        id: 'fav03',
        name: 'Cakes',
        imageUrl: 'https://images.unsplash.com/photo-1561668033-dad9a785317e?q=80&w=870', // Example URL
    },
    {
        id: 'fav04',
        name: 'Burgers',
        imageUrl: 'https://images.unsplash.com/photo-1568901346379-8d7d8e8b0b8c?q=80&w=870', // Example URL
    },
    {
        id: 'fav05',
        name: 'Cafe',
        imageUrl: 'https://images.unsplash.com/photo-1517220267232-a50e93297a7a?q=80&w=870', // Example URL (coffee)
    },
    {
        id: 'fav06',
        name: 'Tehari', // Assuming Tehari is a type of rice dish
        imageUrl: 'https://images.unsplash.com/photo-1627916670860-23b0a2c0f5f7?q=80&w=870', // Example URL (similar to biryani)
    },
    {
        id: 'fav07',
        name: 'Pasta',
        imageUrl: 'https://images.unsplash.com/photo-1596701083435-0e1d5d22f033?q=80&w=870', // Example URL
    },
    {
        id: 'fav08',
        name: 'Snacks', // Added a general 'Snacks' category
        imageUrl: 'https://images.unsplash.com/photo-1606708305018-97cb00f507b9?q=80&w=870', // Example URL (spring rolls/snacks)
    },
    // Add more categories as needed
];

const FavouriteFood = () => {
    return (
        <section className="mb-12">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 text-center">
                Your Favorite Food Choices
            </h2>

            {/* Scrollable Container for Categories */}
            <div className="flex w-full space-x-6 overflow-x-auto justify-center md:justify-start py-4 px-2">
                {favoriteFoodCategories.map((category) => (
                    <div key={category.id} className="flex-shrink-0 text-center">
                        <div className="relative w-24 h-24 rounded-full bg-orange-500 flex items-center justify-center overflow-hidden shadow-md">
                            <Image
                                src={category.imageUrl}
                                alt={category.name}
                                layout="fill" // This makes the image fill the parent div
                                objectFit="cover" // This ensures the image covers the area without distorting
                                className="rounded-full opacity-80" // Make image slightly transparent to show background color
                            />
                            {/* Optional: Add an overlay or text if the image is too dominant */}
                            {/* <div className="absolute inset-0 bg-black bg-opacity-10 rounded-full"></div> */}
                        </div>
                        <p className="mt-2 text-md font-semibold text-gray-800" style={{ color: '#E53E3E' }}>
                             {category.name}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FavouriteFood;