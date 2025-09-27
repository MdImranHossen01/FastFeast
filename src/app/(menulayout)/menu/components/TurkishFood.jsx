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
    },
    {
        id: 't02',
        name: 'Lahmacun',
        description: 'A thin, round piece of dough topped with minced meat (usually beef or lamb), vegetables, and herbs. Often called "Turkish Pizza".',
        price: '200',
        imageUrl: 'https://images.unsplash.com/photo-1627916670860-23b0a2c0f5f7?q=80&w=870', // Placeholder
    },
    {
        id: 't03',
        name: 'Manti (Turkish Dumplings)',
        description: 'Tiny beef or lamb-filled dumplings boiled or steamed, typically served with a yogurt and garlic sauce, topped with melted butter and paprika.',
        price: '350',
        imageUrl: 'https://images.unsplash.com/photo-1627916327339-b9d9c22e49c1?q=80&w=870', // Placeholder
    },
    {
        id: 't04',
        name: 'Pide (Boat-Shaped Bread)',
        description: 'Traditional Turkish flatbread, baked with toppings like cheese, sucuk (spicy sausage), or minced meat, shaped like a boat.',
        price: '300',
        imageUrl: 'https://images.unsplash.com/photo-1606708305018-97cb00f507b9?q=80&w=870', // Placeholder
    },
    {
        id: 't05',
        name: 'Iskender Kebab',
        description: 'Thin slices of döner kebab meat served over pieces of pita bread, topped with tomato sauce, and hot melted butter and yogurt.',
        price: '500',
        imageUrl: 'https://images.unsplash.com/photo-1544976451-2483504859a1?q=80&w=870', // Placeholder
    },
    {
        id: 't06',
        name: 'Baklava',
        description: 'A rich, sweet dessert pastry made of layers of filo pastry, filled with chopped nuts, and sweetened with syrup or honey.',
        price: '220',
        imageUrl: 'https://images.unsplash.com/photo-1559885820-c70e9b925b6a?q=80&w=870', // Placeholder
    }
];

const TurkishFood = () => {
    return (
        <section className="mb-12">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">
                A Journey Through Turkey's Kitchen 🇹🇷
            </h2>

            {/* Horizontally Scrollable Container */}
            <div className="flex w-full space-x-6 overflow-x-auto pb-4">
                {turkishDishes.map((dish) => (
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
                                <button className="rounded-full bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-cyan-700">
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

export default TurkishFood;