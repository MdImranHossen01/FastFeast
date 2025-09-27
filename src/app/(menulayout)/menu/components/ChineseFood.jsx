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
    },
    {
        id: 'c02',
        name: 'Fried Rice',
        description: 'Classic wok-tossed rice with eggs, vegetables, and your choice of chicken or shrimp.',
        price: '220',
        imageUrl: 'https://images.unsplash.com/photo-1622340632298-5c4e7230113f?q=80&w=870',
    },
    {
        id: 'c03',
        name: 'Kung Pao Shrimp',
        description: 'Spicy stir-fried shrimp with peanuts, vegetables, and chili peppers.',
        price: '380',
        imageUrl: 'https://images.unsplash.com/photo-1593922659169-c04d09289299?q=80&w=870',
    },
    {
        id: 'c04',
        name: 'Dim Sum Platter',
        description: 'A selection of steamed dumplings, buns, and rolls, perfect for sharing.',
        price: '450',
        imageUrl: 'https://images.unsplash.com/photo-1588013898031-bb94b3c078b6?q=80&w=870',
    },
    {
        id: 'c05',
        name: 'Peking Duck',
        description: 'Crispy roasted duck served with thin pancakes, spring onions, cucumber, and hoisin sauce.',
        price: '800',
        imageUrl: 'https://images.unsplash.com/photo-1598514981447-798835f8d976?q=80&w=870',
    },
    {
        id: 'c06',
        name: 'Spring Rolls (Veg)',
        description: 'Crispy vegetarian spring rolls served with a sweet and tangy dipping sauce.',
        price: '150',
        imageUrl: 'https://images.unsplash.com/photo-1606708305018-97cb00f507b9?q=80&w=870',
    }
];

const ChineseFood = () => {
    return (
        <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Savor the Flavors of China 🇨🇳
            </h2>

            {/* Horizontally Scrollable Container */}
            <div className="flex w-full space-x-6 overflow-x-auto pb-4">
                {chineseDishes.map((dish) => (
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
                                <button className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-red-600">
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

export default ChineseFood;