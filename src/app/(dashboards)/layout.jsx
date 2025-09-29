"use client";

import Logo from "@/components/logo";
import React, { useState, useEffect } from "react";
import DashboardLinks from "./components/DashboardLinks";
import { FiMenu, FiX, FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "next-themes";

export default function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 
        bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-800 dark:to-gray-700 
        text-white shadow-lg z-50 
        transform transition-transform duration-300 
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 border-b border-white/20">
          <Logo />
        </div>

        {/* Links */}
        <div className="p-4">
          <DashboardLinks />
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Header */}
        <header
          className="sticky top-0 z-40 h-16 
          bg-gradient-to-r from-gray-500 to-gray-500 dark:from-gray-800 dark:to-gray-700 
          flex items-center justify-between px-4 text-white shadow-md transition-colors duration-300"
        >
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
            Dashboard
          </h1>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md hover:bg-white/10 transition"
              aria-label="Toggle Theme"
            >
              {mounted ? (
                theme === "dark" ? (
                  <FiSun className="h-6 w-6 text-yellow-400" />
                ) : (
                  <FiMoon className="h-6 w-6 text-blue-400" />
                )
              ) : (
                <div className="h-6 w-6" /> // placeholder to avoid layout shift
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-md hover:bg-white/10 transition"
              aria-label="Toggle Menu"
            >
              {menuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}
