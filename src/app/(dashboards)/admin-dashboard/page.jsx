"use client";
import React from "react";
import StatsCards from "./components/StatsCards";
import RecentActivities from "./components/RecentActivities";
import TopRestaurants from "./components/TopRestaurants";
import TopRiders from "./components/TopRiders";
import TrendingFoods from "./components/TrendingFoods";
import LiveOrders from "./components/LiveOrders";
import RecentOrders from "./components/RecentOrders";
import DeliverySummary from "./components/DeliverySummary";
import DeliveryStatusSummary from "./components/DeliveryStatusSummary";
import PopularDishes from "./components/PopularDishes";
import CustomerFeedback from "./components/CustomerFeedback";

export default function AdminHomePage() {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
        Admin Dashboard Overview
      </h1>

      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DeliverySummary/>
        <DeliveryStatusSummary/>
        <CustomerFeedback/>
        <LiveOrders />
        <RecentOrders/>
        <RecentActivities />
        <TopRestaurants />
        <TopRiders />
        <TrendingFoods />
        <PopularDishes/>
      </div>
    </div>
  );
}
