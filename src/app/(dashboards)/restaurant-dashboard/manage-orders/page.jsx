"use client";

import React from "react";
import MonthlyStats from "./components/MonthlyStats";
import StatusBreakdown from "./components/StatusBreakdown";
import OrderFilters from "./components/OrderFilters";
import OrdersTable from "./components/OrdersTable";
import OrderDetailsModal from "./components/OrderDetailsModal";
import { useOrderManagement } from "./hooks/useOrderManagement";

const ManageOrderPage = () => {
  const {
    filteredOrders,
    riders,
    loading,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedOrder,
    showOrderDetails,
    setShowOrderDetails,
    showRiderDropdown,
    setShowRiderDropdown,
    monthlyStats,
    updateOrderStatus,
    assignRiderToOrder,
    showOrderDetailsModal,
  } = useOrderManagement();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Orders</h1>
        <p className="text-gray-600">View and manage customer orders</p>
      </div>

      {/* Monthly Statistics */}
      <MonthlyStats monthlyStats={monthlyStats} />

      {/* Status Breakdown */}
      <StatusBreakdown monthlyStats={monthlyStats} />

      {/* Filters */}
      <OrderFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Orders Table */}
      <OrdersTable
        filteredOrders={filteredOrders}
        showOrderDetailsModal={showOrderDetailsModal}
        updateOrderStatus={updateOrderStatus}
        assignRiderToOrder={assignRiderToOrder}
        riders={riders}
        showRiderDropdown={showRiderDropdown}
        setShowRiderDropdown={setShowRiderDropdown}
      />

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
        updateOrderStatus={updateOrderStatus}
        assignRiderToOrder={assignRiderToOrder}
        riders={riders}
      />
    </div>
  );
};

export default ManageOrderPage;