import { useState, useEffect } from "react";

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
    totalOrders: 0,
    pendingOrders: 0,
    confirmedOrders: 0,
    preparingOrders: 0,
    readyOrders: 0,
    outForDeliveryOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    totalRevenue: 0,
  });

  // Fetch orders & riders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders");
        const data = await response.json();
        const normalized = (data.orders || []).map((o) => ({
          ...o,
          id: o.id ?? o._id, // ✅ ensure id exists
          orderDate: o.orderDate ?? o.createdAt ?? new Date(),
        }));
        setOrders(normalized);
        setFilteredOrders(normalized);

        // Calculate monthly stats
        calculateMonthlyStats(normalized);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchRiders = async () => {
      try {
        // Keep your existing path — we implement /api/users below
        const response = await fetch("/api/users?role=rider");
        const data = await response.json();
        const normalized = (data.users || []).map((u) => ({
          id: u.id ?? u._id,
          name: u.name,
          phone: u.phone,
        }));
        setRiders(normalized);
      } catch (error) {
        console.error("Error fetching riders:", error);
      }
    };

    fetchOrders();
    fetchRiders();
  }, []);

  // Calculate monthly statistics
  const calculateMonthlyStats = (ordersData) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const monthlyOrders = ordersData.filter((order) => {
      const orderDate = new Date(order.orderDate);
      return (
        orderDate.getMonth() === currentMonth &&
        orderDate.getFullYear() === currentYear
      );
    });

    const stats = {
      totalOrders: monthlyOrders.length,
      pendingOrders: monthlyOrders.filter((o) => o.status === "pending").length,
      confirmedOrders: monthlyOrders.filter((o) => o.status === "confirmed")
        .length,
      preparingOrders: monthlyOrders.filter((o) => o.status === "preparing")
        .length,
      readyOrders: monthlyOrders.filter((o) => o.status === "ready").length,
      outForDeliveryOrders: monthlyOrders.filter(
        (o) => o.status === "out-for-delivery"
      ).length,
      deliveredOrders: monthlyOrders.filter((o) => o.status === "delivered")
        .length,
      cancelledOrders: monthlyOrders.filter((o) => o.status === "cancelled")
        .length,
      totalRevenue: monthlyOrders.reduce(
        (sum, o) => sum + (o.pricing?.total || 0),
        0
      ),
    };

    setMonthlyStats(stats);
  };

  // Filter orders
  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          (order.id + "").toLowerCase().includes(q) ||
          order.customerInfo?.fullName?.toLowerCase?.().includes(q) ||
          order.customerInfo?.email?.toLowerCase?.().includes(q)
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (response.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );

        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => ({ ...prev, status: newStatus }));
        }

        const nextOrders = orders.map((o) =>
          o.id === orderId ? { ...o, status: newStatus } : o
        );
        calculateMonthlyStats(nextOrders);
      } else {
        console.error("Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  // Assign rider to order
  const assignRiderToOrder = async (orderId, riderId) => {
    try {
      const selectedRider = riders.find((r) => r.id === riderId);

      const response = await fetch("/api/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          action: "assignRider",
          riderId,
          riderInfo: selectedRider,
        }),
      });

      if (response.ok) {
        setOrders((prev) =>
          prev.map((o) =>
            o.id === orderId
              ? { ...o, assignedRider: riderId, riderInfo: selectedRider }
              : o
          )
        );

        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder((prev) => ({
            ...prev,
            assignedRider: riderId,
            riderInfo: selectedRider,
          }));
        }

        setShowRiderDropdown(null);
      } else {
        console.error("Failed to assign rider");
      }
    } catch (error) {
      console.error("Error assigning rider:", error);
    }
  };

  const showOrderDetailsModal = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

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