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
    threshold: 0.3,
  });

  return (
    <section 
      ref={ref} 
      // Ensure the section takes up the viewport height on md screens and larger
      // Use min-h-screen for mobile to guarantee content fits
      className="relative min-h-screen md:h-screen w-full bg-gray-100 overflow-hidden py-4"
    >
      {/* Dark overlay for readability (optional) */}
      <div className="absolute inset-0"></div>

      {/* Main Container: Use flex-col and h-full on medium screens to enable vertical spacing */}
      <div className="relative container mx-auto px-4 z-10 h-full flex flex-col">
        
        {/* Text and Image Section: Use flex-grow on medium screens to consume vertical space */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-6 py-6 md:pt-10 md:pb-8 flex-grow">
          
          {/* Text Section */}
          <div className="text-left">
            <h1 className="text-orange-600 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Our Mission <br/> Access to Better Food.
            </h1>
            <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-lg">
              We've enabled our customers to effortlessly access better food
              and explore a wider world of tastes, all conveniently delivered
              right to your door.
            </p>
          </div>

          {/* Image Section with continuous flying animation */}
          <div className="relative flex justify-center items-center w-full py-4 md:py-0">
            <motion.div
              animate={{
                x: [0, 50, 0], 
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
              className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80" 
            >
              <Image
                src="https://i.ibb.co/0gxb4sS/Untitled-500-x-500-px.png"
                alt="Mission Illustration"
                width={300}
                height={300}
                className="object-contain w-full h-full"
              />
            </motion.div>
          </div>
        </div>

        {/* Stats Section: Will be pushed to the bottom of the container */}
        <div className="w-full pb-4 md:pb-10">
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full"> 
            {cardsData.map((card) => (
              <div
                key={card.id}
                className="flex flex-col items-center justify-center gap-3 sm:gap-4 rounded-xl bg-white/90 backdrop-blur-sm p-3 sm:p-4 shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl w-full text-center"
              >
                <div className="flex flex-row items-center justify-center gap-3 w-full">
                  <div className="rounded-full bg-orange-100 p-2 sm:p-3 text-orange-500 flex-shrink-0">
                    <card.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>

                  <div className="text-left">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-gray-800">
                      {inView ? (
                        <CountUp start={0} end={card.number} duration={2.5} />
                      ) : (
                        "0"
                      )}
                      +
                    </h3>
                    <span className="font-semibold text-gray-600 text-xs sm:text-sm">
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