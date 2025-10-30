// src/app/(dashboards)/restaurant-dashboard/manage-orders/hooks/useOrderManagement.js
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useOrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showRiderDropdown, setShowRiderDropdown] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    preparing: 0,
    ready: 0,
    outForDelivery: 0,
    delivered: 0,
    cancelled: 0,
    totalRevenue: 0,
  });

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");

      console.log("Response:", response);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      const data = await response.json();

      if (data.success) {
        setOrders(data.orders);
        setFilteredOrders(data.orders);
      } else {
        toast.error(data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    }
  };

  // Fetch riders
  const fetchRiders = async () => {
    try {
      const response = await fetch("/api/users?role=rider");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      const data = await response.json();

      if (data.success) {
        setRiders(data.users);
      } else {
        toast.error(data.message || "Failed to fetch riders");
      }
    } catch (error) {
      console.error("Error fetching riders:", error);
      toast.error("Failed to fetch riders");
      // Fallback to empty array if API fails
      setRiders([]);
    }
  };

  // Fetch monthly stats
  const fetchMonthlyStats = async () => {
    try {
      const response = await fetch("/api/orders/stats/monthly");
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }
      const data = await response.json();

      if (data.success) {
        setMonthlyStats(data.stats);
      } else {
        toast.error(data.message || "Failed to fetch monthly stats");
      }
    } catch (error) {
      console.error("Error fetching monthly stats:", error);
      toast.error("Failed to fetch monthly stats");
      // Set default stats if API fails
      setMonthlyStats({
        total: 0,
        pending: 0,
        confirmed: 0,
        preparing: 0,
        ready: 0,
        outForDelivery: 0,
        delivered: 0,
        cancelled: 0,
        totalRevenue: 0,
      });
    }
  };

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.success) {
        // Update the order in the local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );

        // Update filtered orders as well
        setFilteredOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );

        toast.success(`Order status updated to ${newStatus}`);
      } else {
        toast.error(data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error(error.message || "Failed to update order status");
    }
  };

  // Assign rider to order
  const assignRiderToOrder = async (orderId, riderId) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ riderId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.success) {
        // Update the order in the local state
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, riderInfo: data.riderInfo }
              : order
          )
        );

        // Update filtered orders as well
        setFilteredOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId
              ? { ...order, riderInfo: data.riderInfo }
              : order
          )
        );

        // Close the dropdown
        setShowRiderDropdown(null);
        toast.success("Rider assigned successfully");
      } else {
        toast.error(data.message || "Failed to assign rider");
      }
    } catch (error) {
      console.error("Error assigning rider to order:", error);
      toast.error(error.message || "Failed to assign rider");
    }
  };

  // Show order details modal
  const showOrderDetailsModal = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  // Apply filters
  useEffect(() => {
    let filtered = orders;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (order.customerInfo?.fullName &&
            order.customerInfo.fullName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()))
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchOrders(), fetchRiders(), fetchMonthlyStats()]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return {
    orders,
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
  };
};
