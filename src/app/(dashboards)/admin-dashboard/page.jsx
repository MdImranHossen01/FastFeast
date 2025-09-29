"use client";
import React from "react";
import StatsCards from "./components/StatsCards";
import RecentActivities from "./components/RecentActivities";
import TopRestaurants from "./components/TopRestaurants";

export default function AdminHomePage() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
        Admin Dashboard Overview
      </h1>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivities />
        <TopRestaurants />
      </div>
    </div>
  );
}
