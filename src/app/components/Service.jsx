"use client";
import React from "react";
import {
  FaMapMarkerAlt,
  FaMobileAlt,
  FaMotorcycle,
  FaStore,
} from "react-icons/fa";

const servicesData = [
  {
    id: "01",
    icon: <FaMapMarkerAlt className="w-10 h-10" />,
    title: "Real-Time Order Tracking",
    description:
      "Track your order live with GPS and get instant status updates from kitchen to doorstep.",
  },
  {
    id: "02",
    icon: <FaMotorcycle className="w-10 h-10" />,
    title: "Fast Delivery by Riders",
    description:
      "Enjoy quick and reliable delivery from trained riders with accurate arrival estimates.",
  },
  {
    id: "03",
    icon: <FaMobileAlt className="w-10 h-10" />,
    title: "Online Food Ordering",
    description:
      "Browse restaurants, explore menus, and place orders instantly with ease and reliability.",
  },
  {
    id: "04",
    icon: <FaStore className="w-10 h-10" />,
    title: "Restaurant Partnership",
    description:
      "Grow your restaurant online, manage menus effortlessly, and connect with a trusted food network.",
  },
];

export default function Services() {
  return (
    <section className="container mx-auto py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transform transition hover:translate-y-2 duration-300 p-6 flex flex-col items-center text-center border border-gray-100"
          >
            <div className="bg-amber-50 rounded-full p-6 mb-4 hover:scale-110 text-orange-500 shadow-sm transition duration-300">
              {service.icon}
            </div>
            <h2 className="text-xl text-orange-500 font-bold mb-2">
              {service.title}
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-xs">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
