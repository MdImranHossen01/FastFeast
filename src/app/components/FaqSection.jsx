"use client";

import { useState } from "react";
import Lottie from "lottie-react";
import faqAnimation from "../../assets/faq-animation.json";

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
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 lg:py-12">
      <div className="transition-all">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto text-gray-900 mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-gray-600">
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
                className="border border-base-300 rounded-xl overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <button
                  className="w-full flex justify-between items-center p-5 text-lg font-medium text-gray-700 hover:text-orange-800 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <span>{faq.question}</span>
                  <span className="text-orange-500 text-2xl font-bold">
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                <div
                  className={`px-5 pb-5 text-gray-700 transition-all duration-300 ${
                    openIndex === index
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <p>{faq.answer}</p>
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
