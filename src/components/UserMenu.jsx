"use client";

import Link from "next/link";
import React from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function UserMenu({ session, signOut }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut({ redirect: false });

      Swal.fire({
        icon: "success",
        title: "Logged Out",
        text: "You have been logged out successfully",
        timer: 2000,
        showConfirmButton: false,
      });

      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      Swal.fire("Error", err.message || "Logout failed", "error");
    }
  };

  return (
    <div>
      {!session ? (
        <Link href="/login" className="btn bg-orange-400 text-white">
          Login
        </Link>
      ) : (
        <div className="flex items-center gap-2">
          {session.user?.photoUrl && (
            <img src={session.user.photoUrl} className="w-8 h-8 rounded-full" />
          )}
          <span>{session.user.name}</span>

          <button onClick={handleLogout} className="btn bg-red-500 text-white">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
