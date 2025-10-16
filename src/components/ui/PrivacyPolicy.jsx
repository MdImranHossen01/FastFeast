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
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          This policy explains how we, <span className="font-semibold">{siteName}</span>, use your 
          <span className="font-semibold"> personal information</span> which you provide to us when using our service, 
          including but not limited to our website and mobile applications (<span className="italic">apps</span>).
        </p>

        <p className="text-gray-700 font-semibold">What information we collect about you?</p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          We collect <span className="font-semibold">personal information</span> from you when you order goods or services 
          from us or use our website. We also collect information when you complete any <span className="font-semibold">customer survey</span>. 
          Website usage information may also be collected using <span className="font-semibold">cookies</span>.
        </p>

        <p className="text-gray-700 font-semibold">Cookies and Google Analytics</p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          <span className="font-semibold">Cookies</span> are small text files placed on your computer by websites you visit. 
          They help websites work efficiently and provide information to site owners.
        </p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          This website uses <span className="font-semibold text-blue-600">Google Analytics</span>, a web analytics service by Google, Inc. ("Google"). 
          Google Analytics uses <span className="font-semibold">cookies</span> to analyze how you use the site. Data may be transmitted to and stored by Google on servers in the United States. You may refuse cookies via your browser settings, but some features may not work properly.
        </p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          For more on managing cookies, visit <span className="text-blue-600">www.allaboutcookies.org</span>.
        </p>

        <p className="text-gray-700 font-semibold">How will we use the information we collect from you?</p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          Information we collect is used to process your orders and manage your account. We may also email you about other products or services that may interest you. 
          Your data may be sent to <span className="font-semibold">credit reference</span> and <span className="font-semibold">fraud prevention agencies</span>.
        </p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          From time to time, information may be shared with third parties offering goods or services that may interest you. 
          Contact us via our <span className="font-semibold">in-app customer support chat</span> if you do not wish to be contacted.
        </p>

        <p className="text-gray-700 font-semibold">Access to your information</p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          You can request a copy of the information we hold about you anytime. Contact us through the in-app customer support chat. 
          A small processing fee may apply.
        </p>

        <p className="text-gray-700 font-semibold">Fraud detection, prevention and security of our platform</p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          We continuously monitor our websites and apps to prevent attacks and ensure safe ordering. Suspicious behavior is detected early using technical measures. Automated decisions may affect your account; if you disagree, contact us via <span className="font-semibold">Help Center</span>.
        </p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          Categories of personal data: <span className="font-semibold">Location data, Profile data (master data), Device information, Payment data, Order data, Voucher information</span>.
        </p>

        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          Other Websites: Our website may link to other sites. This policy applies only to this website. Read other websites' privacy policies when using them.
        </p>

       
      </div>
    </div>
  );
}
