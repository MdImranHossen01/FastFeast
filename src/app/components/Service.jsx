"use client";

import React from "react";
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
    icon: "https://i.ibb.co.com/zVKpGgCk/gps-tracking.png",
    title: "Real-Time Order Tracking",
    description:
      "Track your order live with GPS and get instant status updates from kitchen to doorstep.",
  },
  {
    id: "02",
    icon: "https://i.ibb.co.com/k2QLf1zV/rider-fast-Delivery.png",
    title: "Fast Delivery by Riders",
    description:
      "Enjoy quick and reliable delivery from trained riders with accurate arrival estimates.",
  },
  {
    id: "03",
    icon: "https://i.ibb.co.com/x46KGLk/food-order.png",
    title: "Online Food Ordering",
    description:
      "Browse restaurants, explore menus, and place orders instantly with ease and reliability.",
  },
  {
    id: "04",
    icon: "https://i.ibb.co.com/99G94dL9/restaurant-Partnership.png",
    title: "Restaurant Partnership",
    description:
      "Grow your restaurant online, manage menus effortlessly, and connect with a trusted food network.",
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
  return (
    <section className="bg-orange-50/40 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          How <span className="text-orange-500">FastFeast</span> Works
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              className={`group    relative overflow-hidden rounded-2xl bg-whit p-6 text-center shadow-lg transition-shadow duration-300 hover:shadow-2xl ${
                index === 0
                  ? "bg-gradient-to-br from-white  to-gray-50/100 border-1 border-orange-100 "
                  : ""
              }
              ${
                index === 1
                  ? "bg-gradient-to-br from-gray-50/100 to-white border-1 border-orange-100"
                  : ""
              }
              ${
                index === 2
                  ? "bg-gradient-to-br from-white to-gray-50/100 border-1 border-orange-100"
                  : ""
              }
              ${
                index === 3
                  ? "bg-gradient-to-br from-gray-50/100 to-white border-1 border-orange-100"
                  : ""
              }
              `}
              variants={cardVariants}
            >
              <div className="relative z-10 mx-auto mb-6 inline-block  bg-orange-10 p- text-orange-500   transition-all transform group-hover:scale-110  group-hover:duration-300 group-hover:bg-orange-5 group-hover:text-white">
                <img
                  src={service.icon}
                  alt="service"
                  className="h-28 w-full object-cover"
                />
              </div>
              <div className="relative z-10">
                <h3 className="mb-2 text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-500">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
