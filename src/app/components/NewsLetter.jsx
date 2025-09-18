"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import StickyBox from "react-sticky-box";

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
    <section className="relative h-[500px] bg-gray-50 overflow-hidden lg:my-22">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/NewsLetter.jpg"
          alt="Food background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Tall section for scroll */}
      <div className="relative h-[75vh] flex justify-center">
        <StickyBox
          offsetTop={0}
          offsetBottom={0}
          className="flex items-center justify-center w-full"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="z-10 bg-white/80 backdrop-blur-md shadow-xl rounded-2xl 
                       p-6 sm:p-10 w-[90%] sm:w-[80%] md:w-[500px] text-center"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Join Our Newsletter
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Get the latest food delivery updates, offers, and tasty blogs straight
              to your inbox!
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 
                           focus:outline-none focus:ring-2 focus:ring-orange-500 
                           text-sm sm:text-base"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-orange-500 text-white 
                           font-medium hover:bg-orange-600 transition 
                           text-sm sm:text-base"
              >
                Subscribe
              </button>
            </form>

            {message && (
              <p className="text-sm mt-4 text-gray-700 font-medium">{message}</p>
            )}

            <p className="text-xs sm:text-sm text-gray-500 mt-2">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </motion.div>
        </StickyBox>
      </div>
    </section>
  );
}

