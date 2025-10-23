"use client";

import React from "react";
import heroImg from "../../../public/hero-privacy.jpg";

export default function PrivacyPolicy({
  siteName = "FastFeast",
  effectiveDate = "October 16, 2025",
  contactEmail = "support@fastfeast.com",
}) {
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
            Privacy Policy
          </h1>
          <p className="text-white/90 text-sm md:text-base">
            Effective Date: {effectiveDate}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        {/* Information Collection */}
        <p className="text-gray-700 font-semibold text-lg">
          Information We Collect
        </p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          We collect <span className="font-semibold">personal information</span> from you when 
          you place an order, create an account, or participate in a customer survey. 
          We may also collect technical data such as browser type, device information, 
          and website usage details through <span className="font-semibold">cookies</span> 
          to improve your browsing experience.
        </p>

        {/* Cookies & Analytics */}
        <p className="text-gray-700 font-semibold text-lg">Cookies and Google Analytics</p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          <span className="font-semibold">Cookies</span> are small text files stored on your 
          device by websites you visit. They help improve site functionality and provide 
          valuable insights for optimization.
        </p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          Our website uses <span className="font-semibold text-blue-600">Google Analytics</span>, 
          a web analytics service provided by Google. This tool helps us understand how users 
          interact with our platform. Google Analytics may collect information such as your 
          IP address and browsing activity, which can be stored on servers in the United States. 
          You can disable cookies in your browser settings, but certain features of the site may 
          not function properly as a result.
        </p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          To learn more about cookies and how to manage them, visit{" "}
          <span className="text-blue-800">www.allaboutcookies.org</span>.
        </p>

        {/* Use of Information */}
        <p className="text-gray-700 font-semibold text-lg">
          How We Use Your Information
        </p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          The information we collect is used to process your orders, manage your account, 
          and personalize your experience. We may also contact you about new products, 
          special offers, or updates related to our services. 
          In some cases, your information may be shared with trusted third parties such as{" "}
          <span className="font-semibold">payment processors</span> and{" "}
          <span className="font-semibold">fraud prevention agencies</span> to ensure 
          safe and secure transactions.
        </p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          If you do not wish to receive promotional communications, you can easily 
          opt out through our <span className="font-semibold">in-app customer support chat</span>.
        </p>

        {/* Access to Data */}
        <p className="text-gray-700 font-semibold text-lg">Access to Your Data</p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          You have the right to request access to the personal information we hold about you. 
          Contact us through our support channel, and we will provide the details in 
          accordance with applicable data protection laws. 
          A small administrative fee may apply for repeated requests.
        </p>

        {/* Security & Fraud Prevention */}
        <p className="text-gray-700 font-semibold text-lg">
          Fraud Detection and Platform Security
        </p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          We continuously monitor our systems to detect and prevent fraudulent activities. 
          Automated tools may be used to safeguard transactions and identify suspicious behavior. 
          If an automated decision affects your account, you may contact our{" "}
          <span className="font-semibold">Help Center</span> for review.
        </p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          Categories of personal data we may collect include:{" "}
          <span className="font-semibold">
            location data, profile data, device information, payment details, 
            order history, and voucher usage.
          </span>
        </p>

        {/* External Links */}
        <p className="text-gray-700 font-semibold text-lg">Links to Other Websites</p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          Our website may contain links to external sites. Please note that this Privacy Policy 
          applies only to <span className="font-semibold">{siteName}</span>. 
          We are not responsible for the privacy practices of other websites. 
          We encourage you to review their privacy policies before sharing any personal data.
        </p>

        {/* Contact */}
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          If you have any questions or concerns about this Privacy Policy, 
          please contact us at <span className="text-blue-600">{contactEmail}</span>.
        </p>
      </div>
    </div>
  );
}
