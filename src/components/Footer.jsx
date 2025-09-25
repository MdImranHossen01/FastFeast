"use client";

import React from "react";
import Logo from "./logo";
import { FaFacebook, FaGithub, FaYoutube } from "react-icons/fa";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();

  if (!pathname.includes("dashboard")) {
    return (
      <footer className="max-w-[1500px] mx-auto">
        <div className="border-t-4 border-orange-500 text-gray-800 bg-gradient-to-b from-orange-50 to-white">
          <div className="flex flex-col justify-between py-12 space-y-8 lg:flex-row lg:space-y-0">
            <div className="lg:w-1/3">
              <div className="flex gap-2 flex-row justify-center items-center">
                <Logo />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8 text-sm w-full md:w-2/3 mx-auto">
              <div className="space-y-3">
                <h3 className="tracking-wide uppercase text-gray-900 font-semibold">
                  Product
                </h3>
                <ul className="space-y-1">
                  {["Features", "Integrations", "Pricing", "FAQ"].map(
                    (item) => (
                      <li key={item}>
                        <a
                          href="#"
                          className="hover:text-orange-500 transition-colors duration-300"
                        >
                          {item}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </div>
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
            <span className="font-semibold text-orange-500">FastFeast</span>.
            All rights reserved.
          </div>
        </div>
      </footer>
    );
  } else {
    return <></>;
  }
};

export default Footer;
