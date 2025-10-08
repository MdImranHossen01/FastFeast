"use client";

import { useInView } from "react-intersection-observer";
import React from 'react'
import CountUp from 'react-countup'



const numberData = [
    {
        id: 1,
        number: 60,
        sign: "%",
        title: "Happy Customers"
    },
    {
        id: 2,
        number: 1.6,
        sign: "K+",
        title: "Meals Delivery."
    },
    {
        id: 3,
        number: 350,
        title: "Total Active Riders."
    },
    {
        id: 5,
        number: 645,
        title: "Currently Working Employees."
    },
    {
        id: 4,
        number: 51,
        title: "Social Programs."
    },
    {
        id: 6,
        number: 4,
        sign: "+",
        title: "Avarage ratings."
    },

]

export default function OurImpactInNumbers() {
    const { ref, inView } = useInView({
        threshold: 0.3,
    });
    return (
        <section
            ref={ref}
            className=" py-20 bg-base-300 px-4">
            <div className="container mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 md:gap-10">
                <div className="col-span-2">
                    <h3 className="font-semibold text-3xl md:text-4xl">
                        OUR IMPACT IN {" "}
                        <span className="text-orange-600">
                            NUMBERS
                        </span>
                    </h3>
                    <p className="text-gray-500 max-w-lg mt-4 text-lg font-semibold">
                        See how Eats is making a real difference with fresh meals and clean water for all.
                    </p>
                </div>
                {
                    numberData?.map(data =>
                        <div key={data?.id} className="">
                            <h1 className={`font-medium text-6xl sm:text-8xl md:text-9xl text-orange-600 `}>
                                {inView ? (
                                    <CountUp start={0} end={data.number} duration={2.5} />
                                ) : (
                                    "0"
                                )} 
                                <span className="">
                                    {data?.sign}
                                </span>
                            </h1>
                            <p className="font-semibold text-lg text-gray-500">
                                {data?.title}
                            </p>
                        </div>
                    )
                }
            </div>
        </section>
    )
}
