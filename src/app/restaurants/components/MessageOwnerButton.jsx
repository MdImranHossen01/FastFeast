"use client";

import { useState } from "react";
import { FaComment } from "react-icons/fa";
import ChatInterface from "@/app/messages/components/ChatInterface";

export default function MessageOwnerButton({ owner, restaurant }) {
  const [showChat, setShowChat] = useState(false);

  const handleMessageOwner = () => {
    setShowChat(true);
  };

  if (showChat) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg w-full max-w-6xl h-[80vh] flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">
              Message {owner?.name || "Restaurant Owner"}{restaurant?.name ? ` - ${restaurant.name}` : ""}            </h2>
            <button
              onClick={() => setShowChat(false)}
              className="text-gray-500 hover:text-gray-700 text-xl"
            >
              ✕
            </button>
          </div>
          <div className="flex-1">
            <ChatInterface restaurant={restaurant} owner={owner} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleMessageOwner}
      className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors font-medium shadow-md hover:shadow-lg"
    >
      <FaComment className="text-lg" />
      Message Owner
    </button>
  );
}