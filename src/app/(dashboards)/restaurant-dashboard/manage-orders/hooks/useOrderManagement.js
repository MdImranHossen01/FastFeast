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

  // Update order status instantly
  const updateOrderStatus = async (orderId, newStatus) => {
    // Instantly update UI
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );

    setFilteredOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
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
        toast.success(`Order status updated to ${newStatus}`);
      } else {
        throw new Error(data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update status");

      // Revert change if update fails
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: order.status } : order
        )
      );
    }
  };

  // Assign rider to order
  const assignRiderToOrder = async (orderId, rider) => {
    console.log(rider);
    console.log(orderId);

    // Optimistically update UI
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? {
              ...order,
              riderInfo: rider
                ? {
                    riderId: rider._id,
                    riderName: rider.name,
                    riderEmail: rider.email,
                    riderPhone: rider.phone,
                    photoUrl: rider.photoUrl || rider.image,
                    vehicleType: rider.vehicleType || "Not specified",
                  }
                : null,
            } // If rider is null/undefined, set riderInfo to null
          : order
      )
    );
    setFilteredOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderId
          ? {
              ...order,
              riderInfo: rider
                ? {
                    riderId: rider._id,
                    riderName: rider.name,
                    riderEmail: rider.email,
                    riderPhone: rider.phone,
                    photoUrl: rider.photoUrl || rider.image,
                    vehicleType: rider.vehicleType || "Not specified",
                  }
                : null,
            }
          : order
      )
    );

    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ riderId: rider ? rider._id : null }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${response.status}`
        );
      }

      const data = await response.json();

      if (data.success) {
        // Optionally, you can use data.order to further refine the UI state
        // setOrders((prev) => prev.map(o => o._id === orderId ? data.order : o));
        // setFilteredOrders((prev) => prev.map(o => o._id === orderId ? data.order : o));
        toast.success(`Assigned ${rider ? rider.name : "no one"} to order`);
      } else {
        throw new Error(data.message || "Failed to assign rider");
      }
    } catch (error) {
      console.error("Error assigning rider:", error);
      toast.error("Failed to assign rider");
      // Revert if API fails
      fetchOrders(); // This is still a viable fallback
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
