"use client";
import React, { useState } from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import Swal from "sweetalert2";
// import ViewDetails from "./viewPending";
import updateRestaurantById from "@/app/actions/restaurants/updateRestaurantById";
import Image from "next/image";

export default function ApprovedRestaurants({
  restaurants,
  setRestaurants,

  handleModal,
}) {
  // for approve and reject button
  const handleStatusChange = async (id, action) => {
    try {
      let body = {};
      if (action === "approved") {
        body = { status: "approved" };
      } else if (action === "rejected") {
        body = { status: "rejected" };
      }

      const res = await updateRestaurantById(id, body);
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

  const approvedList = restaurants.filter(
    (restaurant) => restaurant.status === "approved"
  );

  return (
    <div>
      {approvedList.length > 0 ? (
        <div className="py-2 overflow-x-auto rounded-xl border-2 border-gray-200 dark:border-gray-700 shadow-md bg-transparent dark:bg-gray-900">
          <table className="table w-full   ">
            {/* Table Header */}
            <thead className="hidden md:table-header-group   dark:bg-gray-800">
              <tr className="text-sm block md:table-row  text-gray-700 dark:text-gray-300 text-left md:border-b-2 md:border-b-gray-200 dark:border-b-gray-700   ">
                <th className="px-4">#</th>
                <th className="px-4">RESTAURANT LOGO</th>
                <th className="px-4">RESTAURANT NAME</th>

                <th className="px-4">STATUS</th>
                <th className="px-4">Active</th>
                <th className="px-4 text-center w-[150px]">ACTIONS</th>
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
                    <div className="flex relative flex-col  items-center gap-2">
                      <Image
                        className="bg-gray-100 dark:bg-gray-500 w-12 h-12 rounded-full object-cover"
                        src={restaurant.logo}
                        fill
                        alt="logo"
                      />
                      <span className="font-bold">{restaurant.name}</span>
                    </div>
                  </td>

                  {/* Desktop View Logo */}
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
                    <span className="text-green-500 dark:text-green-400 md:border md:border-green-500 dark:border-none bg-green-50 dark:bg-green-900/30 py-0 md:py-0.5 px-2 rounded-full">
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
                    <div className="flex md:flex-row items-center justify-center   gap-2 pb-2 md:pb-0">
                      <button
                        className="btn btn-xs md:btn-sm rounded-full border border-orange-500 dark:border-none bg-orange-50 dark:bg-orange-900/30 text-orange-500 hover:bg-orange-400 hover:text-white shadow-none"
                        onClick={() => {
                          handleModal(restaurant._id);
                        }}
                      >
                        <AiOutlineEye size={16} /> View
                      </button>

                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleStatusChange(restaurant._id, "rejected")
                          }
                          className="btn btn-xs md:btn-sm rounded-full bg-red-50 dark:bg-red-900/30 border border-red-500 dark:border-none text-red-500 hover:bg-red-400 hover:text-white shadow-none"
                        >
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
