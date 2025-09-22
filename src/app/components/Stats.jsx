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
  })
  // console.log(inView);
  //bg-gradient-to-r from-orange-600 to-orange-400
  return (
    <section ref={ref} className="bg-base-200 px-4">
      <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 container mx-auto py-10 ">
        {cardsData?.map((card) => (
          <div
            key={card.id}
            className="bg-white flex flex-col items-center p-5 rounded-xl hover:shadow-2xl shadow-lg"
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
