"use client";

import React from "react";
import { BookOpen, CheckCircle, CreditCard, ShieldCheck, Mail } from "lucide-react";

export default function TermsAndConditions({
  siteName = "FastFeast",
  effectiveDate = "October 16, 2025",
  contactEmail = "support@fastfeast.com",
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 via-white to-white text-gray-800">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-10">
          <BookOpen className="mx-auto text-orange-500 w-14 h-14 mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms & Conditions</h1>
          <p className="text-sm text-gray-500">Effective Date: {effectiveDate}</p>
        </div>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-md shadow-xl border border-orange-100 rounded-2xl p-8 space-y-8">
          {/* Intro */}
          <section>
            <p className="text-lg leading-relaxed">
              Welcome to <strong>{siteName}</strong>. These Terms & Conditions
              govern your use of our website and app. By using {siteName}, you
              agree to follow and be bound by these terms. Please read them
              carefully — we try to keep them short and simple, just like our
              delivery times.
            </p>
          </section>

          {/* Use of Service */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="text-orange-500" />
              <h2 className="text-2xl font-semibold">1. Use of the Service</h2>
            </div>
            <p>
              {siteName} provides a platform to browse restaurants, place orders,
              and arrange deliveries. You must be at least 18 years old (or have
              legal guardian consent) to create an account and place orders.
              Use the service only for lawful purposes and do not attempt to
              misuse or disrupt the platform.
            </p>
          </section>

          {/* Orders & Payments */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="text-orange-500" />
              <h2 className="text-2xl font-semibold">2. Orders & Payments</h2>
            </div>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Placing an order creates a contract between you and the selected restaurant. Order acceptance is subject to restaurant confirmation.
              </li>
              <li>
                Payment must be completed at checkout. We accept the payment methods listed on our app/website.
              </li>
              <li>
                In case of payment issues, contact support — we’ll help resolve or refund where applicable.
              </li>
            </ul>
          </section>

          {/* Account Responsibility */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-orange-500" />
              <h2 className="text-2xl font-semibold">3. Account Responsibility</h2>
            </div>
            <p>
              You are responsible for maintaining the confidentiality of your
              account credentials. Notify us immediately if you suspect any
              unauthorized access. We are not liable for losses resulting from
              compromised credentials if you do not inform us promptly.
            </p>
          </section>

          {/* Content & IP */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="text-orange-500" />
              <h2 className="text-2xl font-semibold">4. Content & Intellectual Property</h2>
            </div>
            <p>
              All content on {siteName} (design, logos, text, images) is owned
              by {siteName} or licensed to us. You may not copy, reproduce, or
              use our content commercially without permission.
            </p>
          </section>

          {/* Limitation */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="text-orange-500" />
              <h2 className="text-2xl font-semibold">5. Limitation of Liability</h2>
            </div>
            <p>
              We strive for accuracy and timely delivery, but sometimes things go
              wrong. To the fullest extent permitted by law, {siteName} will not
              be liable for indirect, incidental, or consequential damages
              arising from use of the service. Our maximum liability for direct
              damages is limited to the amount you paid for the affected order.
            </p>
          </section>

          {/* Termination */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="text-orange-500" />
              <h2 className="text-2xl font-semibold">6. Suspension & Termination</h2>
            </div>
            <p>
              We may suspend or terminate accounts that violate these terms,
              attempt fraud, or harm the platform. If your account is terminated,
              you must stop using the service and any outstanding orders will be
              handled per our policies.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="text-orange-500" />
              <h2 className="text-2xl font-semibold">7. Governing Law</h2>
            </div>
            <p>
              These terms are governed by the laws of the country where {siteName}
              primarily operates. Any disputes will be resolved in the competent
              courts of that jurisdiction.
            </p>
          </section>

          {/* Changes */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle className="text-orange-500" />
              <h2 className="text-2xl font-semibold">8. Changes to Terms</h2>
            </div>
            <p>
              We may update these Terms & Conditions from time to time. If we
              make material changes, we’ll notify you via the app/email or show
              an in-app notice. Continued use of the service after changes
              constitutes acceptance of the updated terms.
            </p>
          </section>

          {/* Contact */}
          <section>
            <div className="flex items-center gap-2 mb-2">
              <Mail className="text-orange-500" />
              <h2 className="text-2xl font-semibold">9. Contact Us</h2>
            </div>
            <p>
              Questions about these terms? Reach out at{" "}
              <a
                href={`mailto:${contactEmail}`}
                className="text-orange-600 font-medium underline"
              >
                {contactEmail}
              </a>
              . We’ll get back to you as soon as possible.
            </p>
          </section>
        </div>

        
      </div>
    </div>
  );
}
