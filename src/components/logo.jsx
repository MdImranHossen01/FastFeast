import Image from "next/image";
import React from "react";

export default function Logo() {
  return (
    <div className="flex items-center">
      <Image
        src="/fastFeastLogo.png"
        width={70}
        height={70}
        alt="logo"
        priority
        className="w-12   sm:w-14  "
      />

      <p className="text-2xl font-bold sm:text-3xl">
        {" "}
        <span className="text-red-700 ">Fast</span>
        <span className="bg-gradient-to-r from-orange-600   to-orange-400 bg-clip-text text-transparent ">
          Feast
        </span>
      </p>
    </div>
  );
}
