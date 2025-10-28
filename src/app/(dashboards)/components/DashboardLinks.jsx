"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function DashboardLinks() {
  const pathname = usePathname();
  const { data: session } = useSession();
  // const user = session?.user;

  const user = {
    role: "rider",
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
      {/* admin links */}
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
              className={linkStyle("/admin-dashboard/manage-reviews")}
            >
              Manage Reviews
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/manage-newsletter"
              className={linkStyle("/manage-newsletter")}
            >
              Manage Newsletter
            </Link>
          </li>
          <li>
            <Link
              href="/admin-dashboard/manage-moderator"
              className={linkStyle("/manage-moderator")}
            >
              Manage Moderator
            </Link>
          </li>
        </>
      )}

      {/* moderator links */}
      {user.role === "moderator" && (
        <>
          <li>
            <Link
              href="/moderator-dashboard"
              className={linkStyle("/moderator-dashboard")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/moderator-dashboard/manage-riders"
              className={linkStyle("/moderator-dashboard/manage-riders")}
            >
              Manage Riders
            </Link>
          </li>
          <li>
            <Link
              href="/moderator-dashboard/manage-blogs"
              className={linkStyle("/moderator-dashboard/manage-blogs")}
            >
              Manage Blogs
            </Link>
          </li>
          <li>
            <Link
              href="/moderator-dashboard/manage-reviews"
              className={linkStyle("/moderator-dashboard/manage-reviews")}
            >
              Manage Reviews
            </Link>
          </li>
          <li>
            <Link
              href="/moderator-dashboard/manage-newsletter"
              className={linkStyle("/moderator-dashboard/manage-newsletter")}
            >
              Manage Newsletter
            </Link>
          </li>
        </>
      )}

      {/* restaurant links */}
      {user.role === "restaurant" && (
        <>
          <li>
            <Link
              href="/restaurant-dashboard"
              className={linkStyle("/restaurant-dashboard")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/restaurant-dashboard/manage-orders"
              className={linkStyle("/restaurant-dashboard/manage-orders")}
            >
              Manage Orders manage-menus
            </Link>
          </li>
          <li>
            <Link
              href="/restaurant-dashboard/manage-menus"
              className={linkStyle("/restaurant-dashboard/manage-menus")}
            >
              Manage Menus
            </Link>
          </li>
          <li>
            <Link
              href="/restaurant-dashboard/manage-menus"
              className={linkStyle("/restaurant-dashboard/manage-menus")}
            >
              Add Menu
            </Link>
          </li>
        </>
      )}

      {/* rider links */}
      {user.role === "rider" && (
        <>
          <li>
            <Link
              href="/rider-dashboard"
              className={linkStyle("/rider-dashboard")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/rider-dashboard/orders-history"
              className={linkStyle("/rider-dashboard/orders-history")}
            >
              Orders History
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}
