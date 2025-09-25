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
    <section className="py-8 lg:py-12">
      {/* Section Heading */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          Feast <span className="text-orange-500">Features</span>
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          We provide fast, reliable, and hassle-free food delivery with a focus
          on quality and customer satisfaction. From easy ordering to quick
          delivery, our services are designed to make every meal enjoyable.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {servicesData.map((service) => (
          <div
            key={service.id}
            data-aos="fade-up"
            className="group bg-white rounded-2xl border border-orange-100 
                       shadow-md p-6 flex flex-col items-center text-center
                       transition-all duration-300 ease-in-out
                       hover:-translate-y-2 hover:shadow-lg hover:shadow-orange-200/60"
          >
            <div
              className="bg-amber-50 rounded-full p-6 mb-4 text-orange-500 shadow-sm 
                         transition-transform duration-300 ease-in-out
                         group-hover:scale-110"
            >
              {service.icon}
            </div>
            <h2 className="text-xl text-orange-500 font-semibold mb-2">
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
