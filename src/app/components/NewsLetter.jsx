"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiMail, FiCheck, FiArrowRight } from "react-icons/fi";
import Image from "next/image";
import newsletterImage from "../../../public/newsLetter.jpg";

// --- Sub-component for Benefits ---
const BenefitItem = ({ children }) => (
  <div className="flex items-center gap-2">
    <FiCheck className="h-4 w-4 flex-shrink-0 text-green-500" />
    <span className="text-sm text-gray-600">{children}</span>
  </div>
);

// --- Sub-component for the Form ---
const SubscriptionForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // 'idle', 'loading', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulate API call
      setMessage("Success! Welcome to the club.");
      setStatus("success");
      setEmail("");
    } catch (error) {
      setMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-md">
        <FiMail className="h-5 w-5 text-gray-400 ml-2" />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-transparent p-2 text-gray-700 outline-none placeholder:text-gray-400"
          disabled={status === "loading"}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-orange-300"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Joining..." : "Join"}
          <FiArrowRight />
        </motion.button>
      </form>
      {message && (
        <p className={`mt-2 text-sm ${status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </>
  );
};

// --- Main Newsletter Component ---
export default function NewsletterSection() {
  return (
  
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 items-center gap-8 overflow-hidden rounded-2xl bg-orange-50 shadow-xl md:grid-cols-2"
        >
          
          <div className="relative h-64 w-full md:h-full">
            <Image
              src={newsletterImage}
              alt="A delicious assortment of food"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Gradient is now right-facing */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent md:bg-gradient-to-r"></div>
          </div>

          {/* Content Section (now on the right) */}
          <div className="p-8 md:p-12">
            <h2 className="text-3xl font-bold text-gray-800 md:text-4xl">
              Don't Miss a <span className="text-orange-500">Delicious</span> Bite!
            </h2>
            <p className="mt-4 text-gray-600">
              Join our foodie community for exclusive deals, new restaurant alerts, and weekly culinary inspiration delivered straight to your inbox.
            </p>
            <div className="my-8 grid grid-cols-2 gap-4">
              <BenefitItem>Exclusive Discounts</BenefitItem>
              <BenefitItem>New Restaurant Alerts</BenefitItem>
              <BenefitItem>Weekly Food Guides</BenefitItem>
              <BenefitItem>Insider Foodie News</BenefitItem>
            </div>
            <SubscriptionForm />
             <p className="mt-4 text-xs text-gray-500">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}