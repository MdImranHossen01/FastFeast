"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMessage("⚠️ Please enter an email.");
      return;
    }
    setMessage("✅ Subscribed successfully!");
    setEmail("");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/NewsLetter.jpg"
          alt="Food background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl p-6 sm:p-10 w-[90%] sm:w-[80%] md:w-[500px] text-center"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
          Join Our Newsletter
        </h1>
        <p className="text-sm sm:text-base text-gray-600 mb-6">
          Get the latest food delivery updates, offers, and tasty blogs straight
          to your inbox!
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm sm:text-base"
          />
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-orange-500 text-white font-medium hover:bg-orange-600 transition text-sm sm:text-base"
          >
            Subscribe
          </button>
        </form>

        {/* Message */}
        {message && (
          <p className="text-sm mt-4 text-gray-700 font-medium">{message}</p>
        )}

        {/* Small note */}
        <p className="text-xs sm:text-sm text-gray-500 mt-2">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </motion.div>
    </div>
  );
}
