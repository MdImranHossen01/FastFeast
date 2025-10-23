"use client";

import React from "react";
import heroImg from "../../../public/hero-terms.jpg";

export default function TermsAndConditions({
  siteName = "FastFeast",
  effectiveDate = "October 16, 2025",
  contactEmail = "support@fastfeast.com",
}) {
  const sections = [
    {
      title: "1. Use of the Platform and Account",
      content: `By using ${siteName}, you agree to comply with all applicable laws and our platform rules. You must be at least 18 years old or have parental/guardian consent to create an account and place orders. You are responsible for all activities under your account, including transactions and communications. Any misuse of your account may result in suspension or termination.`,
    },
    {
      title: "2. Restrictions",
      content: `You may not use ${siteName} for illegal, fraudulent, or unauthorized purposes. This includes impersonation, creating fake accounts, or attempting to disrupt our systems. Automated scripts, bots, or sharing your account credentials are strictly prohibited. Violations may result in suspension or legal action.`,
    },
    {
      title: "3. Intellectual Property",
      content: `All logos, text, graphics, and software displayed on ${siteName} are owned or licensed by us. You may not copy, modify, or distribute any content for commercial use without our written permission. Respecting intellectual property helps maintain fairness for vendors, users, and our platform.`,
    },
    {
      title: "4. Orders, Prices, and Payments",
      content: `All orders are subject to vendor confirmation. Prices shown on ${siteName} may vary depending on your location, promotions, or demand. Payments must be completed through our secure, approved methods. In case of payment issues, contact our support team promptly for help or possible refunds.`,
    },
    {
      title: "5. Delivery, Pick-Up, and Vendor Delivery",
      content: `Estimated delivery times are provided for convenience and may vary due to vendor preparation, weather, or traffic conditions. ${siteName} is not liable for delays caused by vendors or third-party delivery partners. Delivery times are indicative and not guaranteed.`,
    },
    {
      title: "6. Vouchers, Discounts, and Promotions",
      content: `Promotional codes, vouchers, and discounts are subject to specific terms such as validity, expiry, and minimum order requirements. ${siteName} reserves the right to modify or cancel promotions at any time. Abuse of offers may lead to suspension or removal of benefits.`,
    },
    {
      title: "7. Representations, Warranties, and Limitation of Liability",
      content: `${siteName} provides its services “as is,” without warranties of merchantability or fitness for a particular purpose. We are not liable for indirect, incidental, or consequential damages. Our total liability, in any case, will not exceed the amount paid for the affected order.`,
    },
    {
      title: "8. Vendor Liability",
      content: `Vendors listed on ${siteName} are independent businesses responsible for preparing and delivering your orders. ${siteName} is not responsible for incorrect, delayed, or missing items caused by vendors. Any disputes should be reported through the platform for mediation.`,
    },
    {
      title: "9. Personal Data and Privacy",
      content: `${siteName} collects and processes personal data such as name, contact information, and order history to provide and improve our services. We handle all data according to our Privacy Policy and never share personal information without your consent, unless required by law.`,
    },
    {
      title: "10. Indemnity",
      content: `You agree to indemnify and hold harmless ${siteName}, its partners, employees, and affiliates from any claims, damages, or expenses arising out of your use of the platform, violation of terms, or infringement of third-party rights.`,
    },
    {
      title: "11. Rider Tips, Priority Delivery, and Dynamic Pricing",
      content: `Tips for delivery partners are optional and at your discretion. Priority delivery or surge pricing may apply during peak times based on demand, distance, and vendor capacity. ${siteName} may adjust delivery or service fees dynamically for optimal user experience.`,
    },
    {
      title: "12. Third-Party Links",
      content: `Our platform may include links to third-party websites. ${siteName} does not control or endorse their content or privacy practices. Users are encouraged to review those websites’ terms before engaging with them.`,
    },
    {
      title: "13. Contact Us",
      content: `For questions or concerns about these terms and conditions, please reach out to our support team at ${contactEmail}. We are here to assist with order issues, clarifications, or disputes regarding your account or transactions.`,
    },
  ];

  return (
    <div className="min-h-screen text-gray-800">
      {/* Hero Section */}
      <div
        className="relative h-64 md:h-80 flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg.src})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Terms & Conditions
          </h1>
          <p className="text-white/90 text-sm md:text-base">
            Effective Date: {effectiveDate}
          </p>
        </div>
      </div>

      {/* Terms Content */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-12">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="bg-white/80 shadow-sm rounded-2xl p-6 hover:shadow-md transition-shadow"
          >
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">
              {section.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </div>
        ))}
      </div>

     
    </div>
  );
}
