"use client";

import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import updateRestaurantById from "@/app/actions/restaurants/updateRestaurantById";
import Image from "next/image";
import updateUserRole from "@/app/actions/users/updateUserRole";

export default function PendingRestaurants({
  restaurants,
  setRestaurants,
  handleModal,
}) {
  // approve and reject button
  const handleStatusChange = async (id, action) => {
    try {
      let body = {};
      if (action === "approved") {
        body = { status: "approved" };
      } else if (action === "rejected") {
        body = { status: "rejected" };
      }

      const res = await updateRestaurantById(id, body);
      await updateUserRole(id, "restaurantOwner");
      if (!res.success) throw new Error("Failed to update");
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
    (restaurant) =>
      restaurant.status === "pending" || restaurant.status === "rejected"
  );

  return (
    <div>
      {pendingList.length > 0 ? (
        <div className="py-2 overflow-x-auto rounded-xl border-2 dark:border-gray-700 border-gray-200 shadow-md bg-transparent dark:bg-gray-900">
          <table className="table w-full">
            {/* head */}
            <thead className="hidden md:table-header-group   dark:bg-gray-800">
              <tr className="text-sm block md:table-row  text-gray-700 dark:text-gray-300 text-left border-b-2 border-b-gray-200 dark:border-b-gray-700 ">
                <th className="px-4">#</th>
                <th className="px-4">RESTAURANT LOGO</th>
                <th className="px-4">RESTAURANT NAME</th>

                <th className="px-4">STATUS</th>
                <th className="px-4">Active</th>
                <th className="px-4 text-center w-[150px]">ACTIONS</th>
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
                    <div className="flex relative flex-col items-center gap-2">
                      <Image
                        className="bg-gray-50 dark:bg-gray-500  w-12 h-12 rounded-full object-cover"
                        src={restaurant.logo}
                        alt="logo"
                        fill
                      />
                      <span className="font-bold">{restaurant.name}</span>
                    </div>
                  </td>

                  {/* Desktop Logo */}
                  <td className="px-4 relative hidden md:table-cell">
                    <Image
                      className="bg-gray-50 dark:bg-gray-500 w-12 h-12 rounded-full object-cover"
                      src={restaurant.logo}
                      alt="logo"
                      fill
                    />
                  </td>

                  <td className="px-4 font-medium hidden md:table-cell">
                    {restaurant.name}
                  </td>

                  <td className="px-4 block md:table-cell py-1">
                    <span className="md:hidden font-semibold">Status: </span>
                    {restaurant.status === "rejected" ? (
                      <span className="text-red-500 dark:text-red-400 md:border md:border-red-500 dark:border-none bg-red-50 dark:bg-red-900/30 py-0 md:py-0.5 px-2 rounded-full">
                        Rejected
                      </span>
                    ) : (
                      <span className="text-yellow-500 dark:text-yellow-400 md:border md:border-yellow-500 dark:border-none bg-yellow-50 dark:bg-yellow-900/30 py-0 md:py-0.5 px-2 rounded-full">
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
                    <div className="flex justify-center  items-center gap-2 pb-2 md:pb-0">
                      <div className="flex gap-2">
                        <button
                          className="btn btn-xs md:btn-sm rounded-full border border-orange-500 dark:border-none bg-orange-50 dark:bg-orange-900/30 text-orange-500 hover:bg-orange-400 hover:text-white flex items-center gap-1 shadow-none"
                          onClick={() => {
                            handleModal(restaurant._id);
                          }}
                        >
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
