"use client";
import React from "react";

export default function DeliveryStatusSummary() {
  const stats = [
    { label: "Ongoing Deliveries", value: 112, color: "bg-blue-500" },
    { label: "Delivered Today", value: 254, color: "bg-green-500" },
    { label: "Cancelled Orders", value: 15, color: "bg-red-500" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, i) => (
        <div
          key={i}
          className={`p-5 rounded-xl shadow text-white ${stat.color}`}
        >
          <h3 className="text-sm">{stat.label}</h3>
          <p className="text-3xl font-bold mt-2">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
