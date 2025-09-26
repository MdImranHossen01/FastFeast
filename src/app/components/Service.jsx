"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaMobileAlt,
  FaMotorcycle,
  FaStore,
} from "react-icons/fa";

const servicesData = [
  {
    id: "01",
    icon: FaMapMarkerAlt,
    title: "Real-Time Order Tracking",
    description:
      "Track your order live with GPS and get instant status updates from kitchen to doorstep.",
  },
  {
    id: "02",
    icon: FaMotorcycle,
    title: "Fast Delivery by Riders",
    description:
      "Enjoy quick and reliable delivery from trained riders with accurate arrival estimates.",
  },
  {
    id: "03",
    icon: FaMobileAlt,
    title: "Online Food Ordering",
    description:
      "Browse restaurants, explore menus, and place orders instantly with ease and reliability.",
  },
  {
    id: "04",
    icon: FaStore,
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
    // ✅ REMOVED px-4 from here
    <section className="bg-orange-50/50 py-16">
      {/* ✅ ADDED px-4 here for perfect alignment */}
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
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              className="group relative overflow-hidden rounded-2xl bg-white p-6 text-center shadow-lg transition-shadow duration-300 hover:shadow-2xl"
              variants={cardVariants}
            >
              <div className="absolute -top-2 -right-2 text-9xl font-extrabold text-gray-100 opacity-80 transition-transform duration-300 group-hover:scale-110">
                {service.id}
              </div>
              <div className="relative z-10 mx-auto mb-6 inline-block rounded-full bg-orange-100 p-5 text-orange-500 transition-colors duration-300 group-hover:bg-orange-500 group-hover:text-white">
                <service.icon className="h-10 w-10" />
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