"use client";
import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

export default function PendingRestaurants({ restaurants, setRestaurants }) {
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

  const pendingList = restaurants.filter(
    (restaurant) => restaurant.approved === false
  );

  return (
    <div>
      {pendingList.length > 0 ? (
        <div className="overflow-x-auto rounded-lg  shadow-md py-2 bg-white dark:bg-gray-900">
          <table className="table w-full">
            {/* head */}
            <thead className="hidden md:table-header-group bg-gray-100 dark:bg-gray-800">
              <tr className="text-sm block md:table-row text-gray-700 dark:text-gray-300 text-left">
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
              {pendingList.map((restaurant, index) => (
                <tr
                  key={restaurant._id}
                  className="block md:table-row border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
                >
                  <td className="block md:table-cell py-1 px-4">
                    <span className="md:hidden font-semibold"># </span>
                    {index + 1}
                  </td>

                  {/* Mobile View */}
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

                  {/* Desktop Logo */}
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
                    {restaurant.status === "approved" ? (
                      <span className="text-green-500 dark:text-green-400 border border-green-500 dark:border-none bg-green-50 dark:bg-green-900/30 py-0.5 px-2 rounded-full">
                        Approved
                      </span>
                    ) : restaurant.status === "rejected" ? (
                      <span className="text-red-500 dark:text-red-400 border border-red-500 dark:border-none bg-red-50 dark:bg-red-900/30 py-0.5 px-2 rounded-full">
                        Rejected
                      </span>
                    ) : (
                      <span className="text-yellow-500 dark:text-yellow-400 border border-yellow-500 dark:border-none bg-yellow-50 dark:bg-yellow-900/30 py-0.5 px-2 rounded-full">
                        Pending
                      </span>
                    )}
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
                        <button className="btn btn-xs md:btn-sm rounded-full border border-orange-500 dark:border-none bg-orange-50 dark:bg-orange-900/30 text-orange-500 hover:bg-orange-400 hover:text-white flex items-center gap-1 shadow-none">
                          <AiOutlineEye size={16} /> View
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(restaurant._id, "approved")
                          }
                          className="btn btn-xs md:btn-sm rounded-full border border-green-500 dark:border-none text-green-500 bg-green-50 dark:bg-green-900/30 hover:bg-green-400 hover:text-white flex items-center gap-1 shadow-none"
                        >
                          <AiOutlineCheck size={16} /> Approve
                        </button>
                      </div>

                      <div
                        onClick={() =>
                          handleStatusChange(restaurant._id, "rejected")
                        }
                        className="flex gap-2"
                      >
                        <button className="btn btn-xs md:btn-sm rounded-full bg-red-50 dark:bg-red-900/30 border border-red-500 dark:border-none text-red-500 hover:bg-red-400 hover:text-white flex items-center gap-1 shadow-none">
                          <AiOutlineClose size={16} /> Reject
                        </button>
                        <button className="btn btn-xs md:btn-sm rounded-full flex items-center gap-1 bg-gray-100 dark:bg-gray-800 border border-gray-500 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-500 shadow-none hover:text-white">
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
