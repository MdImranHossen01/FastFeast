"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function DashboardLinks() {
  const { data: session } = useSession();
  // const user = session?.user;
  // console.log(user);

  const user = {
    role: "admin",
  };

  return (
    <ul className="space-y-2 p-2">
      {user.role === "admin" && (
        <>
          <li>
            <Link
              href="/admin-dashboard"
              className="block w-full px-4 py-2 rounded-md text-gray-700 font-medium hover:bg-orange-100 hover:text-orange-600 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/manage-riders"
              className="block w-full px-4 py-2 rounded-md text-gray-700 font-medium hover:bg-orange-100 hover:text-orange-600 transition"
            >
              Manage Users
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/manage-restaurants"
              className="block w-full px-4 py-2 rounded-md text-gray-700 font-medium hover:bg-orange-100 hover:text-orange-600 transition"
            >
              Manage Restaurants
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
