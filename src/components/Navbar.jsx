"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";
import { useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = () => (
    <>
      <li>
        <Link
          href={"/"}
          className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
            pathname === "/"
              ? "text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-md"
              : "text-gray-700 hover:text-orange-500 hover:bg-gray-50"
          }`}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href={"/blogs"}
          className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
            pathname === "/blogs"
              ? "text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-md"
              : "text-gray-700 hover:text-orange-500 hover:bg-gray-50"
          }`}
        >
          Blogs
        </Link>
      </li>
      <li>
        <Link
          href={"/about"}
          className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
            pathname === "/about"
              ? "text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-md"
              : "text-gray-700 hover:text-orange-500 hover:bg-gray-50"
          }`}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href={"/contacts"}
          className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
            pathname === "/contacts"
              ? "text-white bg-gradient-to-r from-orange-500 to-orange-600 shadow-md"
              : "text-gray-700 hover:text-orange-500 hover:bg-gray-50"
          }`}
        >
          Contact Us
        </Link>
      </li>
      <li>
        <Link href={"/admin-dashboard"}>Dashboard</Link>
      </li>
    </>
  );

  if (!pathname.includes("dashboard")) {
    return (
      <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              {/* <Link href="/" className="flex items-center"> */}
              <Logo />
              {/* </Link> */}
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <ul className="flex space-x-2">{navLinks()}</ul>
              </div>
            </div>

            {/* User Menu / Auth Buttons */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <UserMenu session={session} signOut={signOut} />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-300"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200 rounded-lg mt-2 shadow-lg">
                <ul className="flex flex-col space-y-2">{navLinks()}</ul>
                <div className="pt-4 pb-3 border-t border-gray-200">
                  {session ? (
                    <div className="flex items-center px-2">
                      <UserMenu session={session} signOut={signOut} mobile />
                    </div>
                  ) : (
                    <div className="flex flex-col space-y-3">
                      <Link
                        href="/login"
                        className="w-full px-4 py-2 border-2 border-orange-500 text-orange-500 font-semibold rounded-lg text-center hover:bg-orange-500 hover:text-white transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Login
                      </Link>
                      <Link
                        href="/auth/register"
                        className="w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg text-center hover:shadow-lg transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  } else {
    return <></>;
  }
}
