"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
// import {
//   FaMapMarkerAlt,
//   FaMobileAlt,
//   FaMotorcycle,
//   FaStore,
// } from "react-icons/fa";

const servicesData = [
  {
    id: "01",
    icon: "https://i.ibb.co.com/4nD9P4ct/Navigation-amico.png",
    title: "Real-Time Order Tracking",
    description:
      "Track your food live with GPS and get real-time updates from kitchen to doorstep, knowing exactly when your meal will arrive.",
  },
  {
    id: "02",
    icon: "https://i.ibb.co.com/gMrpH4ds/Take-Away-pana.png",
    title: "Fast Delivery by Riders",
    description:
      "Experience speedy, reliable delivery handled by trained riders who ensure your food arrives hot, fresh, and right on schedule.",
  },
  {
    id: "03",
    icon: "https://i.ibb.co.com/gZ4RTFpj/Order-food-pana.png",
    title: "Online Food Ordering",
    description:
      "Easily browse restaurants, explore diverse menus, customize your dishes, and place secure orders within just a few quick taps.",
  },
  {
    id: "04",
    icon: "https://i.ibb.co.com/5g4RzxQC/Business-deal-bro.png",
    title: "Restaurant Partnership",
    description:
      "Expand your restaurant’s reach, manage orders efficiently, update menus anytime, and grow your sales with our trusted platform.",
  },
];

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function Services() {
  const [flipped, setFlipped] = useState({});
  const toggleFlip = (id) => {
    setFlipped((prev) => (prev === id ? null : id));
  };
  return (
    <section className="bg-orange-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          How <span className="text-orange-500">FastFeast</span> Works
        </h2>

        {/* perspective-parent */}

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              className="group relative h-72 cursor-pointer  [perspective:1000px]"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              onClick={() => toggleFlip(service.id)}
            >
              {/* card inner */}

              <div
                className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d]  ${
                  flipped === service.id ? "[transform:rotateY(180deg)]" : ""
                }
                lg:group-hover:[transform:rotateY(180deg)] hover:shadow-xl transition-all`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 flex flex-col bg-white rounded-xl shadow-md p-6 py-5 items-center justify-center [backface-visibility:hidden]">
                  <img
                    src={service.icon}
                    alt="service"
                    className="h-[200px] w-[180px] object-cover  transition-transform duration-300  group-hover:scale-110 pt-5"
                  />
                  <h3 className="text-xl font-bold text-gray-800 text-center group-hover:text-orange-500 transition-colors duration-300 py-5">
                    {service.title}
                  </h3>
                </div>

                {/* back side */}
                <div className="absolute inset-0 flex flex-col rounded-xl items-center justify-center px-6 text-center shadow-md bg-white [transform:rotateY(180deg)] [backface-visibility:hidden]">
                  <h3 className="text-xl font-bold text-gray-800 text-center group-hover:text-orange-500 transition-colors duration-300 pb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-700">{service.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
