import Link from "next/link";
import React from "react";

export default function DashboardLinks() {
  const user = {
    role: "customer",
  };

  return (
    <ul>
      {user.role === "admin" && (
        <>
          <li>
            <Link href={"/dashboard/admin"}>Home</Link>
          </li>
          <li>
            <Link href={"/dashboard/admin/profile"}>Profile</Link>
          </li>
          <li>
            <Link href={"/dashboard/admin/manage-users"}>Manage Users</Link>
          </li>
        </>
      )}

      {user.role === "customer" && (
        <>
          <li>
            <Link href={"/dashboard/customer"}>Home</Link>
          </li>
          <li>
            <Link href={"/dashboard/customer/orders"}>Orders History</Link>
          </li>
        </>
      )}
    </ul>
  );
}
