"use client";
import React from 'react';
import Image from 'next/image';

// --- DEMO DATA for Korean Food ---
const koreanDishes = [
    {
        id: 'k01',
        name: 'Kimchi Jjigae',
        description: 'A spicy, hearty stew made with aged kimchi, tofu, pork or tuna, and scallions, simmered in a rich broth.',
        price: '320',
        imageUrl: 'https://images.unsplash.com/photo-1596701083435-0e1d5d22f033?q=80&w=870', // Placeholder - Often similar to ramen/stew shots
        location: 'Dhanmondi',
        restaurant: {
            name: 'Seoul Kitchen',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'k02',
        name: 'Bibimbap',
        description: 'A vibrant bowl of warm white rice topped with seasoned vegetables (namul), beef, a fried egg, and gochujang (chili pepper paste).',
        price: '380',
        imageUrl: 'https://images.unsplash.com/photo-1627916670860-23b0a2c0f5f7?q=80&w=870',
        location: 'Gulshan',
        restaurant: {
            name: 'Gangnam Taste',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'k03',
        name: 'Korean BBQ (Bulgogi)',
        description: 'Thinly sliced, marinated beef (Bulgogi) grilled over an open flame, served with lettuce wraps and side dishes (banchan).',
        price: '650',
        imageUrl: 'https://images.unsplash.com/photo-1544976451-2483504859a1?q=80&w=870',
        location: 'Banani',
        restaurant: {
            name: 'Busan Grill',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'k04',
        name: 'Tteokbokki',
        description: 'Chewy rice cakes (tteok) stir-fried in a thick, spicy, and sweet gochujang-based sauce, often with fish cakes and boiled eggs.',
        price: '250',
        imageUrl: 'https://images.unsplash.com/photo-1627916327339-b9d9c22e49c1?q=80&w=870', // Placeholder
        location: 'Uttara',
        restaurant: {
            name: 'Incheon Street',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'k05',
        name: 'Japchae',
        description: 'A popular side dish of stir-fried glass noodles (made from sweet potato starch) and vegetables, seasoned with soy sauce and sesame oil.',
        price: '290',
        imageUrl: 'https://images.unsplash.com/photo-1596701083435-0e1d5d22f033?q=80&w=870', // Placeholder
        location: 'Mirpur',
        restaurant: {
            name: 'Daegu Delight',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    },
    {
        id: 'k06',
        name: 'Haemul Pajeon',
        description: 'A savory Korean pancake made with green onions (pa) and various seafood (haemul), crispy on the edges and soft inside.',
        price: '350',
        imageUrl: 'https://images.unsplash.com/photo-1628172900720-3b1a238b1f50?q=80&w=870', // Placeholder
        location: 'Gulshan',
        restaurant: {
            name: 'Jeju Island',
            logoUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=100'
        }
    }
];

const KoreanFood = () => {
    return (
        <section className="mb-12 relative">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                    Spice Up Your Day with Korea 🇰🇷
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
                {koreanDishes.map((dish) => (
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

export default KoreanFood;