"use client";
import React from 'react';
import Image from 'next/image';

// --- DEMO DATA for Indian Food ---
const indianDishes = [
    {
        id: 'i01',
        name: 'Butter Chicken (Murgh Makhani)',
        description: 'Tender chicken simmered in a creamy tomato and cashew nut gravy, spiced with cardamom and fenugreek.',
        price: '350',
        imageUrl: 'https://images.unsplash.com/photo-1631526487919-482f6e9b89e3?q=80&w=870',
    },
    {
        id: 'i02',
        name: 'Paneer Tikka Masala',
        description: 'Cubes of cottage cheese marinated and grilled, then tossed in a rich, spiced tomato and onion gravy.',
        price: '300',
        imageUrl: 'https://images.unsplash.com/photo-1565158156157-1950d99042b7?q=80&w=870',
    },
    {
        id: 'i03',
        name: 'Chicken Biryani',
        description: 'Fragrant basmati rice slow-cooked with spiced chicken, herbs, and saffron, served with raita.',
        price: '280',
        imageUrl: 'https://images.unsplash.com/photo-1589993352721-66795499252e?q=80&w=870',
    },
    {
        id: 'i04',
        name: 'Aloo Gobi',
        description: 'A classic vegetarian dish with potatoes (aloo) and cauliflower (gobi) sautéed with turmeric and spices.',
        price: '180',
        imageUrl: 'https://images.unsplash.com/photo-1627931669463-c73d2fa155b4?q=80&w=870',
    },
    {
        id: 'i05',
        name: 'Garlic Naan',
        description: 'Soft, leavened flatbread brushed with garlic and butter, cooked in a tandoor (clay oven).',
        price: '80',
        imageUrl: 'https://images.unsplash.com/photo-1564756578508-208ec3540c11?q=80&w=870',
    },
    {
        id: 'i06',
        name: 'Samosa (Veg)',
        description: 'Crispy fried pastry filled with spiced potatoes, peas, and onions, typically served with chutney.',
        price: '100',
        imageUrl: 'https://images.unsplash.com/photo-1631526487900-51a70085a6a2?q=80&w=870',
    }
];

const IndianFood = () => {
    return (
        <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Experience the Tastes of India 🇮🇳
            </h2>

            {/* Horizontally Scrollable Container */}
            <div className="flex w-full space-x-6 overflow-x-auto pb-4">
                {indianDishes.map((dish) => (
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

export default IndianFood;