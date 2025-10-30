// components/MarqueeSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Star,
  Users,
  FileText,
  Briefcase,
  TrendingUp,
  Award,
  Zap,
  Shield,
  Sparkles,
  Clock,
  Heart,
} from "lucide-react";

// Stats Data - Updated to match food delivery theme
const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Happy Customers",
    color: "text-orange-500",
  },
  {
    icon: FileText,
    value: "100K+",
    label: "Orders Delivered",
    color: "text-emerald-500",
  },
  {
    icon: Briefcase,
    value: "500+",
    label: "Restaurant Partners",
    color: "text-orange-600",
  },
  {
    icon: Star,
    value: "4.9/5",
    label: "Customer Rating",
    color: "text-yellow-500",
  },
  {
    icon: Clock,
    value: "25min",
    label: "Avg Delivery Time",
    color: "text-blue-500",
  },
  {
    icon: Heart,
    value: "98%",
    label: "Satisfaction Rate",
    color: "text-pink-500",
  },
];

// Features Data - Updated for food delivery
const features = [
  {
    icon: Zap,
    text: "Lightning Fast Delivery",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Shield,
    text: "Food Safety Guaranteed",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Sparkles,
    text: "Fresh Ingredients",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: CheckCircle,
    text: "24/7 Support",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: TrendingUp,
    text: "Best Price Guarantee",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Award,
    text: "Quality Certified",
    gradient: "from-amber-500 to-orange-500",
  },
];

// Cities Data - Updated with proper spelling
const cities = [
  "Dhaka",
  "Barishal",
  "Rangpur",
  "Chattogram",
  "Sylhet",
  "Rajshahi",
  "Khulna",
  "Mymensingh",
  "Cumilla",
  "Noakhali",
  "Jashore",
  "Faridpur",
];

const MarqueeSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image Container - Only for this section */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('https://i.ibb.co.com/q3fyWc1B/eating-in-restaurant.jpg')",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>

          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-emerald-500/5"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 py-20 space-y-20">
        {/* Section 1: Stats Marquee */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Serving <span className="text-orange-400">Bangladesh</span> with
              Excellence
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust us for their daily
              meals
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-emerald-500 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <div className="relative overflow-hidden py-8">
            {/* Gradient overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent via-black/50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-transparent via-black/50 to-transparent z-10"></div>

            {/* Stats marquee - left to right */}
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -1920],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {[...stats, ...stats].map((stat, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-white/20 hover:border-orange-300 transition-all duration-300 hover:shadow-xl hover:scale-105 min-w-[240px] group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${
                        stat.color.includes("orange")
                          ? "from-orange-100 to-orange-200"
                          : stat.color.includes("emerald")
                          ? "from-emerald-100 to-emerald-200"
                          : stat.color.includes("yellow")
                          ? "from-yellow-100 to-yellow-200"
                          : stat.color.includes("blue")
                          ? "from-blue-100 to-blue-200"
                          : "from-pink-100 to-pink-200"
                      } flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}
                    >
                      <stat.icon className={`w-7 h-7 ${stat.color}`} />
                    </div>
                    <div>
                      <div
                        className="text-2xl font-extrabold text-gray-900"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {stat.value}
                      </div>
                      <div
                        className="text-sm font-medium text-gray-600"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {stat.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Section 2: Features Marquee - Left to Right */}
        {/* Section 2: Features Marquee - Left to Right */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Why Choose <span className="text-emerald-400">Us</span>?
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-orange-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="relative overflow-hidden py-8">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-black/50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-transparent via-black/50 to-transparent z-10"></div>

            {/* Features marquee - left to right (corrected) */}
            <motion.div
              className="flex gap-6"
              animate={{
                x: [-1440, 0],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 25,
                  ease: "linear",
                },
              }}
            >
              {[...features, ...features].map((feature, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-2xl border border-white/20 hover:shadow-lg transition-all duration-300 min-w-[280px] group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.gradient} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                    >
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <span
                      className="font-semibold text-gray-800 text-lg"
                      style={{ fontFamily: "Inter, sans-serif" }}
                    >
                      {feature.text}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Section 3: Cities Coverage - Right to Left */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Serving Across <span className="text-orange-400">Bangladesh</span>
            </h2>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Delivering delicious meals to every corner of the country
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-emerald-500 mx-auto rounded-full mt-4"></div>
          </motion.div>

          <div className="relative overflow-hidden py-8">
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-transparent via-black/50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-transparent via-black/50 to-transparent z-10"></div>

            {/* Cities marquee - right to left */}
            <motion.div
              className="flex gap-12"
              animate={{
                x: [0, -1200],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {[...cities, ...cities, ...cities].map((city, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 flex items-center gap-3 text-2xl md:text-4xl font-bold text-white hover:text-orange-400 transition-colors duration-300 whitespace-nowrap group"
                  style={{ fontFamily: "Inter, sans-serif" }}
                >
                  <div className="w-2 h-2 bg-emerald-400 rounded-full group-hover:bg-orange-400 transition-colors"></div>
                  {city}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeSection;
