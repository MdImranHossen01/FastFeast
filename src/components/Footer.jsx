"use client";

import React from "react";
import Logo from "./logo";
import { FaFacebook, FaGithub, FaYoutube } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (!pathname.includes("dashboard")) {
    return (
      <footer className="bg-gray-200 border-t-4 border-orange-500">
        <div className="container mx-auto px-4 lg:px-0">
          <div className="flex flex-col lg:flex-row justify-between py-16 space-y-8 lg:space-y-0">
            {/* Logo */}
            <div className="max-w-sm">
              <Logo />
              <br />
              <p>
                At FastFeast, we’re all about speed and taste. From local bites
                to global flavors, enjoy hassle-free delivery, anytime,
                anywhere.
              </p>
            </div>

            {/* Products */}
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-gray-900 font-semibold">
                Product
              </h3>
              <ul className="space-y-1">
                {["Features", "Integrations", "Pricing", "FAQ"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-orange-500 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-3">
              <h3 className="tracking-wide uppercase text-gray-900 font-semibold">
                Company
              </h3>
              <ul className="space-y-1">
                {["Privacy", "Terms of Service"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-orange-500 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Developer Resources */}
            <div className="space-y-3">
              <h3 className="uppercase text-gray-900 font-semibold">
                Developer Resources
              </h3>
              <ul className="space-y-1">
                {["Public API", "Documentation", "Guides"].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="hover:text-orange-500 transition-colors duration-300"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/*  Social media */}
            <div className="space-y-3">
              <div className="uppercase text-gray-900 font-semibold">
                Social media
              </div>
              <div className="flex justify-start space-x-3">
                <div className="flex justify-start space-x-3 ">
                  <a
                    href="https://github.com/"
                    target="_blank"
                    className="transform transition hover:scale-110"
                  >
                    <FaGithub size={25} color="#ea580c" />
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    className="transform transition hover:scale-110 duration-300"
                  >
                    <FaFacebook size={25} color="#ea580c" />
                  </a>
                  <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    className="transform transition hover:scale-110 duration-300"
                  >
                    <FaYoutube size={27} color="#ea580c" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="py-6 text-sm text-center text-gray-600 border-t border-orange-100">
          © 2025{" "}
          <span className="font-semibold text-orange-500">FastFeast</span>. All
          rights reserved.
        </div>
      </footer>
    );
  } else {
    return <></>;
  }
};

export default Footer;
