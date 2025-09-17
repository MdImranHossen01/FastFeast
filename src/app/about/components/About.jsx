import React from 'react'

export default function About() {
    return (
        <section
            style={{
                // backgroundImage: `linear-gradient(to bottom, #00000099 , #000000), url(/coffee_and_assorted.webp)`
            }}
            className='bg-center bg-cover py-10 '>
            <div className="grid grid-cols-2 container mx-auto gap-5">

                <div className="flex flex-col justify-center ">
                    <h1 className="text-xl sm:text-2xl md:text-3xl  font-bold ">
                        Delivering Deliciousness to Your Door
                    </h1>
                    <p className="text-gray-400">
                        We are a modern food delivery platform that connects you with the best local restaurants. Our mission is to make ordering delicious food simple, fast, and reliable. With our dedicated delivery team, we ensure your food arrives hot and fresh, so you can enjoy every meal as if you were at the restaurant.
                    </p>
                </div>
                <figure className="">
                    <img src="/banner2.jpg" alt="food image" className='rounded-xl' />
                </figure>
            </div>
        </section>
    )
}
