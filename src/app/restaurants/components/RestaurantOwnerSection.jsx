"use client";

import { FaUser, FaCircle } from "react-icons/fa";
import Image from "next/image";
import MessageOwnerButton from "./MessageOwnerButton";

export default function RestaurantOwnerSection({ owner, restaurant }) {
  if (!owner || !owner.name) {
    return (
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-300">
                <FaUser className="text-3xl text-orange-500" />
                {owner.email && (
              <p className="text-gray-600 text-sm">{owner.email}</p>
            )}              {owner?.isOnline && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                  <FaCircle className="text-xs text-white" />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Restaurant Owner</h3>
              <p className="text-gray-700 font-medium">Contact for inquiries</p>
              <p className="text-gray-600 text-sm">Use the message button to contact</p>
            </div>
          </div>
          <MessageOwnerButton owner={owner} restaurant={restaurant} />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            {owner.image ? (
              <Image
                src={owner.image}
                alt={owner.name}
                width={80}
                height={80}
                className="rounded-full border-2 border-orange-300"
              />
            ) : (
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center border-2 border-orange-300">
                <FaUser className="text-3xl text-orange-500" />
              </div>
            )}
            {owner?.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <FaCircle className="text-xs text-white" />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">Restaurant Owner</h3>
            <p className="text-gray-700 font-medium">{owner.name}</p>
            <p className="text-gray-600 text-sm">{owner.email}</p>
            {owner.phone && (
              <p className="text-gray-600 text-sm">{owner.phone}</p>
            )}
          </div>
        </div>
        <MessageOwnerButton owner={owner} restaurant={restaurant} />
      </div>
    </div>
  );
}