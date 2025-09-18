import Logo from "@/components/logo";
import Link from "next/link";
import React from "react";
import DashboardLinks from "./components/DashboardLinks";

export default function DashboardLayout({ children }) {
  return (
    <div className="container mx-auto">
      <div className="grid items-center grid-cols-12 border-b border-orange-500">
        <div className="col-span-3 flex justify-center">
          <Link href={"/"}>
            <Logo />
          </Link>
        </div>

        <div className="col-span-9 bg-gradient-to-r from-orange-500 to-orange-300 py-5 px-4">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        </div>
      </div>

      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <DashboardLinks />
        </div>

        <div className="col-span-9">{children}</div>
      </div>
    </div>
  );
}
