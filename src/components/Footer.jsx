"use client";

import React from "react";
import Logo from "./logo";
import {
  FaFacebook,
  FaGithub,
  FaYoutube,
  FaRegPaperPlane,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // Using the newer FaXTwitter icon from react-icons/fa6
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
        <li key={link.name}>
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
    // ✅ Combined partner links for a cleaner look
    title: "Our Partners",
    links: [
      { name: "For Restaurants", href: "/signup/restaurant" },
      { name: "For Riders", href: "/signup/rider" },
      { name: "Partner Hub", href: "/partner-hub" },
    ],
  },
];

const Footer = () => {


  const pathname = usePathname();



  if (pathname.includes("dashboard")) {
    return null;
  }

  return (
    <footer className="bg-slate-900 text-gray-300 py-6">
      <div className="container mx-auto py-6 px-4">
        {/* ✅ Simplified to a single, balanced 4-column grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: Logo & Socials */}
          <div>
            <Logo />
            <div className="space-y-2 mt-4 text-sm">
              <div>
                <InstallButton />
              </div>
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

            <div className="mt-6 flex space-x-4">
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-orange-400"
              >
                <FaFacebook size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-orange-400"
              >
                {/* REPLACED WITH X ICON */}
                <FaXTwitter size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-orange-400"
              >
                <FaYoutube size={24} />
              </a>
              <a
                href="#"
                className="text-gray-400 transition-colors hover:text-orange-400"
              >
                <FaGithub size={24} />
              </a>
            </div>
          </div>

          {/* Columns 2 & 3: Mapped Link Columns */}
          {footerData.map((column) => (
            <FooterColumn
              key={column.title}
              title={column.title}
              links={column.links}
            />
          ))}

          {/* Column 4: "Get In Touch" */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase text-gray-100">
              Newsletter
            </h3>
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      {/* Bottom Copyright Section */} 
      <div className="border-t border-slate-800 bg-slate-900 pt-6"> 
        <div className="container mx-auto px-4 text-center text-sm text-gray-500"> © {new Date().getFullYear()}{" "} <span className="font-semibold text-orange-400">FastFeast</span>. All rights reserved. </div> </div>
    </footer>
  );
};

export default Footer;
