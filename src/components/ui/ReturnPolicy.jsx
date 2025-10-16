"use client";

import React from "react";
import { RotateCcw, Wallet, Smile, Mail, ShieldCheck } from "lucide-react";

export default function ReturnPolicy({
  siteName = "FastFeast",
  effectiveDate = "October 16, 2025",
  contactEmail = "support@fastfeast.com",
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <RotateCcw className="mx-auto text-orange-500 w-14 h-14 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Return & Refund Policy 
          </h1>
          <p className="text-sm text-gray-500">Effective Date: {effectiveDate}</p>
        </div>

        {/* Main Card */}
        <div className="bg-white/80 shadow-xl backdrop-blur-md border border-orange-100 rounded-2xl p-8 space-y-8">
          {/* Intro */}
          <section>
            <p className="text-lg leading-relaxed">
              At <strong>{siteName}</strong>, your satisfaction is our top
              priority. We always strive to deliver your food hot, fresh, and on
              time. However, we understand that sometimes things don’t go as
              planned. This Return & Refund Policy explains how we handle
              cancellations, refunds, and order issues — with the same care we
              put into every meal.
            </p>
          </section>

          {/* When Refund Applies */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Wallet className="text-orange-500" />
              <h2 className="text-2xl font-semibold">
                1. When You’re Eligible for a Refund
              </h2>
            </div>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Your order was **not delivered** due to rider or restaurant issues.
              </li>
              <li>
                You received the **wrong items** or an **incomplete order**.
              </li>
              <li>
                You canceled an order **before restaurant confirmation** or before
                preparation started.
              </li>
              <li>
                Your payment was deducted, but the order did not go through.
              </li>
            </ul>
          </section>

          {/* When Refund Does Not Apply */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-orange-500" />
              <h2 className="text-2xl font-semibold">
                2. When Refund May Not Be Possible
              </h2>
            </div>
            <p>
              Refunds may not be available in cases where:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                The food was prepared and delivered as per your order but didn’t
                meet personal taste expectations.
              </li>
              <li>
                The wrong address or contact details were provided by the customer.
              </li>
              <li>
                Orders were placed using a promotional code or offer marked as
                “non-refundable.”
              </li>
            </ul>
          </section>

          {/* Refund Process */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <RotateCcw className="text-orange-500" />
              <h2 className="text-2xl font-semibold">3. How Refunds Work</h2>
            </div>
            <p>
              Once your refund request is approved, the amount will be credited
              back to your original payment method. Refunds are typically
              processed within **3–7 business days**, depending on your bank or
              payment provider.
            </p>
          </section>

          {/* Cancellation Policy */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Smile className="text-orange-500" />
              <h2 className="text-2xl font-semibold">
                4. Order Cancellation Policy
              </h2>
            </div>
            <p>
              You can cancel your order directly from the app or website before
              the restaurant starts preparing it.  
              Once food preparation has started, cancellation or refund may not
              be possible as the restaurant has already incurred costs.
            </p>
          </section>

          {/* Contact Info */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="text-orange-500" />
              <h2 className="text-2xl font-semibold">5. Contact Us</h2>
            </div>
            <p>
              If you face any issues or have questions about refunds or
              cancellations, please reach out to our support team at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-orange-600 font-medium underline"
              >
                {contactEmail}
              </a>
              .  
              We’re here to help you with a quick resolution and a smile 
            </p>
          </section>
        </div>

       
      </div>
    </div>
  );
}
