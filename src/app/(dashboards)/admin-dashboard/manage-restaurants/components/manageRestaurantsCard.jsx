"use client";
import React, { useState } from "react";
import PendingRestaurants from "./pendingRestaurants";
import ApprovedRestaurants from "./approvedRestaurants";
import Swal from "sweetalert2";
import ViewApproved from "./viewModal";
import ViewModal from "./viewModal";
import deleteRestaurantById from "@/app/actions/restaurants/deleteMenuById";

export default function ManageRestaurantsCard({ restaurants }) {
  const [allRestaurants, setAllRestaurants] = useState(restaurants);
  const [search, setSearch] = useState("");
  // modal
  const [isOpen, setIsOpen] = useState(false);

  // search
  let filteredRestaurants = allRestaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name
      .toLocaleLowerCase()
      .includes(search.trim().toLocaleLowerCase());
    return matchesSearch;
  });

  // open modal
  const handleModal = (_id) => {
    document.getElementById("my_modal_2").showModal();
    setIsOpen(_id);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h2 className="text-2xl sm:text-3xl font-bold dark:text-white py-1 pt-4 text-left">
          Manage Restaurants
        </h2>
        {/* search */}
        <input
          type="text"
          placeholder="search restaurant..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            input input-bordered 
            bg-gray-100 text-gray-800 
            dark:bg-gray-800 dark:text-gray-200 
            border-gray-300 dark:border-gray-600 py-1
       mt-4 md:w-[400px] lg:w-[500px] "
        />
      </div>

      {/* Pending Restaurant Requests */}
      <h2 className="text-2xl text-center font-bold dark:text-white py-5">
        Pending Restaurant Requests
      </h2>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg">
        <PendingRestaurants
          restaurants={filteredRestaurants}
          setRestaurants={setAllRestaurants}
          handleModal={handleModal}
        />
      </div>

      {/* Approved Restaurants */}
      <h2 className="text-2xl text-center font-bold dark:text-white py-9">
        Approved Restaurants
      </h2>
      <div className="bg-white dark:bg-gray-800    rounded-xl shadow-lg">
        <ApprovedRestaurants
          restaurants={filteredRestaurants}
          setRestaurants={setAllRestaurants}
          handleModal={handleModal}
        />
      </div>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box   overflow-auto">
          {isOpen && (
            <ViewModal
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              restaurants={restaurants}
            ></ViewModal>
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}
