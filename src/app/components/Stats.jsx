"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

// Import the icons we need from react-icons
import { FaMotorcycle } from "react-icons/fa";
import { IoRestaurant } from "react-icons/io5";
import { IoFastFood } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";

// Updated data structure to use icon components
const cardsData = [
  {
    id: 1,
    icon: FaMotorcycle, // Using the icon component directly
    number: 3000,
    title: "Riders",
  },
  {
    id: 2,
    icon: IoRestaurant,
    number: 500,
    title: "Restaurants",
  },
  {
    id: 3,
    icon: IoFastFood,
    number: 600,
    title: "Foods",
  },
  {
    id: 4,
    icon: HiUsers,
    number: 50,
    title: "Team Members",
  },
];

export default function Stats() {
  const { ref, inView } = useInView({
    // Removed `triggerOnce: true` to allow animation on every scroll
    threshold: 0.5,
  });

     return (
    <section ref={ref} className="bg-amber-50 pt-12 px-4">
      <div className="text-center mb-12">
         <h2 className="mb-4 text-4xl font-bold text-gray-800">
           Feast <span className="text-orange-500">Milestones</span> 
        </h2>
        
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-6 pb-16 sm:grid-cols-2 md:grid-cols-4">
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="flex flex-col items-center gap-4 rounded-xl bg-white p-6 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* Icon container with new styling */}
            <div className="rounded-full bg-orange-100 p-4 text-orange-500">
              <card.icon className="h-10 w-10" />
            </div>

            {/* Counter section */}
            <div className="text-center">
              <h3 className="text-4xl font-extrabold text-gray-800">
                {/* The counter will now re-run whenever `inView` becomes true */}
                {inView ? (
                  <CountUp start={0} end={card.number} duration={2.5} />
                ) : (
                  "0"
                )}
                +
              </h3>
              <span className="font-semibold text-gray-500">{card.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
