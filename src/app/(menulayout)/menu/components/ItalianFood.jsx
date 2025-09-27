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
    },
    {
        id: 'it02',
        name: 'Spaghetti Carbonara',
        description: 'Traditional Roman pasta dish made with egg yolks, Pecorino cheese, guanciale (or pancetta), and black pepper.',
        price: '380',
        imageUrl: 'https://images.unsplash.com/photo-1616766442655-66795499252e?q=80&w=870',
    },
    {
        id: 'it03',
        name: 'Lasagna Bolognese',
        description: 'Layers of pasta sheets, rich beef and tomato ragù, creamy béchamel sauce, and Parmesan cheese, baked to perfection.',
        price: '450',
        imageUrl: 'https://images.unsplash.com/photo-1613032569720-d309d94d509f?q=80&w=870',
    },
    {
        id: 'it04',
        name: 'Tiramisu',
        description: 'A popular coffee-flavored Italian dessert. Ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese.',
        price: '250',
        imageUrl: 'https://images.unsplash.com/photo-1559885820-c70e9b925b6a?q=80&w=870',
    },
    {
        id: 'it05',
        name: 'Caprese Salad',
        description: 'A simple Italian salad of sliced fresh mozzarella, tomatoes, and sweet basil, seasoned with salt and olive oil.',
        price: '220',
        imageUrl: 'https://images.unsplash.com/photo-1553372995-92769623e590?q=80&w=870',
    },
    {
        id: 'it06',
        name: 'Minestrone Soup',
        description: 'A thick soup of Italian origin made with vegetables, pasta or rice, sometimes with the addition of beans and meat.',
        price: '180',
        imageUrl: 'https://images.unsplash.com/photo-1628172900720-3b1a238b1f50?q=80&w=870',
    }
];

const ItalianFood = () => {
    return (
        <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
                Taste the Tradition of Italy 🇮🇹
            </h2>

            {/* Horizontally Scrollable Container */}
            <div className="flex w-full space-x-6 overflow-x-auto pb-4">
                {italianDishes.map((dish) => (
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
                                <button className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700">
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

export default ItalianFood;