"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function UserMenu({ session }) {
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    signOut();
  };

  return (
    <div>
      {!session ? (
        <Link
          href="/login"
          className="text-orange-600 font-semibold border-2 border-orange-600 py-2 px-4 hover:bg-orange-600 hover:text-gray-100 transition-all duration-300 rounded-sm"
        >
          Log In
        </Link>
      ) : (
        <div className="relative">
          {/* Profile button */}
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 focus:outline-none"
          >
            {session?.user?.image && (
              <img
                src={session?.user?.image}
                className="w-10 h-10 rounded-full border"
                alt="User"
              />
            )}
            <span>{session?.user?.name?.split(" ")[0] || "User"}</span>
            <svg
              className={`w-4 h-4 transform transition-transform ${
                open ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Profile
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Settings
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
