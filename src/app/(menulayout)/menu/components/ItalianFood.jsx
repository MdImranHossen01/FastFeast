"use client";
import React from 'react';
import Image from 'next/image';

// --- DEMO DATA for Italian Food ---
const italianDishes = [
    {
        id: 'it01',
        name: 'Margherita Pizza',
        description: 'A classic Neapolitan pizza, simple yet perfect, with San Marzano tomatoes, fresh mozzarella, basil, and olive oil.',
        price: '400',
        imageUrl: 'https://images.unsplash.com/photo-1598514830172-8d76b9e289a6?q=80&w=870',
        location: 'Gulshan',
        restaurant: {
            name: 'Roma Bella',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'it02',
        name: 'Spaghetti Carbonara',
        description: 'Traditional Roman pasta dish made with egg yolks, Pecorino cheese, guanciale (or pancetta), and black pepper.',
        price: '380',
        imageUrl: 'https://images.unsplash.com/photo-1616766442655-66795499252e?q=80&w=870',
        location: 'Banani',
        restaurant: {
            name: 'Venezia',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'it03',
        name: 'Lasagna Bolognese',
        description: 'Layers of pasta sheets, rich beef and tomato ragù, creamy béchamel sauce, and Parmesan cheese, baked to perfection.',
        price: '450',
        imageUrl: 'https://images.unsplash.com/photo-1613032569720-d309d94d509f?q=80&w=870',
        location: 'Dhanmondi',
        restaurant: {
            name: 'Milano',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'it04',
        name: 'Tiramisu',
        description: 'A popular coffee-flavored Italian dessert. Ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese.',
        price: '250',
        imageUrl: 'https://images.unsplash.com/photo-1559885820-c70e9b925b6a?q=80&w=870',
        location: 'Uttara',
        restaurant: {
            name: 'Dolce Vita',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'it05',
        name: 'Caprese Salad',
        description: 'A simple Italian salad of sliced fresh mozzarella, tomatoes, and sweet basil, seasoned with salt and olive oil.',
        price: '220',
        imageUrl: 'https://images.unsplash.com/photo-1553372995-92769623e590?q=80&w=870',
        location: 'Mirpur',
        restaurant: {
            name: 'Trattoria',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'it06',
        name: 'Minestrone Soup',
        description: 'A thick soup of Italian origin made with vegetables, pasta or rice, sometimes with the addition of beans and meat.',
        price: '180',
        imageUrl: 'https://images.unsplash.com/photo-1628172900720-3b1a238b1f50?q=80&w=870',
        location: 'Gulshan',
        restaurant: {
            name: 'Pasta Paradise',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    }
];

const ItalianFood = () => {
    return (
        <section className="mb-12 relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                    Taste the Tradition of Italy 🇮🇹
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
                {italianDishes.map((dish) => (
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

export default ItalianFood;