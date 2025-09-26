import React from 'react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

const ctaData = [
  {
    id: 1,
    title: "List Your Restaurant on FastFeast",
    description: "Want millions of new customers to enjoy your delicious food? Join our network to grow your business and reach more hungry people than ever before.",
    buttonText: "Become a Partner",
    link: "/signup/restaurant",
    backgroundImage: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1074",
  },
  {
    id: 2,
    title: "Become a FastFeast Rider",
    description: "Enjoy flexible working hours and competitive earnings. Join our rider fleet today and earn up to ৳25,000 a month delivering happiness.",
    buttonText: "Become a Rider",
    link: "/signup/rider",
    backgroundImage: "/food-delivery-riderorange.jpg",
  },
];

export default function CTASection() {
  return (
    // ✅ REMOVED px-4 from here
    <section className="bg-orange-50 py-16">
       <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            Join with <span className="text-orange-500">FastFeast</span> 
          </h2>
                  </div>
       
      {/* ✅ ADDED px-4 here for perfect alignment */}
      <div className="container mx-auto px-4 grid grid-cols-1 gap-8 md:grid-cols-2">
        {ctaData.map((card) => (
          <div key={card.id} className="group relative h-80 overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={card.backgroundImage}
              alt={card.title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
              <h3 className="mb-2 text-3xl font-bold">
                {card.title}
              </h3>
              <p className="mb-4 text-gray-200">
                {card.description}
              </p>
              <Link href={card.link}>
                <button className="flex w-fit items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300">
                  {card.buttonText}
                  <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}