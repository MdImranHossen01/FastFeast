"use client";

import { useState } from "react";
import Lottie from "lottie-react";
import faqAnimation from "../../assets/faq-animation.json"; // Replace with your actual animation path

const faqs = [
  {
    question: "What is Fast Feast?",
    answer:
      "Fast Feast is a fast food delivery service that brings your favorite meals right to your doorstep within minutes.",
  },
  {
    question: "How can I place an order?",
    answer:
      "You can place an order through our website or mobile app. Choose your meal, add to cart, and checkout.",
  },
  {
    question: "Do you offer contactless delivery?",
    answer:
      "Yes, we offer contactless delivery to ensure the safety of both our customers and delivery personnel.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept credit/debit cards, mobile wallets, and cash on delivery in selected areas.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Absolutely! Once your order is confirmed, you will receive a live tracking link to monitor your order status.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0); // Set first item open by default

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-base-100 transition-colors bg-gradient-to-br from-orange-50 to-amber-100 duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions about our food delivery service? We've got answers. 
            Here are some of the most common queries from our customers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Accordion Section */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`collapse collapse-arrow bg-base-200 dark:bg-base-300 border border-base-300 dark:border-base-200 transition-colors duration-300 ${
                  openIndex === index ? "collapse-open" : "collapse-close"
                }`}
              >
                <input
                  type="radio"
                  name="faq-accordion"
                  checked={openIndex === index}
                  onChange={() => toggleFAQ(index)}
                />
                <div className="collapse-title text-xl font-medium text-gray-800 dark:text-gray-100">
                  {faq.question}
                </div>
                <div className="collapse-content">
                  <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Lottie Animation Section */}
          <div className="hidden lg:block">
            <Lottie animationData={faqAnimation} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
