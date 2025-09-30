"use client";

import React, { useState } from "react";
import { FaEye, FaTrash, FaBan, FaPlus } from "react-icons/fa";

export default function ManageRiders() {
  const [search, setSearch] = useState("");
  const [selectedRider, setSelectedRider] = useState(null);

  const riders = [
    { id: 1, name: "Rafiul Islam", email: "rafiul@example.com", phone: "+880 1711-000111", status: "Active", joined: "2025-01-12" },
    { id: 2, name: "Jerin Akter", email: "jerin@example.com", phone: "+880 1712-000222", status: "Blocked", joined: "2025-02-05" },
    { id: 3, name: "Hasan Mahmud", email: "hasan@example.com", phone: "+880 1713-000333", status: "Active", joined: "2025-03-20" },
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
        <h2 className="text-2xl font-bold">Manage Riders</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search rider..."
            className="input input-bordered input-sm w-full md:w-64 bg-gray-200"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-sm btn-primary">
            <FaPlus /> Add Rider
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="table w-full text-black">
          <thead className="bg-gray-200 text-black">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Joined</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredRiders.length > 0 ? (
              filteredRiders.map((rider, index) => (
                <tr key={rider.id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.phone}</td>
                  <td>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        rider.status === "Active" ? "text-green-700" : "text-red-700"
                      }`}
                    >
                      {rider.status}
                    </span>
                  </td>
                  <td>{rider.joined}</td>
                  <td className="flex gap-2 justify-center">
                    <label
                      htmlFor="view-rider-modal"
                      className="btn btn-sm btn-outline btn-info"
                      onClick={() => setSelectedRider(rider)}
                    >
                      <FaEye /> View
                    </label>
                    <button className="btn btn-sm btn-outline btn-neutral">
                      <FaTrash /> Delete
                    </button>
                    <button className="btn btn-sm btn-outline hover:text-red-500">
                      <FaBan /> Block
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  No riders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* View Rider Modal */}
      <input type="checkbox" id="view-rider-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-gray-200">
          <h3 className="font-bold text-lg mb-4">Rider Details</h3>
          {selectedRider ? (
            <div className="space-y-2">
              <p><span className="font-medium">Name:</span> {selectedRider.name}</p>
              <p><span className="font-medium">Email:</span> {selectedRider.email}</p>
              <p><span className="font-medium">Phone:</span> {selectedRider.phone}</p>
              <p><span className="font-medium">Status:</span> {selectedRider.status}</p>
              <p><span className="font-medium">Joined:</span> {selectedRider.joined}</p>
            </div>
          ) : (
            <p>No rider selected</p>
          )}
          <div className="modal-action">
            <label htmlFor="view-rider-modal" className="btn btn-sm">Close</label>
          </div>
        </div>
        <label className="modal-backdrop" htmlFor="view-rider-modal"></label>
      </div>
    </div>
  );
}
