"use client";
import React from 'react';
import Image from 'next/image';

// --- DEMO DATA for Chinese Food ---
const chineseDishes = [
    {
        id: 'c01',
        name: 'Sweet & Sour Chicken',
        description: 'Crispy chicken pieces tossed in a vibrant sweet and sour sauce with bell peppers and pineapple.',
        price: '300',
        imageUrl: 'https://images.unsplash.com/photo-1625937172314-e3c32e519273?q=80&w=870',
        location: 'Gulshan',
        restaurant: {
            name: 'Dragon Palace',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'c02',
        name: 'Fried Rice',
        description: 'Classic wok-tossed rice with eggs, vegetables, and your choice of chicken or shrimp.',
        price: '220',
        imageUrl: 'https://images.unsplash.com/photo-1622340632298-5c4e7230113f?q=80&w=870',
        location: 'Banani',
        restaurant: {
            name: 'Golden Dragon',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'c03',
        name: 'Kung Pao Shrimp',
        description: 'Spicy stir-fried shrimp with peanuts, vegetables, and chili peppers.',
        price: '380',
        imageUrl: 'https://images.unsplash.com/photo-1593922659169-c04d09289299?q=80&w=870',
        location: 'Dhanmondi',
        restaurant: {
            name: 'Jade Garden',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'c04',
        name: 'Dim Sum Platter',
        description: 'A selection of steamed dumplings, buns, and rolls, perfect for sharing.',
        price: '450',
        imageUrl: 'https://images.unsplash.com/photo-1588013898031-bb94b3c078b6?q=80&w=870',
        location: 'Uttara',
        restaurant: {
            name: 'Red Lantern',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'c05',
        name: 'Peking Duck',
        description: 'Crispy roasted duck served with thin pancakes, spring onions, cucumber, and hoisin sauce.',
        price: '800',
        imageUrl: 'https://images.unsplash.com/photo-1598514981447-798835f8d976?q=80&w=870',
        location: 'Mirpur',
        restaurant: {
            name: 'Imperial Court',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'c06',
        name: 'Spring Rolls (Veg)',
        description: 'Crispy vegetarian spring rolls served with a sweet and tangy dipping sauce.',
        price: '150',
        imageUrl: 'https://images.unsplash.com/photo-1606708305018-97cb00f507b9?q=80&w=870',
        location: 'Gulshan',
        restaurant: {
            name: 'Wok & Roll',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    }
];

const ChineseFood = () => {
    return (
        <section className="mb-12 relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                    Savor the Flavors of China 🇨🇳
                </h2>
                <button className="text-orange-500 font-medium text-sm flex items-center hover:text-orange-600 transition-colors">
                    See More
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Horizontally Scrollable Container - No scrollbar */}
            <div className="flex w-full space-x-4 overflow-x-auto scrollbar-hide pb-4">
                {chineseDishes.map((dish) => (
                    // Individual Food Card
                    <div
                        key={dish.id}
                        className="flex-shrink-0 w-72 transform overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="relative h-40 w-full">
                            <Image
                                src={dish.imageUrl}
                                alt={dish.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-xl"
                            />
                            {/* Location Badge - Left Side */}
                            <div className="absolute top-2 left-2 bg-orange-500 rounded-full px-2 py-1 text-xs font-bold text-white flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {dish.location}
                            </div>
                            {/* Price Badge - Right Side */}
                            <div className="absolute top-2 right-2 bg-orange-500 rounded-full px-2 py-1 text-xs font-bold text-white">
                                ৳{dish.price}
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="text-lg font-semibold text-orange-500">{dish.name}</h3>
                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{dish.description}</p>
                            
                            {/* Restaurant Info with Add to Cart Button */}
                            <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                                        <Image
                                            src={dish.restaurant.logoUrl}
                                            alt={dish.restaurant.name}
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <span className="ml-2 text-sm text-gray-700 font-medium">{dish.restaurant.name}</span>
                                </div>
                                
                                {/* Large Circular Add to Cart Button */}
                                <button className="flex items-center justify-center w-10 h-10 rounded-full bg-orange-500 text-white transition-all duration-300 hover:bg-orange-600 hover:scale-110 shadow-md">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Custom scrollbar styles */}
            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default ChineseFood;