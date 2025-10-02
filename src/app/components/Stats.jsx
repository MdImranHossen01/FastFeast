"use client";

import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaMotorcycle } from "react-icons/fa";
import { IoRestaurant, IoFastFood } from "react-icons/io5";
import { HiUsers } from "react-icons/hi";
import Image from "next/image";
import { motion } from "framer-motion";

const cardsData = [
  {
    id: 1,
    icon: FaMotorcycle,
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
    threshold: 0.5,
  });

  return (
    <section ref={ref} className="relative h-screen w-full bg-gray-100 overflow-hidden">
      {/* Dark overlay for readability (optional) */}
      <div className="absolute inset-0"></div>

      {/* Content wrapper -> pushes stats to bottom */}
      <div className="relative container mx-auto px-4 py-10 z-10 h-full flex flex-col">
        {/* Text and Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-6 pt-5 md:pt-10 flex-grow">
          {/* Text Section */}
          <div className="text-left  p-6">
            <h1 className="text-orange-600 text-5xl font-extrabold">
              Our Mission <br/> Access to Better Food.
            </h1>
            <p className="mt-6 text-gray-600">
              We've enabled our customers to effortlessly access better food
              and explore a wider world of tastes, all conveniently delivered
              right to their door.
            </p>
          </div>

          {/* Image Section with continuous flying animation */}
          <div className="relative flex justify-center items-center w-full">
            <motion.div
              animate={{
                x: [0, 200, 0], // Move from left to right and back
                opacity: [1, 0.5, 1], // Optional: Add some opacity change to make it more dynamic
              }}
              transition={{
                duration: 3, // Total time for one cycle
                repeat: Infinity, // Make it repeat indefinitely
                repeatType: "loop", // Loop back to start after completing one cycle
                ease: "easeInOut", // Smooth easing for the animation
              }}
            >
              <Image
                src="https://i.ibb.co/0gxb4sS/Untitled-500-x-500-px.png"
                alt="FAQ Illustration"
                width={300}
                height={300}
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex-grow flex items-end">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 justify-around w-full">
            {cardsData.map((card) => (
              <div
                key={card.id}
                className="flex flex-col items-center gap-4 rounded-xl bg-white/90 backdrop-blur-sm p-4 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex flex-row items-center gap-3">
                  <div className="rounded-full bg-orange-100 p-4 text-orange-500">
                    <card.icon className="h-10 w-10" />
                  </div>

                  <div className="text-left">
                    <h3 className="text-3xl font-extrabold text-gray-800">
                      {inView ? (
                        <CountUp start={0} end={card.number} duration={2.5} />
                      ) : (
                        "0"
                      )}
                      +
                    </h3>
                    <span className="font-semibold text-gray-600">
                      {card.title}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
