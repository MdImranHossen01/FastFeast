"use client";

import React from "react";
import { ShieldCheck, FileText, Mail, Lock, Cookie } from "lucide-react";

export default function PrivacyPolicy({
  siteName = "FastFeast",
  effectiveDate = "October 16, 2025",
  contactEmail = "support@fastfeast.com",
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-10">
          <ShieldCheck className="mx-auto text-orange-500 w-14 h-14 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Your Privacy Matters 
          </h1>
          <p className="text-sm text-gray-500">
            Effective Date: {effectiveDate}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 shadow-xl backdrop-blur-md border border-orange-100 rounded-2xl p-8 space-y-8">
          {/* Introduction */}
          <section>
            <p className="text-lg leading-relaxed">
              Welcome to <strong>{siteName}</strong> — where good food meets fast
              delivery! Your privacy is as important to us as your meal reaching
              you hot and fresh. This Privacy Policy explains how we collect,
              use, and safeguard your personal information while you enjoy our
              services.
            </p>
          </section>

          {/* Data Collection */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="text-orange-500" />
              <h2 className="text-2xl font-semibold">
                1. What Information We Collect
              </h2>
            </div>
            <p>
              When you use {siteName}, we collect basic details such as your
              name, phone number, delivery address, and payment info to complete
              your order. We may also collect location data (if allowed), device
              type, and order preferences to improve your experience.
            </p>
          </section>

          {/* Usage of Information */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Lock className="text-orange-500" />
              <h2 className="text-2xl font-semibold">
                2. How We Use Your Information
              </h2>
            </div>
            <ul className="list-disc ml-6 space-y-2">
              <li>To deliver your food orders quickly and accurately.</li>
              <li>To personalize offers, coupons, and recommendations.</li>
              <li>To send order updates and service notifications.</li>
              <li>To improve app functionality and customer experience.</li>
              <li>To ensure account safety and detect fraudulent activity.</li>
            </ul>
          </section>

          {/* Cookies & Tracking */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Cookie className="text-orange-500" />
              <h2 className="text-2xl font-semibold">3. Cookies & Tracking</h2>
            </div>
            <p>
              Like most food delivery platforms, {siteName} uses cookies to
              remember your login details, save your cart, and show personalized
              offers. You can disable cookies in your browser settings, but some
              features may not work properly without them.
            </p>
          </section>

          {/* Data Protection */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-orange-500" />
              <h2 className="text-2xl font-semibold">
                4. How We Protect Your Data
              </h2>
            </div>
            <p>
              We use secure servers, encrypted transactions, and strict
              procedures to protect your data. However, no online platform is
              completely risk-free. We recommend keeping your password private
              and reporting any suspicious activity immediately.
            </p>
          </section>

          {/* Sharing Information */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="text-orange-500" />
              <h2 className="text-2xl font-semibold">
                5. Sharing Information with Others
              </h2>
            </div>
            <p>
              We only share essential details (like name, address, contact) with
              restaurant partners, delivery riders, and payment providers so
              your food reaches you smoothly. We never sell your personal data
              to advertisers or third parties.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <FileText className="text-orange-500" />
              <h2 className="text-2xl font-semibold">
                6. Your Rights & Control
              </h2>
            </div>
            <p>
              You can access, update, or delete your account anytime through
              your profile settings. Want to stop receiving promotional emails?
              Simply click “Unsubscribe” in our messages — easy as that!
            </p>
          </section>

          {/* Contact Info */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="text-orange-500" />
              <h2 className="text-2xl font-semibold">7. Contact Us</h2>
            </div>
            <p>
              Have questions about this policy or your data?  
              We’d love to hear from you!  
              Reach us anytime at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-orange-600 font-medium underline"
              >
                {contactEmail}
              </a>
              .
            </p>
          </section>
        </div>

       
      </div>
    </div>
  );
}
