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
    },
    {
        id: 't02',
        name: 'Green Curry',
        description: 'A rich and spicy curry made with coconut milk, green chili, chicken, and Thai basil.',
        price: '320',
        imageUrl: 'https://images.unsplash.com/photo-1626202157982-b3e3434a05a8?q=80&w=870',
    },
    {
        id: 't03',
        name: 'Tom Yum Soup',
        description: 'A hot and sour soup with fragrant spices, herbs, mushrooms, and prawns.',
        price: '280',
        imageUrl: 'https://images.unsplash.com/photo-1569718212165-714a424072f2?q=80&w=870',
    },
    {
        id: 't04',
        name: 'Mango Sticky Rice',
        description: 'A traditional dessert of sweet sticky rice with fresh mango slices and coconut cream.',
        price: '200',
        imageUrl: 'https://images.unsplash.com/photo-1553531384-411a247ccd78?q=80&w=870',
    },
    {
        id: 't05',
        name: 'Massaman Curry',
        description: 'A mild, savory, and slightly sweet curry with beef, potatoes, and peanuts.',
        price: '350',
        imageUrl: 'https://images.unsplash.com/photo-1628437635064-508b98a124a2?q=80&w=870',
    },
    {
        id: 't06',
        name: 'Spring Rolls',
        description: 'Crispy fried rolls filled with vegetables and glass noodles, served with a sweet chili dip.',
        price: '180',
        imageUrl: 'https://images.unsplash.com/photo-1585149783109-a68731393ad3?q=80&w=870',
    }
];

const ThaiFood = () => {
    return (
        <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Taste of Thailand 🇹🇭
            </h2>

            {/* Horizontally Scrollable Container */}
            <div className="flex w-full space-x-6 overflow-x-auto pb-4">
                {thaiDishes.map((dish) => (
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
                                <button className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-orange-600">
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

export default ThaiFood;