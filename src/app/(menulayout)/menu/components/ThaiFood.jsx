"use client";
import React from 'react';
import Image from 'next/image';

// --- DEMO DATA for Thai Food ---
const thaiDishes = [
    {
        id: 't01',
        name: 'Pad Thai',
        description: 'Classic stir-fried rice noodles with shrimp, tofu, peanuts, and a tangy tamarind sauce.',
        price: '250',
        imageUrl: 'https://images.unsplash.com/photo-1563245372-f217240f075d?q=80&w=870',
        location: 'Dhanmondi',
        restaurant: {
            name: 'Bangkok Street',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 't02',
        name: 'Green Curry',
        description: 'A rich and spicy curry made with coconut milk, green chili, chicken, and Thai basil.',
        price: '320',
        imageUrl: 'https://images.unsplash.com/photo-1626202157982-b3e3434a05a8?q=80&w=870',
        location: 'Gulshan',
        restaurant: {
            name: 'Thai Orchid',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 't03',
        name: 'Tom Yum Soup',
        description: 'A hot and sour soup with fragrant spices, herbs, mushrooms, and prawns.',
        price: '280',
        imageUrl: 'https://images.unsplash.com/photo-1569718212165-714a424072f2?q=80&w=870',
        location: 'Banani',
        restaurant: {
            name: 'Siam Kitchen',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 't04',
        name: 'Mango Sticky Rice',
        description: 'A traditional dessert of sweet sticky rice with fresh mango slices and coconut cream.',
        price: '200',
        imageUrl: 'https://images.unsplash.com/photo-1553531384-411a247ccd78?q=80&w=870',
        location: 'Uttara',
        restaurant: {
            name: 'Sweet Thailand',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 't05',
        name: 'Massaman Curry',
        description: 'A mild, savory, and slightly sweet curry with beef, potatoes, and peanuts.',
        price: '350',
        imageUrl: 'https://images.unsplash.com/photo-1628437635064-508b98a124a2?q=80&w=870',
        location: 'Mirpur',
        restaurant: {
            name: 'Spice Garden',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 't06',
        name: 'Spring Rolls',
        description: 'Crispy fried rolls filled with vegetables and glass noodles, served with a sweet chili dip.',
        price: '180',
        imageUrl: 'https://images.unsplash.com/photo-1585149783109-a68731393ad3?q=80&w=870',
        location: 'Dhanmondi',
        restaurant: {
            name: 'Golden Wok',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    }
];

const ThaiFood = () => {
    return (
        <section className="mb-12 relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                    Taste of Thailand 🇹🇭
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
                {thaiDishes.map((dish) => (
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

export default ThaiFood;