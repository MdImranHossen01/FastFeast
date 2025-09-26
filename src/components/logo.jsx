"use client"
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion"; // For a polished hover effect

// Define size configurations for easier management
const sizeStyles = {
  sm: {
    image: "w-10",
    text: "text-xl",
  },
  md: {
    image: "w-14",
    text: "text-2xl lg:text-3xl",
  },
  lg: {
    image: "w-16",
    text: "text-4xl lg:text-5xl",
  },
};

// The component now accepts props for size, theme, and custom styling
export default function Logo({ size = 'md', theme = 'light', className = '' }) {
  const styles = sizeStyles[size] || sizeStyles.md;

  return (
    <Link href={"/"} className={`flex items-center gap-2 ${className}`}>
      <motion.div whileHover={{ rotate: 15 }}>
        <Image
          src="/fastFeastLogo.png"
          width={70}
          height={70}
          alt="FastFeast logo"
          priority
          className={`h-auto ${styles.image}`} // Dynamic image size
        />
      </motion.div>

      <div className={`${styles.text} font-bold`}>
        {/* Intelligently switch text style based on the theme prop */}
        {theme === 'light' ? (
          <h1 className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
            FastFeast
          </h1>
        ) : (
          <h1 className="text-gray-100">FastFeast</h1>
        )}
      </div>
    </Link>
  );
}