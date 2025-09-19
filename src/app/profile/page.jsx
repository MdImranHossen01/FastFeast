"use client";

import { useSession } from "next-auth/react";
import bg from "../../assets/ProfilePage/profile-cover.jpg";

export default function ProfilePage() {
  const { data: session } = useSession();

  //this states have to replace with data from database. 
  const stats = {
    reviews: 7,
    photos: 13,
    followers: 3,
  };

  return (
    <div className="px-[5%] sm:px-[12%] mx-auto min-h-screen">
      {/* Cover Photo */}
      <div
        className="relative h-48 sm:h-68 w-full bg-cover bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${bg.src})` }}
      >
        <div className="absolute bottom-8 left-8 flex items-center gap-4">
          {/* Profile Image */}
          <img src={
            session?.user?.image ||
            "https://cdn-icons-png.flaticon.com/512/747/747545.png"
          }
          alt={session?.user?.name || "User"}
          width={100}
          height={100}
          className="rounded-full border-4 border-white shadow-lg w-20 h-20 sm:w-24 sm:h-24 md:w-45 md:h-45 object-cover"
          />

          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-white drop-shadow-lg">
              {session?.user?.name || "Guest User"}
            </h2>
          </div>
        </div>
        <button className="absolute top-4 right-4 sm:right-6 bg-gray-600 text-white px-2 text-sm sm:text-base cursor-pointer rounded shadow">
          Edit Profile
        </button>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap justify-center sm:justify-end gap-6 mt-3 text-gray-700 dark:text-gray-200">
        <div>
          <span className="font-bold">{stats.reviews}</span> Reviews
        </div>
        <div>
          <span className="font-bold">{stats.photos}</span> Photos
        </div>
        <div>
          <span className="font-bold">{stats.followers}</span> Followers
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mt-6">
        {/* Sidebar */}
        <div className="w-full sm:w-1/4 space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-md shadow p-3">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Activity
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="text-red-500 font-medium">Reviews</li>
              <li>Photos</li>
              <li>Followers</li>
              <li>Recently Viewed</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-md shadow p-3">
            <h3 className="font-semibold mb-2">Online Ordering</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400">
              <li>My addresses</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-md shadow p-3">
            <h3 className="font-semibold mb-2">Payments</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400">
              <li>Manage Cards</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-md shadow p-3">
            <h3 className="font-semibold mb-2">Table Booking</h3>
            <ul className="text-sm text-gray-600 dark:text-gray-400">
              <li>Your Bookings</li>
            </ul>
          </div>
        </div>

        {/* Main Section */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-md shadow p-6 text-center">
          <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-6">
            Reviews
          </h2>
          <div className="flex flex-col items-center justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/747/747376.png"
              alt="No Reviews"
              width={80}
              height={80}
              className="opacity-70"
            />
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Nothing here yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
