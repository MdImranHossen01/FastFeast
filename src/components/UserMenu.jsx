"use client";

import Link from "next/link";
import React from "react";

export default function UserMenu({ session, signOut }) {
  return (
    <div>
      {!session ? (
        <Link href="/login" className="btn bg-orange-400 text-white">
          Login
        </Link>
      ) : (
        <div className="flex items-center gap-2">
          {session.user.photoUrl && (
            <img src={user.photoUrl} className="w-8 h-8 rounded-full" />
          )}
          <span>{session.user.name}</span>

          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="btn bg-red-500 text-white"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
