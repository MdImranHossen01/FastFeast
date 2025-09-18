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
    </>
  );

  return (
    <nav className="navbar top-0 fixed z-50 h-20 bg-base-100 shadow-sm">
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
