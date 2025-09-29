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
    },
    {
        id: 'k02',
        name: 'Bibimbap',
        description: 'A vibrant bowl of warm white rice topped with seasoned vegetables (namul), beef, a fried egg, and gochujang (chili pepper paste).',
        price: '380',
        imageUrl: 'https://images.unsplash.com/photo-1627916670860-23b0a2c0f5f7?q=80&w=870',
    },
    {
        id: 'k03',
        name: 'Korean BBQ (Bulgogi)',
        description: 'Thinly sliced, marinated beef (Bulgogi) grilled over an open flame, served with lettuce wraps and side dishes (banchan).',
        price: '650',
        imageUrl: 'https://images.unsplash.com/photo-1544976451-2483504859a1?q=80&w=870',
    },
    {
        id: 'k04',
        name: 'Tteokbokki',
        description: 'Chewy rice cakes (tteok) stir-fried in a thick, spicy, and sweet gochujang-based sauce, often with fish cakes and boiled eggs.',
        price: '250',
        imageUrl: 'https://images.unsplash.com/photo-1627916327339-b9d9c22e49c1?q=80&w=870', // Placeholder
    },
    {
        id: 'k05',
        name: 'Japchae',
        description: 'A popular side dish of stir-fried glass noodles (made from sweet potato starch) and vegetables, seasoned with soy sauce and sesame oil.',
        price: '290',
        imageUrl: 'https://images.unsplash.com/photo-1596701083435-0e1d5d22f033?q=80&w=870', // Placeholder
    },
    {
        id: 'k06',
        name: 'Haemul Pajeon',
        description: 'A savory Korean pancake made with green onions (pa) and various seafood (haemul), crispy on the edges and soft inside.',
        price: '350',
        imageUrl: 'https://images.unsplash.com/photo-1628172900720-3b1a238b1f50?q=80&w=870', // Placeholder
    }
];

const KoreanFood = () => {
    return (
        <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Spice Up Your Day with Korea 🇰🇷
            </h2>

            {/* Horizontally Scrollable Container */}
            <div className="flex w-full space-x-6 overflow-x-auto pb-4">
                {koreanDishes.map((dish) => (
                    // Individual Food Card
                    <div
                        key={dish.id}
                        className="flex-shrink-0 w-72 transform overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                    >
                        <div className="relative h-40 w-full">
                            <Image
                                src={dish.imageUrl}
                                alt={dish.name}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-xl"
                            />
                        </div>
                        <div className="p-4">
                            <h3 className="text-xl font-semibold text-gray-800">{dish.name}</h3>
                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{dish.description}</p>
                            <div className="mt-4 flex items-center justify-between">
                                <span className="text-lg font-bold text-gray-900">৳{dish.price}</span>
                                <button className="rounded-full bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-pink-700">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default KoreanFood;