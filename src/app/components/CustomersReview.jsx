"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";


const textList = [
  "What People Say About Us?",
  "Why Customers Love Us?",
  "Trusted by Thousands!",
];

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    review:
      "The food arrived hot and fresh! Delivery was faster than expected. Will definitely order again!",
    photo:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1288",
    order: "Pizza & Pasta Combo",
  },
  {
    id: 2,
    name: "Mike Chen",
    rating: 4,
    review:
      "Great service and delicious food. The app makes ordering so convenient and the tracking is accurate.",
    photo:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287",
    order: "Sushi Platter",
  },
  {
    id: 3,
    name: "Fatima Ahmed",
    rating: 5,
    review:
      "Kacchi Bhai never disappoints! The order came perfectly packed and the taste was authentic. 10/10.",
    photo:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1287",
    order: "Mutton Kacchi Biryani",
  },
  {
    id: 4,
    name: "David Lee",
    rating: 4,
    review:
      "The variety of restaurants is amazing. I can always find something new to try. Reliable and fast.",
    photo:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1288",
    order: "Thai Green Curry",
  },
  {
    id: 5,
    name: "Aisha Khan",
    rating: 5,
    review:
      "Perfect for late-night cravings. The 24/7 service is a lifesaver. My go-to app for food delivery.",
    photo:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1361",
    order: "Chicken Burger & Fries",
  },
];

const CustomersReview = () => {
  
  const [headingIndex, setHeadingIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setHeadingIndex((prev) => (prev + 1) % textList.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // ডান দিকের কার্ড শুধু arrow button এ চলবে
  const next = () =>
    setReviewIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 bg-amber-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* Left Banner Text */}
          <div>
            <AnimatePresence mode="wait">
              <motion.h2
                key={headingIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-5xl font-bold text-gray-800 leading-tight mb-4"
              >
                <span className="text-orange-500">
                  {textList[headingIndex].split(" ")[0]}
                </span>{" "}
                {textList[headingIndex].split(" ").slice(1).join(" ")}
              </motion.h2>
            </AnimatePresence>
            <p className="text-lg text-gray-600 max-w-md">
              Real stories from our happy customers. We always focus on quality,
              fast delivery, and excellent service.
            </p>
          </div>

          {/* Right Reviews Slider */}
          <div className="w-full flex flex-col items-center justify-center bg-white py-12 rounded-xl shadow-lg">
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -40 }}
                transition={{ duration: 0.6 }}
                className="w-[320px] h-[280px] md:w-[400px] md:h-[300px] bg-gray-50 rounded-2xl p-6 flex flex-col items-center text-center"
              >
                <img
                  src={testimonials[reviewIndex].photo}
                  alt={testimonials[reviewIndex].name}
                  className="w-16 h-16 rounded-full mb-4 object-cover"
                />

                {/* Stars */}
                <div className="flex mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < testimonials[reviewIndex].rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-gray-700 text-sm md:text-base mb-3 line-clamp-3">
                  "{testimonials[reviewIndex].review}"
                </p>

                <h4 className="font-semibold text-gray-900">
                  {testimonials[reviewIndex].name}
                </h4>
                <span className="text-gray-500 text-xs md:text-sm">
                  Ordered: {testimonials[reviewIndex].order}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Arrows */}
            <div className="w-full max-w-[400px] flex justify-start mt-6 gap-4">
              <button
                onClick={prev}
                className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full transition"
              >
                <FaArrowLeft className="text-gray-700" />
              </button>
              <button
                onClick={next}
                className="p-3 bg-gray-200 hover:bg-gray-300 rounded-full transition"
              >
                <FaArrowRight className="text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default CustomersReview;
