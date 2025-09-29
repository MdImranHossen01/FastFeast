"use client";
import React from 'react';
import Image from 'next/image';

// --- DEMO DATA for Japanese Food ---
const japaneseDishes = [
    {
        id: 'j01',
        name: 'Salmon Nigiri Sushi',
        description: 'Delicate slices of raw salmon draped over hand-pressed vinegared rice. Served with wasabi and soy sauce.',
        price: '550',
        imageUrl: 'https://images.unsplash.com/photo-1579584488806-a8109d936997?q=80&w=870',
        location: 'Banani',
        restaurant: {
            name: 'Sakura',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'j02',
        name: 'Tonkotsu Ramen',
        description: 'A rich and creamy pork bone broth, thin noodles, topped with chashu pork, egg, and green onions.',
        price: '480',
        imageUrl: 'https://images.unsplash.com/photo-1596701083435-0e1d5d22f033?q=80&w=870',
        location: 'Gulshan',
        restaurant: {
            name: 'Tokyo Bowl',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'j03',
        name: 'Chicken Katsu Curry',
        description: 'Crispy panko-breaded fried chicken cutlet, served with a mild, savory Japanese curry sauce and rice.',
        price: '420',
        imageUrl: 'https://images.unsplash.com/photo-1627916327339-b9d9c22e49c1?q=80&w=870',
        location: 'Dhanmondi',
        restaurant: {
            name: 'Kyoto Kitchen',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'j04',
        name: 'Gyoza (Potstickers)',
        description: 'Pan-fried Japanese dumplings typically filled with ground pork and vegetables, served with a soy-vinegar dipping sauce.',
        price: '250',
        imageUrl: 'https://images.unsplash.com/photo-1596009383633-4f932ed4c62c?q=80&w=870',
        location: 'Uttara',
        restaurant: {
            name: 'Osaka',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'j05',
        name: 'Tempura Shrimp',
        description: 'Lightly battered and deep-fried shrimp and vegetables, known for their delicate, airy crunch.',
        price: '380',
        imageUrl: 'https://images.unsplash.com/photo-1608466657155-2c8c6a0c0e5a?q=80&w=870',
        location: 'Mirpur',
        restaurant: {
            name: 'Nikko',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'j06',
        name: 'Mochi Ice Cream',
        description: 'Sweet, glutinous rice dough wrapped around a scoop of ice cream, a delightful chilled dessert.',
        price: '150',
        imageUrl: 'https://images.unsplash.com/photo-1627931669299-a9a3f2b3b0d5?q=80&w=870',
        location: 'Banani',
        restaurant: {
            name: 'Fuji',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    }
];

const JapaneseFood = () => {
    return (
        <section className="mb-12 relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                    Discover the Art of Japan 🇯🇵
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
                {japaneseDishes.map((dish) => (
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

export default JapaneseFood;