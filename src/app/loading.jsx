import React from "react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-purple-200 border-t-purple-600 animate-spin"></div>
        {/* Inner dot */}
        <div className="absolute inset-4 rounded-full border-4 border-purple-300 border-t-transparent animate-spin-slow"></div>
      </div>
    </div>
  );
};

export default Loading;
