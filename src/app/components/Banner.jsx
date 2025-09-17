"use client";

import dynamic from "next/dynamic";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function Banner() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const slides = [
    {
      bg: "bg-gradient-to-r from-orange-700 to-orange-500",
      leftImgs: ["/cola.jpg", "/fries.jpg"],
      rightImgs: ["/burger.jpg", "/pizza.jpg"],
      titleBig: "B",
      titleMain: "Burgers & Drinks",
      highlight: "Juicy Burgers • Cold Cola • Crispy Fries",
      offer: "🔥 50% OFF for 24 hours!",
      contact: "📞 880 1234 54678",
      website: "🌐 www.burgerhouse.com",
      description: "Fast delivery and fresh ingredients, every bite counts!",
    },
    {
      bg: "bg-gradient-to-r from-orange-700 to-orange-500",
      leftImgs: ["/shake.jpg", "/ice-cream.jpg"],
      rightImgs: ["/sandwich.jpg", "/taco.jpg"],
      titleBig: "F",
      titleMain: "Fresh & Tasty",
      highlight: "Shakes • Ice Cream • Sandwiches • Tacos",
      offer: "🎉 Buy 1 Get 1 Free!",
      contact: "📞 880 9876 54321",
      website: "🌐 www.fastfood.com",
      description: "Delicious treats made fresh daily to satisfy your cravings!",
    },
  ];

  return (
    <div className="w-full rounded-2xl shadow-2xl overflow-hidden relative">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`relative w-full h-[450px] md:h-[550px] lg:h-[600px] ${slide.bg}`}
          >
            <div className="absolute inset-0 flex items-center justify-between px-6 sm:px-12 lg:px-20">
              {/* Left Corner Images */}
              <div className="relative w-1/4 flex flex-col items-start">
                {slide.leftImgs.map((img, i) => (
                  <motion.img
                    key={i}
                    src={img}
                    alt="Left Item"
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, y: [0, -10, 0] }}
                    transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, repeatType: "loop" }}
                    className={`absolute rounded-xl object-cover drop-shadow-2xl border-4 border-white/20 
                      ${i === 0
                        ? "top-0 left-0 w-36 sm:w-40 md:w-48 lg:w-52"
                        : "top-28 left-6 w-32 sm:w-36 md:w-44 lg:w-48"
                      }`}
                  />
                ))}
              </div>

              {/* Center Text */}
              <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="text-center flex-1 px-6"
              >
                <h1 className="flex items-center justify-center">
                  <span className="text-orange-600 text-7xl md:text-8xl font-extrabold drop-shadow-lg">
                    {slide.titleBig}
                  </span>
                  <span className="ml-3 text-white text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-lg">
                    {slide.titleMain}
                  </span>
                </h1>
                <p className="mt-2 text-orange-400 text-lg sm:text-2xl md:text-3xl font-semibold drop-shadow-md">
                  {slide.highlight}
                </p>
                <p className="mt-3 text-white text-sm sm:text-base md:text-lg font-medium drop-shadow-md">
                  {slide.description}
                </p>
              </motion.div>

              {/* Right Corner Images */}
              <div className="relative w-1/4 flex flex-col items-end">
                {slide.rightImgs.map((img, i) => (
                  <motion.img
                    key={i}
                    src={img}
                    alt="Right Item"
                    initial={{ x: 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1, y: [0, 10, 0] }}
                    transition={{ duration: 2, delay: i * 0.4, repeat: Infinity, repeatType: "loop" }}
                    className={`absolute rounded-xl object-cover drop-shadow-2xl border-4 border-white/20
                      ${i === 0
                        ? "top-0 right-0 w-40 sm:w-48 md:w-56 lg:w-60"
                        : "top-32 right-6 w-36 sm:w-44 md:w-52 lg:w-56"
                      }`}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Info + Offer Button */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3">
              {/* Offer Button */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="bg-white/30 border border-white px-6 py-3 rounded-full text-white text-base sm:text-lg md:text-xl font-semibold shadow-lg backdrop-blur-md"
              >
                {slide.offer}
              </motion.div>

              {/* Contact & Website */}
              <div className="flex gap-6 sm:gap-10 text-white text-sm sm:text-lg font-semibold drop-shadow-lg">
                <p>{slide.contact}</p>
                <p>{slide.website}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
