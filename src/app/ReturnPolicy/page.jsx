"use client";

import React from "react";

export default function ReturnPolicy({
  siteName = "FastFeast",
  effectiveDate = "October 16, 2025",
  contactEmail = "support@fastfeast.com",
}) {
  const sections = [
    {
      title: "1. Introduction",
      content: `At ${siteName}, we strive to provide high-quality products and a satisfying experience. Our Return Policy explains how you can return items, request refunds, and what conditions apply.`
    },
    {
      title: "2. Eligibility for Returns",
      content: `Items must be returned within 7 days of delivery unless specified otherwise. Products must be unused, unopened, and in their original packaging. Perishable items, customized products, or promotional items may not be eligible for return.`
    },
    {
      title: "3. How to Initiate a Return",
      content: `To request a return, contact our customer support via in-app chat or email at ${contactEmail}. Provide your order number and reason for return. Our support team will guide you through the return process.`
    },
    {
      title: "4. Refunds",
      content: `Refunds will be issued to the original payment method once the returned item is received and inspected. Processing time may vary between 5–10 business days depending on your bank or payment provider.`
    },
    {
      title: "5. Exchanges",
      content: `If an exchange is requested, a replacement will be shipped once the original item is returned and inspected. Additional charges may apply if the replacement item costs more.`
    },
    {
      title: "6. Damaged or Defective Items",
      content: `If you receive a damaged or defective item, contact us immediately. We may ask for photos of the item to verify the issue. Eligible items will be refunded or replaced at no extra cost.`
    },
    {
      title: "7. Non-Returnable Items",
      content: `Certain items cannot be returned: perishable goods, personalized items, gift cards, and items marked as final sale. Please check product descriptions for return eligibility.`
    },
    {
      title: "8. Contact Us",
      content: `For any questions regarding returns, refunds, or exchanges, reach out to our support team at ${contactEmail}. We are here to help and ensure a smooth return experience.`
    }
  ];

  return (
    <div className="min-h-screen text-gray-800">
      {/* Hero Section */}
      <div
        className="relative h-64 md:h-80 flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url("/hero-return.jpg")` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Return Policy
          </h1>
          <p className="text-white/90 text-sm md:text-base">
            Effective Date: {effectiveDate}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">{section.title}</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{section.content}</p>
            {idx < sections.length - 1 && <hr className="border-gray-200 mt-4 mb-6" />}
          </div>
        ))}
      </div>
    </div>
  );
}
