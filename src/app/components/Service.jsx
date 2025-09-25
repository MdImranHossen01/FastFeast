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
    icon: <FaMapMarkerAlt className="w-8 h-8  " />,
    title: "Real-Time Order Tracking",
    description:
      "Track your food order live with real-time GPS from kitchen to doorstep, see every movement instantly, follow accurate delivery timelines, and stay fully updated with safe and reliable status alerts.",
  },
  {
    id: "02",
    icon: <FaMotorcycle className="w-8 h-8  " />,
    title: "Fast Delivery by Riders",
    description:
      "Receive your meals quickly and safely from our trained delivery riders, enjoy smooth and timely drop-offs, get accurate arrival estimates, and experience fast and reliable food delivery every time.",
  },
  {
    id: "03",
    icon: <FaMobileAlt className="w-8 h-8  " />,
    title: "Online Food Ordering",
    description:
      "Browse restaurants and order your favorite meals with a simple online system, explore detailed menus easily, place orders within seconds, and enjoy a smooth and reliable ordering experience always.",
  },
  {
    id: "04",
    icon: <FaStore className="w-8 h-8  " />,
    title: "Restaurant Partnership",
    description:
      "Join our platform and grow your restaurant with seamless online tools, add and manage your menus easily, handle orders with full control, and build a trusted and reliable food business network.",
  },
];

export default function Services() {
  return (
    <section className="py-8 lg:py-12">
      <div className="text-center max-w-2xl mx-auto text-gray-900 mb-12">
        <h1 className="text-3xl lg:text-4xl font-bold">
          Feast <span className="text-orange-500">Features</span>
        </h1>
        <p className="mt-2 text-gray-600">
          We provide fast, reliable, and hassle-free food delivery with a focus
          on quality and customer satisfaction. From easy ordering to quick
          delivery, our services are designed to make every meal enjoyable.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {servicesData.map((service) => (
          <div
            key={service.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transform transition hover:translate-y-2 duration-300 p-6 flex flex-col items-center text-center"
          >
            <div className="rounded-full p-5 mb-5 hover:scale-110 shadow-sm transition duration-300">
              {service.icon}
            </div>
            <h2 className="text-xl font-semibold mb-3">{service.title}</h2>
            <p className="text-base leading-relaxed max-w-xs">
              {service.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
