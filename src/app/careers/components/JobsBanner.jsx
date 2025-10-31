"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Image from "next/image";

const banners = [
  {
    id: 1,
    image: "/career1.png",
    heading: "Join Our FastFeast Team",
    text: "Be part of a growing food delivery revolution.",
  },
  {
    id: 2,
    image: "/career1.png",
    heading: "Grow Your Career With Us",
    text: "Opportunities that match your passion and skill.",
  },
  {
    id: 3,
    image: "/career1.png",
    heading: "Work. Learn. Lead.",
    text: "We believe in talent, teamwork, and transformation.",
  },
  {
    id: 4,
    image: "/career1.png",
    heading: "Make a Difference Every Day",
    text: "Help deliver happiness — one meal at a time.",
  },
];

export default function JobsBanner() {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((index + 1) % banners.length);
  const prevSlide = () => setIndex((index - 1 + banners.length) % banners.length);

  // Auto-slide
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [index]);

  return (
    <div className="relative w-full h-[80vh] overflow-hidden shadow-lg">
      <AnimatePresence mode="sync">
        <motion.div
          key={banners[index].id}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1 }}
        >
          <Image
            src={banners[index].image}
            alt={banners[index].heading}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center items-start text-start px-6 bg-black/40">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-white mb-4"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {banners[index].heading}
        </motion.h1>

        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-6">
          {banners[index].text}
        </p>

        <button
          onClick={() => (window.location.href = "/careers/jobs")} // adjust route if needed
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg hover:scale-105"
        >
          Explore Jobs
        </button>
      </div>

      {/* Controls */}
      <div className="absolute inset-0 flex justify-between items-center px-6">
        <button
          onClick={prevSlide}
          className="bg-black/40 p-3 rounded-full text-white hover:bg-black/70 transition-all"
        >
          <FaArrowLeft />
        </button>
        <button
          onClick={nextSlide}
          className="bg-black/40 p-3 rounded-full text-white hover:bg-black/70 transition-all"
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
