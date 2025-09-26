import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-t-orange-500 border-gray-200 rounded-full animate-spin mb-6"></div>

      {/* Bounce dots */}
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-75"></div>
        <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-orange-500 rounded-full animate-bounce delay-300"></div>
      </div>

      {/* Loading text */}
      <p className="mt-4 text-orange-500 font-semibold text-lg animate-pulse">
        Loading...
      </p>
    </div>
  );
}
