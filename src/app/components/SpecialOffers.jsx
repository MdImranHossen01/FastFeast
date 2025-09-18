"use client";

import React, { useState } from "react";
import { FiCopy } from "react-icons/fi";

export default function SpecialOffers() {
  const [copied, setCopied] = useState("");

  const offers = [
    {
      id: 1,
      title: "Flat 20% OFF",
      desc: "Use code WELCOME20 on your first order.",
      code: "WELCOME20",
      bg: "bg-gradient-to-r from-pink-500 to-red-500",
    },
    {
      id: 2,
      title: "Buy 1 Get 1 Free",
      desc: "On selected burgers & pizzas.",
      code: "B1G1",
      bg: "bg-gradient-to-r from-yellow-400 to-orange-500",
    },
    {
      id: 3,
      title: "Free Delivery",
      desc: "Enjoy free delivery on orders above ৳500.",
      code: "FASTDELIVERY",
      bg: "bg-gradient-to-r from-green-400 to-emerald-600",
    },
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(""), 2000);
  };

  return (
    <section className="py-12 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-8">
        Special Offers & Discounts
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className={`${offer.bg} text-white shadow-xl rounded-2xl p-6 flex flex-col justify-between h-48`}
          >
            <div>
              <h3 className="text-2xl font-semibold mb-2">{offer.title}</h3>
              <p>{offer.desc}</p>
            </div>
            <div className="flex items-center justify-between mt-4">
              <span className="bg-white text-black px-3 py-1 rounded-md font-mono">
                {offer.code}
              </span>
              <button
                className="bg-white text-black px-3 py-1 rounded-md flex items-center gap-1 text-sm"
                onClick={() => handleCopy(offer.code)}
              >
                <FiCopy className="w-4 h-4" />
                {copied === offer.code ? "Copied!" : "Copy"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
