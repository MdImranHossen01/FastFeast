"use client";

import React, { useEffect, useRef, useState } from "react";

const Slider = () => {
  // Image URLs provided by the user
  const boxImage1 = "https://i.ibb.co.com/9mDxq7HD/animate-Briyani.png";
  const boxImage2 = "https://i.ibb.co.com/pBMsPFLq/box.png";
  const boxImage3 = "https://i.ibb.co.com/GbCmsrR/box-1.png";

  // State to control visibility cycle
  const [visibleBoxes, setVisibleBoxes] = useState([true, true, true]);

  // Refs for animation
  const box1Ref = useRef(null);
  const box2Ref = useRef(null);
  const box3Ref = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.3,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0");
          entry.target.classList.add("opacity-100");
        }
      });
    }, observerOptions);

    if (box1Ref.current) observer.observe(box1Ref.current);
    if (box2Ref.current) observer.observe(box2Ref.current);
    if (box3Ref.current) observer.observe(box3Ref.current);

    return () => {
      if (box1Ref.current) observer.unobserve(box1Ref.current);
      if (box2Ref.current) observer.unobserve(box2Ref.current);
      if (box3Ref.current) observer.unobserve(box3Ref.current);
    };
  }, []);

  // Animation cycle effect
  useEffect(() => {
    const cycleAnimations = () => {
      // All boxes visible for 5 seconds
      setTimeout(() => {
        setVisibleBoxes([false, true, true]);

        // Box 1 reappears after 2 seconds
        setTimeout(() => {
          setVisibleBoxes([true, true, true]);

          // All boxes visible for 5 seconds
          setTimeout(() => {
            setVisibleBoxes([true, false, true]);

            // Box 2 reappears after 2 seconds
            setTimeout(() => {
              setVisibleBoxes([true, true, true]);

              // All boxes visible for 5 seconds
              setTimeout(() => {
                setVisibleBoxes([true, true, false]);

                // Box 3 reappears after 2 seconds
                setTimeout(() => {
                  setVisibleBoxes([true, true, true]);

                  // Restart the cycle
                  setTimeout(cycleAnimations, 5000);
                }, 2000);
              }, 5000);
            }, 2000);
          }, 5000);
        }, 2000);
      }, 5000);
    };

    // Start the cycle
    const startCycle = setTimeout(cycleAnimations, 5000);

    return () => {
      clearTimeout(startCycle);
    };
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#fffcf5] p-4 sm:p-8 lg:p-12 relative overflow-hidden border border-dashed border-[#ffedd5]">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-y-0 right-0 w-1/2 h-full bg-gradient-to-tr from-[#ff8a5c] to-[#ffa500] opacity-70 transform skew-x-12 origin-right pointer-events-none hidden md:block"></div>
      <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#ff6b6b] to-[#ff8e6e] rounded-full opacity-60 filter blur-3xl pointer-events-none"></div>
      <div className="absolute top-10 left-10 w-16 h-16 bg-red-400 rounded-full opacity-70 filter blur-xl pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-orange-400 rounded-full opacity-80 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-12 h-12 bg-red-500 rounded-full opacity-70 filter blur-sm pointer-events-none"></div>

      {/* Container for the content */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between h-full relative z-10">
        {/* Text Content Block */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left py-12 md:py-0">
          {/* Logo/Brand Name */}
          <div className="flex items-center justify-center md:justify-start mb-4">
            <svg
              className="w-6 h-6 text-orange-600 mr-2 transform -rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              ></path>
            </svg>
            <p className="text-xl font-semibold text-gray-800">FastFeast</p>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#333] leading-tight mb-6">
            About Us
          </h1>

          {/* About Us Description */}
          <p className="text-lg text-gray-600 max-w-lg mx-auto md:mx-0 mb-8">
            FastFeast provides a fast, reliable, tech-driven food delivery service. We ensure
            seamless food delivery with optimized routes and a strong logistics
            network.
          </p>

          {/* Key Facts Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Key Facts About FastFeast:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 max-w-md mx-auto md:mx-0 text-left">
              <div className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-gray-700 font-medium">
                  Efficient & Fast
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-gray-700 font-medium">
                  Customer-Focused
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-gray-700 font-medium">
                  Smart Technology
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <svg
                  className="w-6 h-6 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-gray-700 font-medium">Wide Coverage</span>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Animated Boxes Section - PERFECT SPACING */}
        <div className="md:w-1/2 flex justify-center items-center h-[500px] relative">
          {/* Box 1 - Far Left Position */}
          <div
            ref={box1Ref}
            className={`absolute w-48 md:w-56 top-1/2 left-8 transform -translate-y-1/2 opacity-0 transition-all duration-1000 ease-in-out ${
              visibleBoxes[0] ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{ zIndex: 30 }}
          >
            <img
              src={boxImage1}
              alt="Large Delivery Box"
              className="w-full h-auto object-contain animate-float-main"
            />
          </div>

          {/* Box 2 - Top Center Position */}
          <div
            ref={box2Ref}
            className={`absolute w-20 md:w-24 top-16 right-1/3 transform translate-x-1/2 opacity-0 transition-all duration-1000 ease-in-out delay-200 ${
              visibleBoxes[1] ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{ zIndex: 20 }}
          >
            <img
              src={boxImage2}
              alt="Small Delivery Box"
              className="w-full h-auto object-contain animate-float-secondary"
            />
          </div>

          {/* Box 3 - Bottom Right Position */}
          <div
            ref={box3Ref}
            className={`absolute w-32 md:w-36 bottom-16 right-8 opacity-0 transition-all duration-1000 ease-in-out delay-400 ${
              visibleBoxes[2] ? "opacity-100 scale-100" : "opacity-0 scale-90"
            }`}
            style={{ zIndex: 10 }}
          >
            <img
              src={boxImage3}
              alt="Medium Delivery Box"
              className="w-full h-auto object-contain animate-float-tertiary"
            />
          </div>
        </div>
      </div>

    

     

      {/* Custom CSS for Continuous Animations */}
      <style jsx>{`
        @keyframes floatMain {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-12px) rotate(0.5deg);
          }
          66% {
            transform: translateY(-6px) rotate(-0.5deg);
          }
        }

        @keyframes floatSecondary {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(1deg);
          }
        }

        @keyframes floatTertiary {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-8px) rotate(-0.5deg);
          }
          75% {
            transform: translateY(-4px) rotate(0.5deg);
          }
        }

        .animate-float-main {
          animation: floatMain 6s ease-in-out infinite;
        }

        .animate-float-secondary {
          animation: floatSecondary 5s ease-in-out infinite;
        }

        .animate-float-tertiary {
          animation: floatTertiary 7s ease-in-out infinite;
        }

        /* Ensure no overlap with proper positioning */
        .animate-float-main,
        .animate-float-secondary,
        .animate-float-tertiary {
          transform-origin: center;
        }
      `}</style>
    </div>
  );
};

export default Slider;
