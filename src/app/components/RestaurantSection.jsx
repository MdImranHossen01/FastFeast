"use client";

import React, { useState, useEffect } from 'react';
import { FaUtensils, FaShippingFast, FaStar, FaHeart } from "react-icons/fa";
import Link from "next/link";
// We no longer need to import AOS here, but we keep the CSS import if it's not in a global stylesheet
import 'aos/dist/aos.css';

const RestaurantSection = () => {
  const [rotation, setRotation] = useState(0);

  // --- MODIFICATION ---
  // The useEffect for initializing AOS has been COMPLETELY REMOVED.
  // It is now handled globally by AOSProvider in layout.js.

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // ... the rest of your component logic remains exactly the same ...
  const features = [
    { icon: <FaUtensils />, label: "Fresh Food", color: 'from-orange-500 to-red-500', position: 0 },
    { icon: <FaShippingFast />, label: "Fast Delivery", color: 'from-emerald-500 to-teal-500', position: 90 },
    { icon: <FaStar />, label: "Top Rated", color: 'from-yellow-500 to-amber-500', position: 180 },
    { icon: <FaHeart />, label: "Quality Love", color: 'from-pink-500 to-rose-500', position: 270 },
  ];

  const shapes = [
    { icon: '🍕', color: 'text-orange-400', position: 30, size: 'text-lg' },
    { icon: '🍔', color: 'text-yellow-400', position: 100, size: 'text-sm' },
    { icon: '🥗', color: 'text-emerald-400', position: 150, size: 'text-lg' },
    { icon: '🍜', color: 'text-red-400', position: 210, size: 'text-sm' },
    { icon: '🍰', color: 'text-pink-400', position: 280, size: 'text-lg' },
  ];

  const getOrbitPosition = (angle, radius) => {
    const rad = (angle * Math.PI) / 180;
    return {
      x: Math.cos(rad) * radius,
      y: Math.sin(rad) * radius,
    };
  };

  return (
    <section className="w-full min-h-screen  md:h-screen">
      <div className="container px-4 mx-auto grid grid-cols-1 xl:grid-cols-2 text-gray-800 min-h-screen md:h-full items-center">
        <div 
          className="relative h-[600px] flex items-center justify-center" 
          data-aos="fade-right"
          data-aos-delay="100"
        >
          
          <div 
            className="absolute z-20 w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 
                      rounded-full flex flex-col items-center justify-center shadow-2xl" 
            data-aos="zoom-in" 
            data-aos-delay="300"
          >
            <FaUtensils className="text-white text-5xl mb-2" />
            <p className="text-white font-semibold text-sm">Food Hub</p>
          </div>

          <div 
            className="absolute w-[500px] h-[500px] border-2 border-dashed border-orange-300 rounded-full" 
            data-aos="zoom-out" 
            data-aos-delay="500"
          ></div>

          <div 
            className="absolute w-[320px] h-[320px] border-2 border-dashed border-emerald-300 rounded-full" 
            data-aos="zoom-out" 
            data-aos-delay="400"
          ></div>
           {features.map((item, index) => {
            const angle = rotation + item.position;
            const pos = getOrbitPosition(angle, 250);
            return (
              <div
                key={index}
                className={`absolute w-24 h-24 transform -translate-x-1/2 -translate-y-1/2 
                           transition-all duration-100 flex flex-col items-center justify-center`}
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full 
                                flex items-center justify-center text-white text-2xl shadow-xl 
                                hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <p className="text-gray-700 text-xs mt-2 font-medium">{item.label}</p>
              </div>
            );
          })}
          {shapes.map((shape, index) => {
            const angle = rotation * 1.5 + shape.position;
            const radius = index % 2 === 0 ? 160 : 260;
            const pos = getOrbitPosition(angle, radius);
            return (
              <div
                key={`shape-${index}`}
                className={`absolute ${shape.color} ${shape.size} transform -translate-x-1/2 
                         -translate-y-1/2 opacity-70 transition-all duration-100 hover:scale-125`}
                style={{
                  left: `calc(50% + ${pos.x}px)`,
                  top: `calc(50% + ${pos.y}px)`,
                }}
              >
                {shape.icon}
              </div>
            );
          })}
          <div 
            className="absolute w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse"
            data-aos="fade-in"
            data-aos-delay="600"
          ></div>
          <div 
            className="absolute w-60 h-60 bg-emerald-500/20 rounded-full blur-3xl animate-pulse delay-1000"
            data-aos="fade-in"
            data-aos-delay="700"
          ></div>
        </div>
        <div 
          className="flex flex-col justify-center p-6 sm:p-8 lg:p-20 text-left min-h-[50vh] md:min-h-0" 
          data-aos="fade-left"
          data-aos-delay="200"
        >
          <p 
            className="text-sm uppercase tracking-widest font-medium text-orange-600 mb-1"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            OUR COMMITMENT TO QUALITY
          </p>
          <h2 
            className="text-3xl text-gray-800 dark:text-gray-200 sm:text-4xl font-extrabold leading-tight mb-4 sm:mb-6"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Building Stronger <br className="hidden lg:inline" />
            <span className="text-orange-600">Community</span> Partnerships
          </h2>
          <p 
            className="text-base sm:text-lg leading-relaxed max-w-xl mb-6 sm:mb-10 text-gray-600 dark:text-gray-300"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Our success is built on collaboration. By partnering with local
            restaurants, ethical suppliers, and leading food nutritionists, we
            ensure every dish meets the highest standards of safety, quality,
            taste, and nutrition. We believe in transparent sourcing and
            supporting the communities that help bring the best food to you.
          </p>
          <Link href={"/restaurants"}>
            <button 
              className="relative py-3 sm:py-4 px-8 sm:px-10 overflow-hidden cursor-pointer font-bold text-orange-600 bg-white border-2 border-orange-600 rounded-lg shadow-lg hover:shadow-xl group transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-orange-600 group-hover:w-full ease"></span>
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-orange-600 group-hover:w-full ease"></span>
              <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-orange-600 group-hover:h-full ease"></span>
              <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-orange-600 group-hover:h-full ease"></span>
              <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-orange-600 opacity-0 group-hover:opacity-100"></span>
              <span className="relative transition-colors duration-300 delay-200 group-hover:text-white ease">
                BROWSE RESTAURANTS
              </span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RestaurantSection;