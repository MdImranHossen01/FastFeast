import React from "react";
import {
  FiCheck,
  FiX,
  FiClock,
  FiTruck,
  FiPackage,
} from "react-icons/fi";

const OrderStatusBadge = ({ status }) => {
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Pending
          </span>
        );
      case "confirmed":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            Confirmed
          </span>
        );
      case "preparing":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
            Preparing
          </span>
        );
      case "ready":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
            Ready
          </span>
        );
      case "out-for-delivery":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">
            Out for Delivery
          </span>
        );
      case "delivered":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
            Delivered
          </span>
        );
      case "cancelled":
        return (
          <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
            Unknown
          </span>
        );
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <FiClock className="text-yellow-600" />;
      case "confirmed":
        return <FiCheck className="text-blue-600" />;
      case "preparing":
        return <FiPackage className="text-purple-600" />;
      case "ready":
        return <FiPackage className="text-indigo-600" />;
      case "out-for-delivery":
        return <FiTruck className="text-orange-600" />;
      case "delivered":
        return <FiCheck className="text-green-600" />;
      case "cancelled":
        return <FiX className="text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {getStatusIcon(status)}
      {getStatusBadge(status)}
    </div>
  );
};

export default OrderStatusBadge;