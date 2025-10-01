"use client";

import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";

const ctaData = [
  {
    id: 1,
    title: "List Your Restaurant on FastFeast",
    description:
      "Want millions of new customers to enjoy your delicious food? Join our network to grow your business and reach more hungry people than ever before.",
    buttonText: "Become a Partner",
    link: "/register-restaurant",
    backgroundImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1074",
  },
  {
    id: 2,
    title: "Become a FastFeast Rider",
    description:
      "Enjoy flexible working hours and competitive earnings. Join our rider fleet today and earn up to ৳25,000 a month delivering happiness.",
    buttonText: "Become a Rider",
    link: "/register-rider",
    backgroundImage: "/food-delivery-riderorange.jpg",
  },
];

export default function CTASection() {
  return (
    <section className="relative bg-orange-50 py-20">
      <div className="mb-14 text-center">
        <h2 className="mb-3 text-4xl font-bold text-gray-800">
          Join with <span className="text-orange-500">FastFeast</span>
        </h2>
        <p className="text-gray-600 text-lg">
          Be part of our growing network — serve, deliver & succeed
        </p>
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 gap-10 md:grid-cols-2">
        {ctaData.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{
              opacity: 0,
              y: i % 2 === 0 ? 60 : 0,
              x: i % 2 === 0 ? -80 : 80,
            }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="group relative h-[340px] overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-transform duration-500 hover:-translate-y-2"
          >
            {/* Background */}
            <Image
              src={card.backgroundImage}
              alt={card.title}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent"></div>

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white">
              <h3 className="mb-3 text-2xl md:text-3xl font-bold leading-snug drop-shadow-lg">
                {card.title}
              </h3>
              <p className="mb-5 text-gray-200 text-sm md:text-base leading-relaxed line-clamp-3">
                {card.description}
              </p>

              <Link href={card.link}>
                <button className="flex w-fit items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 font-semibold text-white shadow-md transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300">
                  {card.buttonText}
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
