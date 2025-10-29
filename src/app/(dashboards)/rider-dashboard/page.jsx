"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Assuming you're using Next.js Link for navigation

export default function RiderDashboard() {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [earnings, setEarnings] = useState({ today: 0, week: 0, total: 0 });
  const [riderProfile, setRiderProfile] = useState({
    name: "John Doe",
    vehicle: "Motorcycle (ABC-123)",
    rating: 4.8,
    status: "Online",
  });

  // Simulate fetching data
  useEffect(() => {
    // In a real app, you'd fetch this from your backend
    const fetchRiderData = async () => {
      // Dummy data for demonstration
      const dummyCurrentOrders = [
        {
          id: "ORD001",
          customerName: "Alice Smith",
          pickupAddress: "123 Main St, Anytown",
          deliveryAddress: "456 Oak Ave, Anytown",
          status: "Picking Up",
          eta: "10 mins",
          earning: 5.5,
        },
        {
          id: "ORD002",
          customerName: "Bob Johnson",
          pickupAddress: "789 Pine Ln, Anytown",
          deliveryAddress: "101 Elm St, Anytown",
          status: "Delivering",
          eta: "25 mins",
          earning: 7.25,
        },
      ];

      const dummyCompletedOrders = [
        {
          id: "ORD003",
          customerName: "Charlie Brown",
          pickupAddress: "222 Maple Dr, Anytown",
          deliveryAddress: "333 Birch Rd, Anytown",
          status: "Delivered",
          completedAt: "2023-10-26 14:30",
          earning: 6.0,
        },
      ];

      const dummyEarnings = {
        today: 25.75,
        week: 150.2,
        total: 1500.5,
      };

      setCurrentOrders(dummyCurrentOrders);
      setCompletedOrders(dummyCompletedOrders);
      setEarnings(dummyEarnings);
    };

    fetchRiderData();
  }, []);

  const handleToggleStatus = () => {
    setRiderProfile((prev) => ({
      ...prev,
      status: prev.status === "Online" ? "Offline" : "Online",
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="bg-white shadow p-4 rounded-lg mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Rider Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              riderProfile.status === "Online"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            Status: {riderProfile.status}
          </span>
          <button
            onClick={handleToggleStatus}
            className={`px-4 py-2 rounded-md text-white ${
              riderProfile.status === "Online"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            Go {riderProfile.status === "Online" ? "Offline" : "Online"}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Profile Card */}
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-lg font-medium text-gray-700 mb-2">My Profile</h2>
          <div className="text-sm text-gray-600">
            <p>
              <strong>Name:</strong> {riderProfile.name}
            </p>
            <p>
              <strong>Vehicle:</strong> {riderProfile.vehicle}
            </p>
            <p>
              <strong>Rating:</strong> {riderProfile.rating} ⭐
            </p>
            <Link
              href="/rider/profile"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              Edit Profile
            </Link>
          </div>
        </div>

        {/* Earnings Card */}
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-lg font-medium text-gray-700 mb-2">Earnings</h2>
          <div className="text-sm text-gray-600">
            <p>
              <strong>Today:</strong> ${earnings.today.toFixed(2)}
            </p>
            <p>
              <strong>This Week:</strong> ${earnings.week.toFixed(2)}
            </p>
            <p>
              <strong>Total:</strong> ${earnings.total.toFixed(2)}
            </p>
            <Link
              href="/rider/earnings"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              View Details
            </Link>
          </div>
        </div>

        {/* Quick Stats/Alerts */}
        <div className="bg-white shadow p-4 rounded-lg">
          <h2 className="text-lg font-medium text-gray-700 mb-2">
            Quick Stats
          </h2>
          <div className="text-sm text-gray-600">
            <p>
              <strong>Active Orders:</strong> {currentOrders.length}
            </p>
            <p>
              <strong>New Notifications:</strong> 0
            </p>
            <p>
              <strong>Next Payout:</strong> Tomorrow
            </p>
            <Link
              href="/rider/notifications"
              className="text-blue-500 hover:underline mt-2 inline-block"
            >
              View Notifications
            </Link>
          </div>
        </div>
      </div>

      {/* Current Orders Section */}
      <section className="bg-white shadow p-4 rounded-lg mb-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Current Orders
        </h2>
        {currentOrders.length > 0 ? (
          <div className="space-y-4">
            {currentOrders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-md p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    Order #{order.id} - {order.customerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Pickup: {order.pickupAddress}
                  </p>
                  <p className="text-sm text-gray-600">
                    Delivery: {order.deliveryAddress}
                  </p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.status === "Picking Up"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                  <p className="text-sm text-gray-700 mt-1">ETA: {order.eta}</p>
                  <p className="font-semibold text-green-600">
                    ${order.earning.toFixed(2)}
                  </p>
                  <button className="mt-2 px-3 py-1 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
                    View Map
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">
            No active orders at the moment. Go online to receive requests!
          </p>
        )}
      </section>

      {/* Completed Orders Section */}
      <section className="bg-white shadow p-4 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Completed Orders
        </h2>
        {completedOrders.length > 0 ? (
          <div className="space-y-4">
            {completedOrders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-md p-3 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    Order #{order.id} - {order.customerName}
                  </p>
                  <p className="text-sm text-gray-600">
                    Delivered on: {order.completedAt}
                  </p>
                </div>
                <div className="text-right">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {order.status}
                  </span>
                  <p className="font-semibold text-green-600 mt-1">
                    ${order.earning.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No completed orders yet.</p>
        )}
      </section>
    </div>
  );
}
