"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Logo from "./logo";
import { usePathname } from "next/navigation";
import UserMenu from "./UserMenu";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navLinks = () => (
    <>
    <li>
        <Link
          href={"/"}
          className={pathname === "/" ? "text-orange-400" : "text-black"}
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href={"/blogs"}
          className={pathname === "/blogs" ? "text-orange-400" : "text-black"}
        >
          Blogs
        </Link>
      </li>
      <li>
        <Link
          href={"/about"}
          className={pathname === "/about" ? "text-orange-400" : "text-black"}
        >
          About
        </Link>
      </li>
      <li>
        <Link
          href={"/contact"}
          className={pathname === "/contact" ? "text-orange-400" : "text-black"}
        >
          Contact Us
        </Link>
      </li>
    </>
  );

  return (
    <nav className="navbar sticky top-0 z-50 h-20 bg-base-100 shadow-sm">
      <div className="flex container mx-auto">
        <div className="navbar-start">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal font-semibold px-1">
            {navLinks()}
          </ul>
        </div>

        <div className="navbar-end">
          <UserMenu session={session} signOut={signOut} />
        </div>
      </div>
    </nav>
  );
}
