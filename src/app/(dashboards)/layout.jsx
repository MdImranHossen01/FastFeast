"use client";

import Logo from "@/components/logo";
import React, { useState } from "react";
import DashboardLinks from "./components/DashboardLinks";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-gradient-to-r from-orange-300 to-orange-200 text-white shadow-lg z-50 
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
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-gradient-to-r from-orange-500 to-orange-300 flex items-center justify-between px-4 text-white shadow-md">
          <h1 className="text-lg md:text-xl font-semibold">Dashboard</h1>

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
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
