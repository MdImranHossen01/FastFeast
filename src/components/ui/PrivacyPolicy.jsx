"use client";

import React from "react";

export default function PolicyPage({
  siteName = "FastFeast",
  effectiveDate = "October 13, 2025",
  contactEmail = "support@fastfeast.com",
}) {
  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white rounded-2xl shadow-lg leading-relaxed">
      <header className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold text-primary">
          {siteName} Policy Center
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Effective Date: {effectiveDate}
        </p>
      </header>

      <section className="space-y-8 text-gray-700">
        {/* Privacy Policy */}
        <div>
          <h3 className="text-2xl font-semibold mb-2">Privacy Policy</h3>
          <p>
            We value your privacy and are committed to protecting your personal
            information. We collect basic information like your name, email,
            address, and payment details only to process orders and improve your
            experience. Your data is stored securely and never sold to third
            parties.
          </p>
          <p className="mt-2">
            We may use cookies to enhance your experience and analyze site
            performance. You can control cookies through your browser settings.
            For any privacy-related questions, reach us at{" "}
            <a
              href={`mailto:${contactEmail}`}
              className="text-primary hover:underline"
            >
              {contactEmail}
            </a>
            .
          </p>
        </div>

        {/* Terms & Conditions */}
        <div>
          <h3 className="text-2xl font-semibold mb-2">Terms & Conditions</h3>
          <p>
            By accessing or using {siteName}, you agree to follow our terms and
            conditions. All products, prices, and services are subject to
            availability and may change without prior notice.
          </p>
          <p className="mt-2">
            Users must provide accurate information during registration and
            purchases. Misuse, fraud, or illegal activity may lead to account
            suspension or cancellation.
          </p>
          <p className="mt-2">
            We reserve the right to modify these terms anytime. Updates will be
            reflected here with a new effective date.
          </p>
        </div>

        {/* Return & Refund Policy */}
        <div>
          <h3 className="text-2xl font-semibold mb-2">Return & Refund Policy</h3>
          <p>
            Customer satisfaction is our priority. If you receive a damaged or
            incorrect item, please contact us within <strong>7 days</strong> of
            delivery with proof (photo/video).
          </p>
          <p className="mt-2">
            Eligible returns will be refunded or replaced within{" "}
            <strong>5–10 business days</strong> after approval. Products must be
            unused, in original packaging, and accompanied by the order receipt.
          </p>
          <p className="mt-2">
            Certain items like perishable goods or opened food boxes cannot be
            returned for hygiene reasons.
          </p>
        </div>
      </section>

      <hr className="my-8" />

      <div className="flex flex-col md:flex-row gap-3 md:gap-4 justify-center">
        <button
          onClick={() => window.print()}
          className="btn btn-outline btn-sm md:btn-md"
        >
          Print / Save as PDF
        </button>

        <a
          href={`mailto:${contactEmail}?subject=${encodeURIComponent(
            siteName + " Policy Inquiry"
          )}`}
          className="btn btn-primary btn-sm md:btn-md"
        >
          Contact Support
        </a>
      </div>

      <p className="text-center text-gray-500 text-sm mt-4">
        © {new Date().getFullYear()} {siteName}. All rights reserved.
      </p>
    </div>
  );
}
