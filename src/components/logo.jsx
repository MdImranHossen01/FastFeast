import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Logo() {
  return (
    <Link href={"/"} className="flex items-center">
      <Image
        src="/fastFeastLogo.png"
        width={70}
        height={70}
        alt="logo"
        priority
        className="w-14 lg:w-16  "
      />

      <div className="text-2xl font-bold lg:text-4xl">
        <span className="text-red-700">Fast</span>
        <span className="bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
          Feast
        </span>
      </div>
    </Link>
  );
}
