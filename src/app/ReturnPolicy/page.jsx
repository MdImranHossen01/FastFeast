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
      content: `At ${siteName}, we are committed to ensuring that every customer has a satisfying experience with our products and services. Our Return Policy outlines the procedures, eligibility criteria, and timelines for returning items. This policy is designed to be fair and transparent, ensuring that customers can confidently make purchases while understanding their rights and responsibilities. All returns are subject to these terms, and we encourage customers to read this policy carefully before initiating any return or exchange request.`
    },
    {
      title: "2. Eligibility for Returns",
      content: `Items are eligible for return within 7 days of delivery, unless otherwise specified. Products must be unused, unopened, and in their original packaging to qualify for a return. Certain items, such as perishable goods, personalized products, and promotional items, may not be eligible for return. Customers are responsible for verifying the return eligibility of items before requesting a return. We reserve the right to refuse returns that do not meet these criteria.`
    },
    {
      title: "3. How to Initiate a Return",
      content: `To initiate a return, customers should contact our support team via the in-app chat or email at ${contactEmail}. When submitting a return request, please provide your order number, the item(s) you wish to return, and the reason for return. Our support team will provide detailed instructions for returning the item, including packaging requirements and any shipping labels or documents necessary to complete the process. Following the proper procedure ensures faster processing of returns and refunds.`
    },
    {
      title: "4. Refunds",
      content: `Once a returned item is received and inspected by our team, refunds will be processed to the original payment method used for the purchase. The processing time for refunds may vary depending on your bank or payment provider and typically takes 5–10 business days. Any delays caused by the financial institution are outside our control. Refunds will include the original purchase amount, but shipping or handling fees may not be refundable, as outlined in our policy.`
    },
    {
      title: "5. Exchanges",
      content: `Customers requesting an exchange will have a replacement item shipped once the original item is returned and inspected. If the replacement item has a higher value than the returned item, additional charges may apply, and customers will be notified prior to shipment. Exchanges are subject to stock availability, and in some cases, an exact replacement may not be possible. Our team will provide alternative solutions or options if an exact exchange cannot be fulfilled.`
    },
    {
      title: "6. Damaged or Defective Items",
      content: `If you receive an item that is damaged or defective, contact our support team immediately. Photos or other documentation of the issue may be requested to verify the claim. Eligible items will either be replaced or refunded at no additional cost to the customer. Prompt reporting helps us resolve the issue efficiently and ensures that customers are not inconvenienced by receiving substandard products.`
    },
    {
      title: "7. Non-Returnable Items",
      content: `Certain items cannot be returned under any circumstances, including perishable goods, personalized products, gift cards, and items explicitly marked as final sale. Customers should review the product descriptions and return eligibility notes carefully before purchasing such items. Any attempt to return non-returnable items will be denied.`
    },
    {
      title: "8. Contact Us",
      content: `For any questions or concerns regarding returns, exchanges, or refunds, please contact our support team at ${contactEmail}. Our team is available to assist with clarifications, provide guidance on the return process, and ensure a smooth and satisfactory resolution for all return-related inquiries. We value our customers and strive to make the return experience as seamless as possible.`
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

      {/* Content Section - long paragraphs */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">{section.title}</h2>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
