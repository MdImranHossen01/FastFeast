"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

export default function DashboardLinks() {
  const { data: session } = useSession();

  return (
    <ul>
      <li>
        <Link href={"/"}>Home</Link>
      </li>
    </ul>
  );
}
