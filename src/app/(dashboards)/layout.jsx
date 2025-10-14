"use client";

import Logo from "@/components/logo";
import React, { useState, useEffect } from "react";
import DashboardLinks from "./components/DashboardLinks";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { FiUser } from "react-icons/fi";

export default function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;

  // Remove the console.log that's causing the undefined logs
  // console.log(user);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state while session is loading
  if (status === "loading") {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Show error state if not authenticated
  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Please log in to access the dashboard
          </p>
          <button
            onClick={() => (window.location.href = "/login")}
            className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-slate-900 transition-all duration-300">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 
        bg-white dark:bg-slate-800
          text-gray-800 dark:text-white shadow-lg z-50 
        transform transition-transform duration-300 
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-white/20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/10 transition cursor-pointer"
            aria-label="Toggle Menu"
          >
            {menuOpen ? (
              <FiX className="h-6 w-6" />
            ) : (
              <FiMenu className="h-6 w-6" />
            )}
          </button>

          <Logo />
        </div>

        {/* Links */}
        <div className="p-4 text-gray-800 dark:text-white">
          <DashboardLinks />
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <header
          className="sticky top-0 z-40 h-16 
          bg-white dark:bg-slate-800
          text-gray-800 dark:text-white
          flex items-center justify-between px-4 shadow-md transition-colors duration-300"
        >
          <div className="flex items-center">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/10 transition cursor-pointer"
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>

            <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              {user ? (
                <Image
                  src={user.image || "/demo-user.png"}
                  width={48}
                  height={48}
                  alt="User image"
                  className="rounded-full"
                  priority={true}
                  style={{
                    width: "48px",
                    height: "48px",
                    objectFit: "cover",
                  }}
                  onError={(e) => {
                    // Fallback to a default avatar if the image fails to load
                    e.target.src = `https://avatar.vercel.sh/${
                      user.name || "user"
                    }`;
                  }}
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                  <span className="text-gray-600 dark:text-gray-400">
                    <FiUser className="h-6 w-6" />
                  </span>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md hover:bg-gray-200/50 dark:hover:bg-white/10 transition cursor-pointer"
              aria-label="Toggle Theme"
            >
              {mounted ? (
                theme === "dark" ? (
                  <FiSun className="h-6 w-6" />
                ) : (
                  <FiMoon className="h-6 w-6" />
                )
              ) : (
                <div className="h-6 w-6" />
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4 text-gray-900 dark:text-gray-100 transition-colors duration-300">
          {children}
        </main>
      </div>
    </div>
  );
}
