import React from "react";

const StatusBreakdown = ({ monthlyStats }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Monthly Order Status Breakdown
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">
            {monthlyStats.pendingOrders}
          </div>
          <div className="text-sm text-gray-500">Pending</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">
            {monthlyStats.confirmedOrders}
          </div>
          <div className="text-sm text-gray-500">Confirmed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">
            {monthlyStats.preparingOrders}
          </div>
          <div className="text-sm text-gray-500">Preparing</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600">
            {monthlyStats.readyOrders}
          </div>
          <div className="text-sm text-gray-500">Ready</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">
            {monthlyStats.outForDeliveryOrders}
          </div>
          <div className="text-sm text-gray-500">Out for Delivery</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">
            {monthlyStats.deliveredOrders}
          </div>
          <div className="text-sm text-gray-500">Delivered</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">
            {monthlyStats.cancelledOrders}
          </div>
          <div className="text-sm text-gray-500">Cancelled</div>
        </div>
      </div>
    </div>
  );
};

export default StatusBreakdown;