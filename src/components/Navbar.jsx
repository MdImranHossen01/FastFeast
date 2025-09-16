"use client";
import Link from "next/link";
import React from "react";
import Logo from "./logo";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const navMenu = () => {
    const pathname = usePathname();
    return (
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
  };

  return (
    <div>
      <div className="navbar top-0 fixed z-50 h-20 bg-base-100 shadow-sm">
        <div className="flex container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow font-semibold  "
              >
                {navMenu()}
              </ul>
            </div>
            <Link href={"/"}>
              <Logo />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal font-semibold    px-1">
              {navMenu()}
            </ul>
          </div>
          <div className="navbar-end">
            <Link href={"/login"} className="btn bg-orange-400 text-white">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
