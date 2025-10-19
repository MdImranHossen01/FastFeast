"use client";

import React, { useEffect, useState } from "react";
import Logo from "./logo";
import { FaFacebook, FaGithub, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLocationSharp, IoCall, IoMail } from "react-icons/io5";
import { usePathname } from "next/navigation";
import Link from "next/link";
import NewsletterForm from "@/app/components/NewsLetter";
import InstallButton from "@/components/pwa/InstallButton";

// --- Reusable Footer Column Component ---
const FooterColumn = ({ title, links }) => (
  <div>
    <h3 className="mb-4 text-sm font-semibold uppercase text-gray-100">
      {title}
    </h3>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            href={link.href}
            className="text-gray-400 transition-colors hover:text-orange-400"
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

// --- Smarter Footer Data Structure (Consolidated Links) ---
// Keep these values STATIC so that SSR and CSR match exactly (prevents hydration mismatch)
const footerData = [
  {
    title: "About FastFeast",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Blogs", href: "/blogs" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contacts" },
    ],
  },
  {
    title: "Support & Polcy",
    links: [
      { name: "Privacy Policy", href: "/PrivacyPolicy" },
      { name: "Return Policy", href: "/ReturnPolicy" },
      { name: "Terms And Conditions", href: "/TermsAndConditions" },
      { name: "Developer Info", href: "/DeveloperInfo" },
    ],
  },
];

const Footer = () => {
  const pathname = usePathname();
  const [isDashboard, setIsDashboard] = useState(false);

  // Only reads pathname on client; render-null pattern avoids hydration mismatch
  useEffect(() => {
    setIsDashboard(pathname?.includes("dashboard") || false);
  }, [pathname]);

  // Don't render footer on dashboard pages
  if (isDashboard) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-gray-300 py-6">
      <div className="container mx-auto py-6 px-4">
        {/* ✅ Balanced 4-column grid (+ newsletter) */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo & Socials */}
          <div>
            {/* If your Logo uses next/image with fill, ensure it sets `sizes` internally */}
            <Logo />
            
            <div className="space-y-2 mt-4 text-sm">
              <div className="flex items-start gap-2">
                <IoLocationSharp
                  size={20}
                  className="mt-1 flex-shrink-0 text-orange-400"
                />
                <p className="text-gray-400">123 Gulshan Avenue, Dhaka </p>
              </div>

              <div className="flex items-center gap-3">
                <IoCall size={20} className="flex-shrink-0 text-orange-400" />
                <a
                  href="tel:+8801712345678"
                  className="text-gray-400 transition-colors hover:text-orange-400"
                >
                  +880 171 234 5678
                </a>
              </div>

              <div className="flex items-center gap-3">
                <IoMail size={20} className="flex-shrink-0 text-orange-400" />
                <a
                  href="mailto:support@fastfeast.com"
                  className="text-gray-400 transition-colors hover:text-orange-400"
                >
                  support@fastfeast.com
                </a>
              </div>
            </div>

            <div className="mt-6 flex space-x-4 pb-6">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-orange-400"
                aria-label="Facebook"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-orange-400"
                aria-label="Twitter / X"
              >
                <FaXTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-orange-400"
                aria-label="YouTube"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-orange-400"
                aria-label="GitHub"
              >
                <FaGithub size={24} />
              </a>
            </div>
            <div>
              <InstallButton />
            </div>
          </div>

          {/* Columns 2, 3 & 4: Mapped Link Columns */}
          {footerData.map((column) => (
            <FooterColumn
              key={column.title}
              title={column.title}
              links={column.links}
            />
          ))}

          {/* Column 5: Newsletter */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-100">
              Newsletter
            </h3>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="border-t border-slate-800 bg-slate-900 pt-6">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold text-orange-400">FastFeast</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
