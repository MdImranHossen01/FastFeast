"use client";
import React from 'react';
import Image from 'next/image';

// --- DEMO DATA for Turkish Food ---
const turkishDishes = [
    {
        id: 't01',
        name: 'Adana Kebab',
        description: 'Hand-minced meat kebab mounted on a wide iron skewer, grilled over charcoal, known for its spicy heat and tender texture.',
        price: '450',
        imageUrl: 'https://images.unsplash.com/photo-1577742183570-8e1d713c8f8b?q=80&w=870',
        location: 'Gulshan',
        restaurant: {
            name: 'Istanbul Grill',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 't02',
        name: 'Lahmacun',
        description: 'A thin, round piece of dough topped with minced meat (usually beef or lamb), vegetables, and herbs. Often called "Turkish Pizza".',
        price: '200',
        imageUrl: 'https://images.unsplash.com/photo-1627916670860-23b0a2c0f5f7?q=80&w=870', // Placeholder
        location: 'Banani',
        restaurant: {
            name: 'Anatolia',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 't03',
        name: 'Manti (Turkish Dumplings)',
        description: 'Tiny beef or lamb-filled dumplings boiled or steamed, typically served with a yogurt and garlic sauce, topped with melted butter and paprika.',
        price: '350',
        imageUrl: 'https://images.unsplash.com/photo-1627916327339-b9d9c22e49c1?q=80&w=870', // Placeholder
        location: 'Dhanmondi',
        restaurant: {
            name: 'Bosphorus',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 't04',
        name: 'Pide (Boat-Shaped Bread)',
        description: 'Traditional Turkish flatbread, baked with toppings like cheese, sucuk (spicy sausage), or minced meat, shaped like a boat.',
        price: '300',
        imageUrl: 'https://images.unsplash.com/photo-1606708305018-97cb00f507b9?q=80&w=870', // Placeholder
        location: 'Uttara',
        restaurant: {
            name: 'Cappadocia',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 't05',
        name: 'Iskender Kebab',
        description: 'Thin slices of döner kebab meat served over pieces of pita bread, topped with tomato sauce, and hot melted butter and yogurt.',
        price: '500',
        imageUrl: 'https://images.unsplash.com/photo-1544976451-2483504859a1?q=80&w=870', // Placeholder
        location: 'Mirpur',
        restaurant: {
            name: 'Ephesus',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 't06',
        name: 'Baklava',
        description: 'A rich, sweet dessert pastry made of layers of filo pastry, filled with chopped nuts, and sweetened with syrup or honey.',
        price: '220',
        imageUrl: 'https://images.unsplash.com/photo-1559885820-c70e9b925b6a?q=80&w=870', // Placeholder
        location: 'Gulshan',
        restaurant: {
            name: 'Pamukkale',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    }
];

const TurkishFood = () => {
    return (
        <section className="mb-12 relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                    A Journey Through Turkey's Kitchen 🇹🇷
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
                {turkishDishes.map((dish) => (
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

export default TurkishFood;