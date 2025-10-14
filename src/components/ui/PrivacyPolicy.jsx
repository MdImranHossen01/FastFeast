"use client";

import React from "react";
import { ShieldCheck, FileText, RefreshCcw } from "lucide-react";

export default function PolicyPage({
  siteName = "FastFeast",
  effectiveDate = "October 13, 2025",
  contactEmail = "support@fastfeast.com",
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-base-200 to-base-100">
      {/*  Hero Section */}
      <div
        className="relative bg-cover bg-center h-[300px] md:h-[420px] flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?auto=format&fit=crop&w=1600&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
        <div className="relative text-center text-white px-6 fade-up">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-xl">
            {siteName} Policy Center
          </h1>
          <p className="text-base md:text-lg text-gray-300">
            Effective Date: {effectiveDate}
          </p>
        </div>
      </div>

      {/*  Cards Section */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16 grid md:grid-cols-3 gap-8">
        {/* Privacy Policy */}
        <div className="group bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:-translate-y-3 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 text-primary p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <ShieldCheck size={26} />
            </div>
            <h3 className="text-xl font-semibold text-primary group-hover:text-primary/80 transition">
              Privacy Policy
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            We value your privacy and protect your personal information. We only
            collect necessary details like your name, email, and payment info to
            process orders and enhance your experience.
          </p>
          <p className="text-gray-700 mt-3">
            Your data is securely stored and never sold to others. For privacy
            inquiries, contact us at{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-primary font-medium hover:underline"
            >
              {contactEmail}
            </a>
            .
          </p>
        </div>

        {/*  Terms & Conditions */}
        <div className="group bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:-translate-y-3 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 text-primary p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <FileText size={26} />
            </div>
            <h3 className="text-xl font-semibold text-primary group-hover:text-primary/80 transition">
              Terms & Conditions
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            By using {siteName}, you agree to our terms. Products, prices, and
            services are subject to change without prior notice.
          </p>
          <p className="text-gray-700 mt-3">
            Users must provide accurate information when registering or
            ordering. Fraud or misuse may result in suspension. Updates to these
            terms will appear here with a new effective date.
          </p>
        </div>

        {/*  Return & Refund Policy */}
        <div className="group bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 hover:-translate-y-3 transition-all duration-300">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-primary/10 text-primary p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
              <RefreshCcw size={26} />
            </div>
            <h3 className="text-xl font-semibold text-primary group-hover:text-primary/80 transition">
              Return & Refund Policy
            </h3>
          </div>
          <p className="text-gray-700 leading-relaxed">
            If you receive a damaged or incorrect item, please contact us within{" "}
            <strong>7 days</strong> of delivery with valid proof (photo/video).
          </p>
          <p className="text-gray-700 mt-3">
            Approved refunds or replacements are processed within{" "}
            <strong>5–10 business days</strong>. For hygiene reasons, opened or
            perishable goods cannot be returned.
          </p>
        </div>
      </div>

      {/*  Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-4 pb-12">
        <button
          onClick={() => window.print()}
          className="btn btn-outline btn-accent rounded-full px-6 shadow hover:shadow-md transition"
        >
          Print / Save as PDF
        </button>
        <a
          href={`mailto:${contactEmail}?subject=${encodeURIComponent(
            siteName + " Policy Inquiry"
          )}`}
          className="btn btn-accent rounded-full px-6 shadow hover:shadow-md transition"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
