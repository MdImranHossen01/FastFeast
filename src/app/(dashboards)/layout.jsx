"use client";

import Logo from "@/components/logo";
import Link from "next/link";
import React, { useState } from "react";
import DashboardLinks from "./components/DashboardLinks";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);

  // Header height (for alignment with sidebar)
  const headerHeight = "h-16"; // you can adjust if your header is taller

  return (
    <div className="container mx-auto">
      {/* Header */}
      <div
        className={`grid items-center grid-cols-12 border-b border-orange-500 bg-gradient-to-r from-orange-200 to-orange-300 ${headerHeight}`}
      >
        {/* Logo */}
        <div className="col-span-3 flex items-center justify-start md:justify-center px-4">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>

        {/* Dashboard Title + Mobile Menu Button */}
        <div className="col-span-9 flex items-center justify-between px-4">
          <h1 className="text-xl md:text-2xl font-bold text-white">
            Dashboard
          </h1>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div className="grid grid-cols-12">
        {/* Sidebar */}
        <div
          className={`
          col-span-3 fixed left-0 h-full w-64 bg-white shadow-md z-50 transform
          transition-transform duration-300 md:relative md:translate-x-0 md:block
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}
          mt-16 md:mt-0
        `}
        >
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Menu</h2>
            <button
              onClick={() => setMenuOpen(false)}
              className="md:hidden text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <DashboardLinks />
        </div>

        {/* Main Content */}
        <div className="col-span-12 md:col-span-9 md:ml-64 p-4">{children}</div>
      </div>
    </div>
  );
}
