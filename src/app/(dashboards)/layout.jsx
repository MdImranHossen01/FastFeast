"use client";

import Logo from "@/components/logo";
import React, { useState } from "react";
import DashboardLinks from "./components/DashboardLinks";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
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
          bg-gray-500 dark:from-gray-800 dark:to-gray-700 
          flex items-center justify-between px-4 text-white shadow-md"
        >
          <h1 className="text-lg md:text-xl lg:text-2xl font-bold">
            Dashboard
          </h1>

          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md hover:bg-white/10"
            >
              {theme === "dark" ? (
                <Sun className="h-6 w-6" />
              ) : (
                <Moon className="h-6 w-6" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden text-white"
            >
              {menuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
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
