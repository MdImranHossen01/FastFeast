"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FiX, FiMenu, FiLogIn } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

// --- Reusable NavLink Component ---
const NavLink = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link
        href={href}
        className={`relative block px-3 py-2 text-base font-medium transition-colors duration-300 ${
          isActive ? "text-orange-500" : "text-gray-700 hover:text-orange-500"
        }`}
      >
        {children}
        {isActive && (
          <motion.span
            layoutId="underline"
            className="absolute left-0 -bottom-1 block h-[2px] w-full bg-orange-500"
          />
        )}
      </Link>
    </li>
  );
};

// --- Main Navbar Component ---
export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/restaurants", label: "Restaurants" },
    { href: "/blogs", label: "Blogs" },
    { href: "/about", label: "About" },
    { href: "/contacts", label: "Contact Us" },
    ...(session ? [{ href: "/dashboard", label: "Dashboard" }] : []),
  ];

  if (pathname.includes("/dashboard")) {
    return null;
  }

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md backdrop-blur-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-0">
        <Logo />

        <motion.ul className="relative hidden items-center gap-4 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}
        </motion.ul>

        <div className="hidden items-center gap-4 lg:flex">
          {session ? (
            <div className="relative">
              <Image
                src={
                  session.user?.image ||
                  `https://avatar.vercel.sh/${session.user?.email}`
                }
                alt={session.user?.name || "User"}
                width={40}
                height={40}
                className="cursor-pointer rounded-full"
                onClick={() => alert("User menu clicked!")}
              />
            </div>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 font-semibold text-white transition-colors hover:bg-orange-600"
            >
              <FiLogIn /> Login
            </Link>
          )}
        </div>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 text-gray-700 transition-colors hover:text-orange-500 lg:hidden"
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 w-full border-t border-gray-200 bg-white shadow-lg lg:hidden"
          >
            <ul className="flex flex-col p-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block rounded-lg px-4 py-3 text-lg font-medium text-gray-700 hover:bg-gray-50 hover:text-orange-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="border-t border-gray-100 p-4">
              {session ? (
                <div className="flex items-center gap-4">
                  <Image
                    src={
                      session.user?.image ||
                      `https://avatar.vercel.sh/${session.user?.email}`
                    }
                    alt={session.user?.name || "User"}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold">{session.user?.name}</p>
                    <button
                      onClick={() => signOut()}
                      className="text-sm text-red-500"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/login"
                      className="rounded-lg text-sm bg-orange-500 px-3 py-1.5 text-center font-semibold text-white transition-colors hover:bg-orange-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Login
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
