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
    },
    {
        id: 'j02',
        name: 'Tonkotsu Ramen',
        description: 'A rich and creamy pork bone broth, thin noodles, topped with chashu pork, egg, and green onions.',
        price: '480',
        imageUrl: 'https://images.unsplash.com/photo-1596701083435-0e1d5d22f033?q=80&w=870',
    },
    {
        id: 'j03',
        name: 'Chicken Katsu Curry',
        description: 'Crispy panko-breaded fried chicken cutlet, served with a mild, savory Japanese curry sauce and rice.',
        price: '420',
        imageUrl: 'https://images.unsplash.com/photo-1627916327339-b9d9c22e49c1?q=80&w=870',
    },
    {
        id: 'j04',
        name: 'Gyoza (Potstickers)',
        description: 'Pan-fried Japanese dumplings typically filled with ground pork and vegetables, served with a soy-vinegar dipping sauce.',
        price: '250',
        imageUrl: 'https://images.unsplash.com/photo-1596009383633-4f932ed4c62c?q=80&w=870',
    },
    {
        id: 'j05',
        name: 'Tempura Shrimp',
        description: 'Lightly battered and deep-fried shrimp and vegetables, known for their delicate, airy crunch.',
        price: '380',
        imageUrl: 'https://images.unsplash.com/photo-1608466657155-2c8c6a0c0e5a?q=80&w=870',
    },
    {
        id: 'j06',
        name: 'Mochi Ice Cream',
        description: 'Sweet, glutinous rice dough wrapped around a scoop of ice cream, a delightful chilled dessert.',
        price: '150',
        imageUrl: 'https://images.unsplash.com/photo-1627931669299-a9a3f2b3b0d5?q=80&w=870',
    }
];

const JapaneseFood = () => {
    return (
        <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Discover the Art of Japan 🇯🇵
            </h2>

            {/* Horizontally Scrollable Container */}
            <div className="flex w-full space-x-6 overflow-x-auto pb-4">
                {japaneseDishes.map((dish) => (
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
                                <button className="rounded-full bg-blue-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-600">
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

export default JapaneseFood;