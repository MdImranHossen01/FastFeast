'use client';

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Logo from "./logo";
import { usePathname } from "next/navigation"; 

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname(); 

  const navMenu = () => (
    <>
      <li><Link href="/blogs" className={pathname === "/blogs" ? "text-orange-400" : "text-black"}>Blogs</Link></li>
      <li><Link href="/about" className={pathname === "/about" ? "text-orange-400" : "text-black"}>About</Link></li>
    </>
  );

  return (
    <div>
     <div className="navbar top-0 fixed z-50 h-20 bg-base-100 shadow-sm">
      <div className="flex container mx-auto">
        <div className="navbar-start">
          <Link href="/"><Logo/></Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal font-semibold px-1">{navMenu()}</ul>
        </div>

        <div className="navbar-end">
          {!session ? (
            <Link href="/login" className="btn bg-orange-400 text-white">Login</Link>
          ) : (
            <div className="flex items-center gap-2">
              {session.user.photoUrl && <img src={session.user.photoUrl} className="w-8 h-8 rounded-full"/>}
              <span>{session.user.name}</span>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="btn bg-red-500 text-white">Logout</button>
            </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}