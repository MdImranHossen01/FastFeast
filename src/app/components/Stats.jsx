"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

const cardsData = [
  {
    id: 1,
    image: "/about/rider.png",
    number: "3000",
    title: "Rider",
  },
  {
    id: 2,
    image: "/about/restaurant.png",
    number: "500",
    title: "Restaurants",
  },
  {
    id: 3,
    image: "/about/foods.png",
    number: "600",
    title: "Foods",
  },
  {
    id: 4,
    image: "/about/team.png",
    number: "50",
    title: "Team Members",
  },
];

export default function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section ref={ref} className="py-8 lg:py-12">
      <div className="text-center max-w-lg mx-auto text-gray-900 mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold ">Our Stats</h1>
        <p>
          From serving happy customers to expanding our reach, these numbers
          reflect the milestones that define our journey. Every stat is a story
          of trust, growth, and dedication.
        </p>
      </div>

      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 py-10 ">
        {cardsData?.map((card) => (
          <div
            key={card.id}
            className="bg-white flex flex-col items-center p-5 rounded-xl hover:shadow-2xl shadow-lg transition-all duration-200"
          >
            <figure className="flex-1">
              <img src={card?.image} alt="" className="max-w-[150px] " />
            </figure>
            <h3 className="text-3xl font-black">
              {inView ? <CountUp start={0} end={card?.number} /> : 0}+
            </h3>
            <span className="font-bold">{card?.title}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
