"use client";

import React from "react";
import login_animation from "../../../public/lottie/DATA SECURITY.json";
import Lottie from "lottie-react";

export default function AuthLayout({ children }) {
  return (
    <div className="py-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-70 min-h-screen">
      <div className="flex-1 lg:mt-30 max-w-[50%] md:max-w-[50%] lg:max-w-[100%] mx-auto">
        <Lottie animationData={login_animation} loop={true} />
      </div>
      <div className="flex items-center justify-center">
        <div className="flex-1 px-4 lg:px-0">{children}</div>
      </div>
    </div>
  );
}