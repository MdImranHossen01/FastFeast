"use client";
import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

export default function ApprovedRestaurants({ restaurants, setRestaurants }) {
  const handleStatusChange = async (id, action) => {
    try {
      let body = {};
      if (action === "approved") {
        body = { approved: true, status: "approved" };
      } else if (action === "rejected") {
        body = { approved: false, status: "rejected" };
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/api/restaurant?id=${id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) throw new Error("Failed to update");
      // update state
      setRestaurants((prev) =>
        prev.map((restaurant) =>
          restaurant._id === id ? { ...restaurant, ...body } : restaurant
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const approvedList = restaurants.filter(
    (restaurant) => restaurant.approved === true
  );

  return (
    <div>
      {approvedList.length > 0 ? (
        <div className="py-2 overflow-x-auto rounded-xl shadow-md bg-white dark:bg-gray-900">
          <table className="table w-full">
            {/* Table Header */}
            <thead className="hidden md:table-header-group bg-gray-100 dark:bg-gray-800">
              <tr className="text-sm block md:table-row  text-gray-700 dark:text-gray-300 text-left">
                <th className="px-4">#</th>
                <th className="px-4">Restaurant Logo</th>
                <th className="px-4">Restaurant Name</th>
                <th className="px-4">Owner Email</th>
                <th className="px-4">Status</th>
                <th className="px-4">Active</th>
                <th className="px-4 text-center w-[150px]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {approvedList.map((restaurant, index) => (
                <tr
                  key={restaurant._id}
                  className="block md:table-row border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  <td className="block md:table-cell py-1 px-4">
                    <span className="md:hidden font-semibold"># </span>
                    {index + 1}
                  </td>

                  {/* Mobile View - Logo & Name */}
                  <td className="block md:hidden py-1">
                    <div className="flex items-center gap-2">
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={restaurant.logo}
                        alt="logo"
                      />
                      <span className="font-bold">{restaurant.name}</span>
                    </div>
                  </td>

                  {/* Desktop View Logo */}
                  <td className="px-4 hidden md:table-cell">
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src={restaurant.logo}
                      alt="logo"
                    />
                  </td>

                  <td className="px-4 font-medium hidden md:table-cell">
                    {restaurant.name}
                  </td>

                  <td className="px-4 block md:table-cell py-1">
                    <span className="md:hidden font-semibold">
                      Owner Email:{" "}
                    </span>
                    {restaurant.ownerEmail}
                  </td>

                  <td className="px-4 block md:table-cell py-1">
                    <span className="md:hidden font-semibold">Status: </span>
                    <span className="text-green-500 dark:text-green-400 border border-green-500 dark:border-none bg-green-50 dark:bg-green-900/30 py-0.5 px-2 rounded-full">
                      Approved
                    </span>
                  </td>

                  <td className="px-4 block md:table-cell py-1">
                    <span className="md:hidden font-semibold">Active: </span>
                    {restaurant.isActive ? (
                      <span className="text-green-500 dark:text-green-400 font-medium">
                        Active
                      </span>
                    ) : (
                      <span className="text-red-500 dark:text-red-400 font-medium">
                        Inactive
                      </span>
                    )}
                  </td>

                  <td className="px-4 block md:table-cell py-1">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                      <div className="flex gap-2">
                        <button className="btn btn-xs md:btn-sm rounded-full border border-orange-500 dark:border-none bg-orange-50 dark:bg-orange-900/30 text-orange-500 hover:bg-orange-400 hover:text-white shadow-none">
                          <AiOutlineEye size={16} /> View
                        </button>
                        {/* <button
                          onClick={() =>
                            handleStatusChange(restaurant._id, "approved")
                          }
                          className="btn btn-xs md:btn-sm rounded-full border border-green-500 dark:border-none text-green-500 bg-green-50 dark:bg-green-900/30 shadow-none hover:bg-green-400 hover:text-white"
                        >
                          <AiOutlineCheck size={16} /> Approve
                        </button> */}
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusChange(restaurant._id, "rejected")
                          }
                          className="btn btn-xs md:btn-sm rounded-full bg-red-50 dark:bg-red-900/30 border border-red-500 dark:border-none text-red-500 hover:bg-red-400 hover:text-white shadow-none"
                        >
                          <AiOutlineClose size={16} /> Reject
                        </button>
                        <button className="btn btn-xs md:btn-sm rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-500 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-500 shadow-none hover:text-white">
                          <MdDeleteOutline size={16} /> Delete
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-5 text-gray-700 dark:text-gray-300">
          No more restaurants
        </div>
      )}
    </div>
  );
}
