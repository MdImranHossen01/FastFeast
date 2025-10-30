import React from "react";
import { FaUtensils, FaChartPie, FaUsers, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";

export default function RestaurantDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
        <h2 className="text-xl font-semibold text-gray-700">Restaurant Dashboard</h2>
        <div className="flex items-center gap-4">
          <span className="font-medium text-gray-600">Admin</span>
          <img
            src="https://i.ibb.co/MBtjqXQ/avatar.png"
            alt="Admin Avatar"
            className="w-10 h-10 rounded-full border"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Hero Section */}
        <section className="bg-white py-10 rounded-2xl shadow-sm mb-10 text-center">
          <h1 className="text-4xl font-bold text-primary mb-3">
            Welcome to Fast Feast Dashboard
          </h1>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Track your restaurant’s performance, manage orders, and view real-time analytics — all in one place.
          </p>
          <button className="btn btn-primary">View All Orders</button>
        </section>

        {/* Statistics Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="card bg-white shadow-md p-6 text-center">
            <h4 className="text-sm text-gray-500 mb-1">Total Orders</h4>
            <p className="text-3xl font-semibold text-primary">1,234</p>
          </div>
          <div className="card bg-white shadow-md p-6 text-center">
            <h4 className="text-sm text-gray-500 mb-1">Active Customers</h4>
            <p className="text-3xl font-semibold text-primary">567</p>
          </div>
          <div className="card bg-white shadow-md p-6 text-center">
            <h4 className="text-sm text-gray-500 mb-1">Pending Deliveries</h4>
            <p className="text-3xl font-semibold text-primary">89</p>
          </div>
          <div className="card bg-white shadow-md p-6 text-center">
            <h4 className="text-sm text-gray-500 mb-1">Avg Delivery Time</h4>
            <p className="text-3xl font-semibold text-primary">25 min</p>
          </div>
        </section>

        {/* Recent Orders Table */}
        <section className="bg-white rounded-2xl shadow-sm p-6 mb-10">
          <h2 className="text-2xl font-bold mb-6 text-gray-9800 border-b pb-2">
            🧾 Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className="bg-gray-200 text-gray-800">
                <tr>
                  <th className="text-left">Order ID</th>
                  <th className="text-left">Customer</th>
                  <th className="text-left">Status</th>
                  <th className="text-left">Total</th>
                  <th className="text-left">Placed At</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="hover:bg-gray-100 transition">
                  <td>#12345</td>
                  <td>John Doe</td>
                  <td>
                    <span className="badge badge-info text-white">Pending</span>
                  </td>
                  <td className="font-semibold">৳ 450</td>
                  <td>2025-10-29 09:45</td>
                </tr>
                <tr className="hover:bg-gray-100 transition">
                  <td>#12344</td>
                  <td>Jane Smith</td>
                  <td>
                    <span className="badge badge-success text-white">Delivered</span>
                  </td>
                  <td className="font-semibold">৳ 320</td>
                  <td>2025-10-29 08:30</td>
                </tr>
                <tr className="hover:bg-gray-100 transition">
                  <td>#12343</td>
                  <td>Arif Hasan</td>
                  <td>
                    <span className="badge badge-warning text-white">Preparing</span>
                  </td>
                  <td className="font-semibold">৳ 600</td>
                  <td>2025-10-29 07:55</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Call To Action */}
        <section className="py-10 bg-white rounded-2xl shadow-sm text-center">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            Ready to update your menu?
          </h3>
          <p className="text-gray-700 mb-4 max-w-lg mx-auto">
            Add, edit, or remove items anytime from your dashboard to attract more hungry customers.
          </p>
          <button className="btn btn-primary">Manage Menu</button>
        </section>
      </main>
    </div>
  );
}
