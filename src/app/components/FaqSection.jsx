"use client";

import { useState } from "react";
import { IoChevronForward } from "react-icons/io5";
import Image from "next/image";

const faqs = [
  {
    question: "How fast is the delivery?",
    answer:
      "Average delivery times in your area are displayed for each restaurant before you order, typically ranging from 25-45 minutes.",
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
  // Set the first item (index 0) to be open by default
  const [openIndex, setOpenIndex] = useState(0); 

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-orange-600 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Accordion Section (Left Column) */}
          <div className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mb-6">
              Frequently Asked Questions
            </h2>
            
            {/* FAQ List Container */}
            <div className="space-y-2"> 
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="transition-all duration-300 hover:shadow-md  rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full flex justify-between items-center p-4 sm:p-5 text-left font-medium text-white"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span
                      className={`text-base sm:text-lg ${
                        openIndex === index ? "text-white" : ""
                      }`}
                    >
                      {faq.question}
                    </span>
                    <IoChevronForward
                      className={`h-5 w-5 text-white transition-transform duration-300 ${
                        openIndex === index ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                      openIndex === index ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-white text-sm sm:text-base">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Image - Responsive for mobile and desktop */}
          <div className="relative h-64 md:h-96 lg:h-[500px] w-full rounded-lg overflow-hidden shadow-xl"> 
            <Image
              src="https://i.ibb.co.com/jZ5HNJ7s/FAQ-in-orange-for-food-quary-in-a-website-faq-section-1.jpg"
              alt="FAQ Illustration"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}