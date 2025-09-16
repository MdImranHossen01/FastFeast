import React from "react";
import Logo from "./logo";

const Footer = () => {
  return (
    <footer className="px-4 divide-y w-full   border-t-3 border-orange-400  text-gray-800">
      <div className="container flex flex-col justify-between py-10 mx-auto space-y-8 lg:flex-row lg:space-y-0">
        <div className="lg:w-1/3">
          <div
            className="flex gap-2 flex-row justify-center items-center
          "
          >
            <Logo />
          </div>
        </div>
        <div className="grid grid-cols-2 text-sm gap-x-3 gap-y-8 lg:w-2/3 sm:grid-cols-4">
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase  text-gray-900 font-semibold">
              Product
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Features
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Integrations
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Pricing
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="tracking-wide uppercase  text-gray-900 font-semibold">
              Company
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Privacy
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="uppercase text-gray-900 font-semibold">
              Developer Resources
            </h3>
            <ul className="space-y-1">
              <li>
                <a rel="noopener noreferrer" href="#">
                  Public API
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Documentation
                </a>
              </li>
              <li>
                <a rel="noopener noreferrer" href="#">
                  Guides
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <div className="flex justify-start space-x-3"></div>
          </div>
        </div>
      </div>
      <div className="py-6 text-sm text-center dark:text-gray-600">
        © 2025 FastFeast. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
