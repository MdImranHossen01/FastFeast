"use client";

import { useState } from "react";
import Lottie from "lottie-react";
import faqAnimation from "../../assets/faq-animation.json";
import { IoChevronForward } from "react-icons/io5";

const faqs = [
  {
    question: "How fast is the delivery?",
    answer:
      "Our goal is to get your food to you as quickly as possible. Average delivery times in your area are displayed for each restaurant before you order, typically ranging from 25-45 minutes.",
  },
  {
    question: "How can I place an order?",
    answer:
      "You can place an order through our website or mobile app. Simply browse restaurants, choose your meal, add it to the cart, and proceed to checkout.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards, mobile banking services like bKash and Nagad, and also offer Cash on Delivery (COD) in most areas.",
  },
  {
    question: "Can I track my order in real-time?",
    answer:
      "Absolutely! Once your order is confirmed and a rider is assigned, you'll receive a live tracking link to monitor your delivery's progress on a map until it reaches your doorstep.",
  },
  {
    question: "What if there's an issue with my order?",
    answer:
      "We're here to help! You can contact our customer support team directly through the app's help section. We'll work to resolve any issues with your order as quickly as possible.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    // ✅ Changed background color here
    <section className="bg-orange-50 pb-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-4xl font-bold text-gray-800">
            Still Have <span className="text-orange-500">Questions?</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Find answers to common questions about orders, payments, and our
            services. We're here to make your experience seamless.
          </p>
        </div>

        {/* ✅ Swapped the order of the two columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Accordion Section */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <button
                  className="w-full flex justify-between items-center p-5 text-left font-medium text-gray-800"
                  onClick={() => toggleFAQ(index)}
                >
                  <span
                    className={`text-lg ${
                      openIndex === index ? "text-orange-500" : ""
                    }`}
                  >
                    {faq.question}
                  </span>
                  <IoChevronForward
                    className={`h-5 w-5 text-gray-500 transition-transform duration-300 ${
                      openIndex === index ? "rotate-90" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-5 pb-5 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Lottie Animation Section (now on the right) */}
          <div className="hidden lg:block">
            <Lottie animationData={faqAnimation} loop={true} />
          </div>
        </div>
      </div>
    </section>
  );
}
