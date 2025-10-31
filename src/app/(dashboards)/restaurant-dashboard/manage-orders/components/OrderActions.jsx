// src/app/(dashboards)/restaurant-dashboard/manage-orders/components/OrderActions.jsx
import React from "react";
import { FiUsers } from "react-icons/fi";

const OrderActions = ({
  order,
  updateOrderStatus,
  assignRiderToOrder,
  riders,
  showRiderDropdown,
  setShowRiderDropdown,
  showOrderDetailsModal,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => showOrderDetailsModal(order)}
        className="text-orange-600 hover:text-orange-900"
      >
        View
      </button>

      {order.status === "pending" && (
        <button
          onClick={() => updateOrderStatus(order._id, "confirmed")}
          className="text-blue-600 hover:text-blue-900"
        >
          Confirm
        </button>
      )}

      {order.status === "confirmed" && (
        <button
          onClick={() => updateOrderStatus(order._id, "preparing")}
          className="text-purple-600 hover:text-purple-900"
        >
          Start Preparing
        </button>
      )}

      {order.status === "preparing" && (
        <button
          onClick={() => updateOrderStatus(order._id, "ready")}
          className="text-indigo-600 hover:text-indigo-900"
        >
          Mark Ready
        </button>
      )}

      {order.status === "ready" && (
        <button
          onClick={() => updateOrderStatus(order._id, "out-for-delivery")}
          className="text-orange-600 hover:text-orange-900"
        >
          Out for Delivery
        </button>
      )}

      {order.status === "out-for-delivery" && (
        <button
          onClick={() => updateOrderStatus(order._id, "delivered")}
          className="text-green-600 hover:text-green-900"
        >
          Mark Delivered
        </button>
      )}

      {order.status !== "delivered" && order.status !== "cancelled" && (
        <button
          onClick={() => updateOrderStatus(order._id, "cancelled")}
          className="text-red-600 hover:text-red-900"
        >
          Cancel
        </button>
      )}

      {order.status === "ready" && !order.assignedRider && (
        <div className="relative">
          <button
            onClick={() =>
              setShowRiderDropdown(
                showRiderDropdown === order._id ? null : order._id
              )
            }
            className="text-blue-600 hover:text-blue-900"
          >
            Assign Rider
          </button>

          {showRiderDropdown === order._id && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
              <div className="py-1">
                {riders.length > 0 ? (
                  riders.map((rider) => (
                    <button
                      key={rider._id}
                      onClick={() => {
                        assignRiderToOrder(order._id, rider.id);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {rider.name}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-2 text-sm text-gray-500">
                    No riders available
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderActions;
