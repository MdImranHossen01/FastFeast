import React from "react";
import { AiOutlineCheck, AiOutlineClose, AiOutlineEye } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";

export default function ApprovedRestaurants({ restaurants }) {
  return (
    <div>
      {" "}
      {restaurants.filter((restaurant) => restaurant.status === "approved")
        .length > 0 ? (
        <div className="py-2 overflow-x-auto rounded-xl shadow-md  ">
          <table className="table  ">
            {/* head */}
            <thead className="hidden md:table-header-group bg-gray-100 dark:bg-gray-800  ">
              <tr
                className="text-sm block md:table-row text-gray-700 dark:text-gray-300
            text-left "
              >
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
              {/* row 1 */}

              {restaurants
                .filter((restaurant) => restaurant.status === "approved")
                .map((restaurant, index) => (
                  <tr
                    key={restaurant.id}
                    className="block md:table-row border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-950"
                  >
                    <td className="block md:table-cell py-1">
                      <span className="md:hidden font-semibold">#</span>
                      {index + 1}
                    </td>
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
                    <th className="px-4 hidden md:table-cell  ">
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        src={restaurant.logo}
                        alt="logo"
                      />
                    </th>

                    <td className="px-4 font-medium hidden md:table-cell ">
                      {restaurant.name}
                    </td>
                    <td className="px-4 block md:table-cell py-1">
                      <span className="md:hidden font-semibold">
                        Owner Email ID :
                      </span>
                      {restaurant.ownerEmail}
                    </td>

                    <td className="px-4 block md:table-cell py-1">
                      <span className="md:hidden font-semibold">Status :</span>{" "}
                      {restaurant.status === "approved" ? (
                        <span className="text-green-500 border dark:border-none bg-green-50 py-0.5 px-2 rounded-full">
                          Approved
                        </span>
                      ) : (
                        <span className="text-yellow-500  border  dark:border-none   bg-yellow-50 py-0.5 px-2 rounded-full hidden">
                          Pending
                        </span>
                      )}
                    </td>
                    <td className="px-4 block md:table-cell py-1">
                      <span className="md:hidden font-semibold">Active : </span>
                      {restaurant.isActive === true ? (
                        <span className="text-green-400 font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="text-red-400 font-medium">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="px-4 block md:table-cell py-1">
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-2 ">
                        <div className=" flex gap-2">
                          <button
                            className="btn  
                    btn-xs 
                    md:btn-sm rounded-full border dark:border-none border-orange-500 flex items-center gap-1 bg-orange-50   text-orange-500 hover:text-white hover:bg-orange-400"
                          >
                            <AiOutlineEye size={16} /> View
                          </button>
                          <button
                            className="btn btn-xs 
                    md:btn-sm rounded-full border dark:border-none border-green-500 text-green-500 hover:bg-green-400 hover:text-white  flex items-center gap-1"
                          >
                            <AiOutlineCheck size={16} /> Approve
                          </button>
                        </div>
                        <div className=" flex gap-2">
                          {" "}
                          <button
                            className="btn btn-xs 
                    md:btn-sm rounded-full bg-red-50 border dark:border-none border-red-500 text-red-500 hover:bg-red-400 hover:text-white flex items-center gap-1"
                          >
                            <AiOutlineClose size={16} /> Reject
                          </button>
                          <button
                            className="btn btn-xs 
                    md:btn-sm rounded-full flex items-center gap-1 bg-gray-100
  border dark:border-none border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white   "
                          >
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
        <div>No more restaurants</div>
      )}
    </div>
  );
}
