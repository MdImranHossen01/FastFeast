import React from "react";

export default function ViewApproved({ restaurants }) {
  const viewDetails = restaurants.find(
    (restaurant) => restaurant._id === isOpen
  );
  if (!viewDetails) return <p>Restaurants details not found</p>;
  return (
    <div>
      {" "}
      <div className="flex flex-col justify-center items-center">
        <img
          src={viewDetails.logo}
          alt="logo"
          className="w-36 h-36 object-cover"
        />
        <h3 className="font-bold">{viewDetails.name}</h3>
        <h3 className=" ">Status:{viewDetails.status}</h3>
      </div>
    </div>
  );
}
