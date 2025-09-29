
import Image from 'next/image'
import React from 'react'



export default function HowWeWork() {
    const data = [
        {
            id: 1,
            title: "The Best Restaurants, Curated Just for You",
            description: "Our commitment to quality starts with our partners. The FastFest team meticulously vets every restaurant, assessing hygiene, food quality, and service reliability before bringing them onto the platform. We ensure you only get the very best local flavors.",
            flexRevers: true,
            image: '/inside_of_restaurant.webp',
        },
        {
            id: 2,
            title: "Instantly Find Local Culinary Gems",
            description: "Forget endless searching. Our intelligent location-based system and advanced filtering allow you to instantly discover the highest-rated and most delicious foods nearby. From traditional regional dishes to modern cuisine, the best of your area is just a tap away.",
            flexRevers: true,
            image: '/taco.jpg',
        },
        {
            id: 3,
            title: "Dedicated Riders: Our Commitment to Speed",
            description: "Our dedicated fleet of riders are the heroes of our service. Equipped with efficient route technology, they are trained to handle your order with care, ensuring your food leaves the restaurant and arrives at your doorstep hot and fresh—before your hunger gets the better of you.",
            flexRevers: true,
            image: '/food-delivery-riderorange.jpg',
        },
    ]
    return (
        <section className="px-4 py-10">
            <div className="container mx-auto">
                <h3 className="text-center font-bold text-xl text-gray-500">
                    How We Work
                </h3>
                <h1 className={`text-center font-bold text-3xl`}>
                    Experience with FastFest
                </h1>
                <div className="">
                    {
                        data?.map(singleRow =>
                            // flex-row-reverse
                            <div
                                key={singleRow?.id}
                                className={`flex flex-col ${singleRow?.id % 2 === 0 ? "lg:flex-row-reverse" : "lg:flex-row"} *:flex-1 gap-10 mt-16`}>
                                <div className="flex flex-col justify-center">
                                    <h1 className="text-4xl font-bold ">
                                        {singleRow?.title}
                                    </h1>
                                    <p className="mt-5">
                                        {singleRow.description}
                                    </p>
                                </div>
                                <figure className=''>
                                    <img
                                        alt='food image'
                                        src={singleRow?.image}
                                        className='h-[500px] object-cover w-full rounded-3xl'
                                    />
                                </figure>
                            </div>
                        )
                    }
                </div>
            </div>
        </section>
    )
}
