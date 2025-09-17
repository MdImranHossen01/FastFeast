"use client";

import React from 'react'
const cardsData = [
    {
        id: 1,
        image: '/about/rider.png',
        number: "3000",
        title: "Rider"
    },
    {
        id: 2,
        image: '/about/restaurant.png',
        number: "3000",
        title: "Rider"
    },
    {
        id: 3,
        image: '/about/foods.png',
        number: "3000",
        title: "Rider"
    },
    {
        id: 4,
        image: '/about/team.png',
        number: "3000",
        title: "Rider"
    },
]
export default function AboutCards() {
    return (
        <section className='grid grid-cols-4 gap-5 container mx-auto transform -translate-y-16'>
            {
                cardsData?.map(card =>
                    <div key={card.id} className="bg-gradient-to-r from-orange-600   to-orange-400 flex flex-col items-center p-5 rounded-xl">
                        <figure className='flex-1'>
                            <img src={card?.image} alt="" className='max-w-[150px] ' />
                        </figure>
                        <h3 className="text-3xl font-black text-gray-200">
                            {card.number}+
                        </h3>
                        <span>
                            {card.title}
                        </span>
                    </div>
                )
            }
        </section>
    )
}
