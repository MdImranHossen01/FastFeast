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

  const next = () =>
    setReviewIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setReviewIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-16 bg-amber-50 my-10">
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
                className="text-5xl font-bold text-gray-800 leading-tight"
              >
                <span className="text-orange-500">
                  {textList[headingIndex].split(" ")[0]}
                </span>{" "}
                {textList[headingIndex].split(" ").slice(1).join(" ")}
              </motion.h2>
            </AnimatePresence>
            <p className="text-lg text-gray-600 max-w-md my-8">
              Real stories from our happy customers. We always focus on quality,
              fast delivery, and excellent service.
            </p>

             {/* Arrows - Attractive Orange Gradient & Correct Margin */}
            <div className="w-full max-w-[400px] flex justify-center mt-10 gap-4">
              <button
                onClick={prev}
                // Simple solid orange for balance
                className="p-4 bg-orange-500 hover:bg-orange-600 rounded-full cursor-pointer transition shadow-lg shadow-orange-300/50"
              >
                <FaArrowLeft className="text-white" />
              </button>
              <button
                onClick={next}
                // Vibrant Linear Gradient: Light orange/yellow to deep orange
                className="p-4 bg-gradient-to-r from-amber-400 to-orange-600 hover:from-amber-500 hover:to-orange-700 rounded-full transition shadow-lg cursor-pointer shadow-orange-300/50"
              >
                <FaArrowRight className="text-white" />
              </button>
            </div>
          </div>

          {/* Right Reviews Slider (Main Card Container) */}
          <div
            className="w-full flex flex-col items-center justify-center 
            py-12 relative rounded-xl 
            bg-center bg-contain bg-no-repeat"
            style={{ backgroundImage: "url('/photoFrame.png')" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={reviewIndex}
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -40 }}
                transition={{ duration: 0.6 }}
                className="w-[520px] md:w-[600px] p-8 flex flex-col items-center text-center"
              >

                {/* Profile Photo Container (The small frame) */}
                <div
                  className="relative w-[400px] h-auto bg-center bg-contain bg-no-repeat flex items-center justify-center mx-auto mb-2"
                >
                  <img
                    src={testimonials[reviewIndex].photo}
                    alt={testimonials[reviewIndex].name}
                    // FIX: Removed mt-16 to stop covering the stars
                    className="w-20 h-20 md:w-28 md:h-28 mb-2 rounded-full object-cover shadow-lg"
                  />
                </div>

                {/* Stars (Now Visible) */}
                <div className="flex mb-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <FaStar
                      key={i}
                      className={`${i < testimonials[reviewIndex].rating
                          ? "text-yellow-500"
                          : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 w-3/6 text-sm italic font-semibold md:text-base mb-5 line-clamp-6">
                  "{testimonials[reviewIndex].review}"
                </p>

                <h4 className="font-semibold text-gray-900 mt-4">
                  {testimonials[reviewIndex].name}
                </h4>
                <span className="text-gray-500 text-xs md:text-sm mt-2">
                  Ordered: {testimonials[reviewIndex].order}
                </span>
              </motion.div>
            </AnimatePresence>

           
          </div>
           
        </div>
      </div>

    </section>
  );
};

export default CustomersReview;