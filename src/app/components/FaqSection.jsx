"use client";

import { useState } from "react";

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
    <section className="bg-[#f5f5f5] py-16 px-4 md:px-16">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-700 mb-10 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-md overflow-hidden ${
                openIndex === index ? "bg-orange-100" : "bg-white"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left px-6 py-4 focus:outline-none flex justify-between items-center"
              >
                <span className="text-gray-700 font-medium">
                  {faq.question}
                </span>
                <span className="text-orange-600 text-xl">
                  {openIndex === index ? "−" : "+"}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 border-t border-gray-200 text-gray-700">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
