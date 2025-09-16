import React from "react";

export default function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-4">
          Blog Page
        </h1>
        <p className="text-lg text-gray-700">
          This is a sample blog page. You can add articles, stories, or posts here.
        </p>
      </div>
    </main>
  );
}
