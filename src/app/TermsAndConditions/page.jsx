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
      content: `By using ${siteName}, you agree to comply with all applicable laws and our platform rules. You must be at least 18 years old or have parental/guardian consent to create an account and place orders. You are responsible for all activity under your account, including any transactions or communications. Misuse of your account may result in suspension or termination.`
    },
    {
      title: "2. Restrictions",
      content: `You may not use ${siteName} for any illegal or unauthorized purposes. This includes fraudulent orders, impersonation, or attempting to interfere with platform operations. Automated scripts, bots, or sharing your account credentials with others is strictly prohibited. Any violation may result in account suspension or legal action.`
    },
    {
      title: "3. Intellectual Property",
      content: `All content on ${siteName}, including logos, text, images, and software, is owned or licensed by us. You may not copy, reproduce, distribute, or use it for commercial purposes without our written permission. This ensures that our vendors, partners, and platform maintain their rights and integrity.`
    },
    {
      title: "4. Orders, Prices, and Payments",
      content: `All orders are subject to vendor confirmation. Prices displayed on the platform may vary due to location, demand, or promotions. Payment must be completed using our approved payment methods. In case of any payment issues, please contact our support team immediately for assistance or a possible refund.`
    },
    {
      title: "5. Delivery, Pick-Up, and Vendor Delivery",
      content: `Estimated delivery times are provided for convenience and may vary depending on vendor processing, traffic, or weather conditions. ${siteName} is not responsible for delays caused by vendors or third-party delivery partners. You may choose pick-up where available. Delivery times are estimates only and are not guaranteed.`
    },
    {
      title: "6. Vouchers, Discounts, and Promotions",
      content: `Promotional codes, vouchers, and discounts are subject to specific terms, including validity, expiration, and minimum order requirements. ${siteName} reserves the right to modify or cancel any promotion at any time. Abuse of promotional offers may result in account suspension or revocation of benefits.`
    },
    {
      title: "7. Representations, Warranties, and Limitation of Liability",
      content: `${siteName} provides the platform “as is” without any warranty of merchantability or fitness for a particular purpose. We are not responsible for indirect, incidental, or consequential damages. Maximum liability is limited to the amount paid for the affected order. This limitation applies to all claims, whether in contract, tort, or otherwise.`
    },
    {
      title: "8. Vendor Liability",
      content: `Vendors listed on ${siteName} are independent entities responsible for preparing and delivering your orders. ${siteName} is not liable for incorrect, missing, or delayed items caused by vendors. Any disputes with vendors should be reported through the platform so we can mediate if necessary.`
    },
    {
      title: "9. Personal Data (Information) Protection",
      content: `We collect and use personal information to process orders, manage accounts, and improve our services. This includes your name, contact details, payment information, and order history. All data is stored securely and handled according to our Privacy Policy. We never share personal data without your consent, except when required by law.`
    },
    {
      title: "10. Indemnity",
      content: `You agree to indemnify and hold harmless ${siteName}, its affiliates, and partners against any claims, damages, losses, or expenses arising from your use of the platform, violation of these terms, or infringement of any third-party rights.`
    },
    {
      title: "11. Rider Tip, Priority Delivery, Variable Pricing",
      content: `Optional rider tips are entirely at your discretion. Priority delivery and variable pricing may apply based on order size, distance, demand, and vendor availability. ${siteName} reserves the right to adjust fees dynamically to ensure fair pricing and efficient service.`
    },
    {
      title: "12. Other Websites",
      content: `Our platform may contain links to third-party websites. ${siteName} is not responsible for the content, privacy practices, or terms of use of these external sites. We encourage you to read their terms and policies before interacting with them.`
    },
    {
      title: "Contact Us",
      content: `If you have any questions regarding these terms and conditions, please contact our support team at ${contactEmail}. We are available to assist you with any concerns, clarifications, or disputes regarding your account, orders, or the platform.`
    }
  ];

  return (
    <div className="min-h-screen text-gray-800">
      {/* Hero Section */}
      <div
        className="relative h-64 md:h-80 flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg.src})` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Terms & Conditions
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
