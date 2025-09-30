"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function DashboardLinks() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const user = {
    role: "admin",
  };

  const linkStyle = (href) =>
    `block w-full px-4 py-2 rounded-md font-medium transition
     ${
       pathname === href
         ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-orange-400 shadow-md"
         : "text-gray-800 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
     }`;

  return (
    <ul className="space-y-2 p-2">
      {user.role === "admin" && (
        <>
          <li>
            <Link
              href="/admin-dashboard"
              className={linkStyle("/admin-dashboard")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/manage-restaurants"
              className={linkStyle("/admin-dashboard/manage-restaurants")}
            >
              Manage Restaurants
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/manage-riders"
              className={linkStyle("/admin-dashboard/manage-riders")}
            >
              Manage Riders
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/manage-blogs"
              className={linkStyle("/admin-dashboard/manage-blogs")}
            >
              Manage Blogs
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/manage-reviews"
              className={linkStyle("/admin-dashboard/manage-blogs")}
            >
              Manage Reviews
            </Link>
          </li>
        </>
      )}

      {user.role === "customer" && (
        <>
          <li>
            <Link
              href="/customer-dashboard"
              className={linkStyle("/customer-dashboard")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/customer-dashboard/orders-history"
              className={linkStyle("/customer-dashboard/orders-history")}
            >
              Orders History
            </Link>
          </li>
          <li>
            <Link
              href="/customer-dashboard/payments-history"
              className={linkStyle("/customer-dashboard/payments-history")}
            >
              Payments History
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
