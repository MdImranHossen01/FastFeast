"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const popularItems = [
  {
    id: 1,
    name: "Biryani",
    image:
      "https://i.ibb.co.com/KcyNS5wF/Biryani-in-orange-background-for-round-profile-picture.jpg",
    link: "/biryani",
  },
  {
    id: 2,
    name: "Pizza",
    image: "https://i.ibb.co.com/TxGwFfsN/Pizza-in-orange-background.jpg",
    link: "/pizza",
  },
  {
    id: 3,
    name: "Noodles",
    image: "https://i.ibb.co.com/FqHZcYX1/noodles-in-orange-background-1.jpg",
    link: "/noodles",
  },
  {
    id: 4,
    name: "Shawarma",
    image: "https://i.ibb.co.com/B2R3qXw1/shawarma-in-orange-background.jpg",
    link: "/shawarma",
  },
  {
    id: 5,
    name: "Fried Chicken",
    image:
      "https://i.ibb.co.com/S4pQbgpq/fried-chicken-in-orange-background.jpg",
    link: "/friedchicken",
  },
  {
    id: 6,
    name: "Sushi",
    image: "https://i.ibb.co.com/0j2RNP8V/sushi-in-orange-background.jpg",
    link: "/sushi",
  },
  {
    id: 7,
    name: "Soup",
    image: "https://i.ibb.co.com/YFkxHZnF/soup-in-orange-background.jpg",
    link: "/soups",
  },
];

const safeImage = (e) => {
  const target = e.target;
  target.src = "https://placehold.co/100x100/FEE2E2/DC2626?text=Food";
};

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const checkScreenSize = () => setIsMobile(window.innerWidth < breakpoint);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [breakpoint]);
  return isMobile;
};

export default function PopularItems() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const isMobile = useIsMobile();

  // Increased container radius to prevent overlapping
  const containerRadius = isMobile ? 130 : 200; // Increased from 130/200
  const profileSize = isMobile ? 70 : 90; // Slightly increased profile size
  const containerSize = containerRadius * 2 + 100; // Increased buffer space

  const getRotation = React.useCallback(
    (index) => (index - activeIndex) * (360 / popularItems.length),
    [activeIndex]
  );

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const next = () => setActiveIndex((i) => (i + 1) % popularItems.length);
  const prev = () =>
    setActiveIndex((i) => (i - 1 + popularItems.length) % popularItems.length);

  const handleProfileClick = React.useCallback(
    (index) => {
      if (index === activeIndex) return;
      setActiveIndex(index);
    },
    [activeIndex]
  );

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") prev();
      else if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section className="flex flex-col items-center w-full relative min-h-[500px] transition-colors duration-300 bg-gradient-to-b from-white to-orange-50 py-12">
      <div className="container px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side Content */}
          <div
            className="flex flex-col justify-center space-y-6"
            data-aos="fade-left"
          >
            <p className="text-sm uppercase tracking-widest font-medium text-orange-600 mb-1">
              Handpicked by thousands of food lovers across Bangladesh
            </p>

            {/* Title */}
            <h2 className="text-3xl sm:text-4xl  font-extrabold leading-tight mb-4 sm:mb-6">
              Discover Our <br />
              <span className="text-orange-600">Customer Favorites</span> <br />
              Dishes
            </h2>

            {/* Paragraph */}
            <p className="text-base sm:text-lg leading-relaxed max-w-xl mb-6 sm:mb-10 text-gray-600">
              From sizzling biryani to crispy fried chicken, our popular items
              section showcases the dishes that keep our customers coming back
              for more. Each item is carefully crafted with fresh ingredients,
              authentic recipes, and delivered hot to your doorstep. Join the
              thousands of satisfied customers who have made these dishes their
              favorites!
            </p>

            {/* Demo Button */}
            <Link href={"/menus"}>
              <button className="relative py-3 sm:py-4 px-8 sm:px-10 overflow-hidden cursor-pointer font-bold text-orange-600 bg-white border-2 border-orange-600 rounded-lg shadow-lg hover:shadow-xl group transition-all duration-300">
                <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-orange-600 group-hover:w-full ease"></span>
                <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-orange-600 group-hover:w-full ease"></span>
                <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-orange-600 group-hover:h-full ease"></span>
                <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-orange-600 group-hover:h-full ease"></span>
                <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-orange-600 opacity-0 group-hover:opacity-100"></span>
                <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                  Explore Full Menu
                </span>
              </button>
            </Link>
          </div>

          {/* right side component */}
          <div
            data-aos="fade-right"
            className="relative flex items-center mx-auto justify-center mb-8"
            style={{
              width: containerSize,
              height: containerSize,
            }}
          >
            {/* Outer Circle - Larger to prevent overlapping */}
            <div
              className="absolute rounded-full border-2 border-orange-300/50"
              style={{
                width: containerRadius * 2,
                height: containerRadius * 2,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />

            {/* Active Item Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={popularItems[activeIndex].id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="z-10 bg-white backdrop-blur-sm shadow-xl rounded-xl p-3 w-48 md:w-52 text-center border-2 border-orange-200 relative"
                style={{ marginBottom: "20px" }} // Added margin to separate from circle
              >
                <motion.img
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  src={popularItems[activeIndex].image}
                  alt={popularItems[activeIndex].name}
                  onError={safeImage}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full mx-auto -mt-15 border-4 border-white object-cover shadow-md"
                />

                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.15 }}
                  className="mt-2"
                >
                  <h2 className="text-xl md:text-2xl font-bold text-gray-950">
                    {popularItems[activeIndex].name}
                  </h2>
                </motion.div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                  className="flex justify-center items-center mt-6 space-x-4"
                >
                  <button
                    onClick={prev}
                    className="p-2 btn-sm cursor-pointer rounded-full bg-orange-500 hover:bg-orange-600 transition-colors shadow-lg"
                  >
                    <ChevronLeft size={15} className="text-white font-bold" />
                  </button>

                  <Link href={popularItems[activeIndex].link}>
                    <button className="px-3 py-1 text-base cursor-pointer rounded-full btn-sm bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-xl transition-all duration-300 font-sm">
                      Explore
                    </button>
                  </Link>

                  <button
                    onClick={next}
                    className="p-2 btn-sm cursor-pointer rounded-full bg-orange-500 hover:bg-orange-600 transition-colors shadow-lg"
                  >
                    <ChevronRight size={15} className="text-white font-bold" />
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Circular Food Items - Positioned around the larger circle */}
            {popularItems.map((item, i) => {
              const rotation = getRotation(i);
              return (
                <motion.div
                  key={item.id}
                  animate={{
                    transform: `rotate(${rotation}deg) translateY(-${containerRadius}px)`,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  style={{
                    width: profileSize,
                    height: profileSize,
                    position: "absolute",
                    top: `calc(50% - ${profileSize / 2}px)`,
                    left: `calc(50% - ${profileSize / 2}px)`,
                  }}
                  className="z-10"
                >
                  <motion.div
                    animate={{ rotate: -rotation }}
                    transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
                    className="w-full h-full"
                  >
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      onError={safeImage}
                      onClick={() => handleProfileClick(i)}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full h-full object-cover rounded-full cursor-pointer transition-all duration-300 shadow-lg ${
                        i === activeIndex
                          ? "border-4 border-orange-500 shadow-xl ring-2 ring-orange-200"
                          : "border-3 border-orange-300 hover:border-orange-500 hover:shadow-xl"
                      }`}
                    />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
