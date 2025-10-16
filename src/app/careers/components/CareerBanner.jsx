"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";

const texts = [
  "Join Our Passionate Team!",
  "Build Your Career with FastFeast",
  "Grow. Learn. Lead. Together.",
];

export default function CareerBanner() {
  const [index, setIndex] = useState(0);

  // automatic heading slider
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative h-[70vh] flex items-center justify-center text-center bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1600')",
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-3xl text-white px-6">
        <AnimatePresence mode="wait">
          <motion.h1
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold mb-6"
          >
            {texts[index]}
          </motion.h1>
        </AnimatePresence>

        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Discover exciting opportunities, make a real impact, and grow with a
          fast-moving food tech company.
        </p>

        {/* CTA button */}
        <Link
          href="/careers/jobs" 
          className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white text-lg px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-orange-500/40"
        >
          View Open Positions
          <FaArrowRight />
        </Link>
      </div>
    </section>
  );
}
