"use client";

import React, { useState } from "react";
import { FaEye, FaTrash, FaBan, FaPlus } from "react-icons/fa";

export default function ManageRiders() {
  const [search, setSearch] = useState("");
  const [selectedRider, setSelectedRider] = useState(null);

  const riders = [
    {
      id: 1,
      name: "Rafiul Islam",
      email: "rafiul@example.com",
      phone: "+880 1711-000111",
      status: "Active",
      joined: "2025-01-12",
    },
    {
      id: 2,
      name: "Jerin Akter",
      email: "jerin@example.com",
      phone: "+880 1712-000222",
      status: "Blocked",
      joined: "2025-02-05",
    },
    {
      id: 3,
      name: "Hasan Mahmud",
      email: "hasan@example.com",
      phone: "+880 1713-000333",
      status: "Active",
      joined: "2025-03-20",
    },
  ];

  const filteredRiders = riders.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.phone.includes(search)
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Manage Riders
        </h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search rider..."
            className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm shadow transition">
            <FaPlus /> Add Rider
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr className="text-gray-700 dark:text-gray-300 text-left">
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Phone</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Joined</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRiders.length > 0 ? (
              filteredRiders.map((rider, index) => (
                <tr
                  key={rider.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 transition"
                >
                  <td className="py-3 px-4">{index + 1}</td>
                  <td className="py-3 px-4 font-medium text-gray-800 dark:text-gray-100">
                    {rider.name}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {rider.email}
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {rider.phone}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rider.status === "Active"
                          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                          : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {rider.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 dark:text-gray-300">
                    {rider.joined}
                  </td>
                  <td className="py-3 px-4 flex gap-2 justify-center">
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900 transition text-sm"
                      onClick={() => setSelectedRider(rider)}
                    >
                      <FaEye /> View
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition text-sm">
                      <FaTrash /> Delete
                    </button>
                    <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900 transition text-sm">
                      <FaBan /> Block
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-4 text-gray-500 dark:text-gray-400"
                >
                  No riders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Rider Modal */}
      {selectedRider && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg max-w-md w-full">
            <h3 className="font-bold text-lg mb-4 text-gray-800 dark:text-white">
              Rider Details
            </h3>
            <div className="space-y-2 text-gray-700 dark:text-gray-300">
              <p>
                <span className="font-medium">Name:</span> {selectedRider.name}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {selectedRider.email}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {selectedRider.phone}
              </p>
              <p>
                <span className="font-medium">Status:</span>{" "}
                {selectedRider.status}
              </p>
              <p>
                <span className="font-medium">Joined:</span>{" "}
                {selectedRider.joined}
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedRider(null)}
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-sm transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
