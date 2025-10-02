"use client";

import React from "react";
import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

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
    <section className="h-screen w-full bg-orange-800 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full">
        {ctaData.map((card) => (
          <div
            key={card.id}
            className="group relative h-full w-full overflow-hidden shadow-xl hover:shadow-2xl hover:zoom-in-10"
          >
            {/* Background */}
            <div className="absolute inset-0">
              <Image
                src={card.backgroundImage}
                alt={card.title}
                fill
                className="object-cover ease-in-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full w-full flex flex-col justify-end p-6 md:p-8">
              <div className="container mx-auto px-4">
                <h3 className="mb-3 text-2xl md:text-3xl font-bold leading-snug drop-shadow-lg text-white">
                  {card.title}
                </h3>
                <p className="mb-5 text-gray-200 text-sm md:text-base leading-relaxed line-clamp-3">
                  {card.description}
                </p>

                <Link href={card.link}>
                  <button className="flex w-fit items-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-red-500 px-5 py-2.5 font-semibold text-white shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-300">
                    {card.buttonText}
                    <FaArrowRight className="group-hover:translate-x-1" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
