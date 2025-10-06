// src/app/(dashboards)/admin-dashboard/manage-orders/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { FiFilter, FiSearch, FiMoreVertical, FiCheck, FiX, FiClock, FiTruck, FiPackage, FiTrendingUp, FiUsers, FiDollarSign, FiShoppingCart } from 'react-icons/fi';
import OrderDetailsModal from './components/OrderDetailsModal';

const ManageOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
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
    totalRevenue: 0
  });

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('/api/orders');
        const data = await response.json();
        setOrders(data.orders || []);
        setFilteredOrders(data.orders || []);
        
        // Calculate monthly stats
        calculateMonthlyStats(data.orders || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch riders for assignment
    const fetchRiders = async () => {
      try {
        const response = await fetch('/api/riders');
        const data = await response.json();
        setRiders(data.riders || []);
      } catch (error) {
        console.error('Error fetching riders:', error);
      }
    };

    fetchOrders();
    fetchRiders();
  }, []);

  // Calculate monthly statistics
  const calculateMonthlyStats = (ordersData) => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyOrders = ordersData.filter(order => {
      const orderDate = new Date(order.orderDate);
      return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
    });
    
    const stats = {
      totalOrders: monthlyOrders.length,
      pendingOrders: monthlyOrders.filter(order => order.status === 'pending').length,
      confirmedOrders: monthlyOrders.filter(order => order.status === 'confirmed').length,
      preparingOrders: monthlyOrders.filter(order => order.status === 'preparing').length,
      readyOrders: monthlyOrders.filter(order => order.status === 'ready').length,
      outForDeliveryOrders: monthlyOrders.filter(order => order.status === 'out-for-delivery').length,
      deliveredOrders: monthlyOrders.filter(order => order.status === 'delivered').length,
      cancelledOrders: monthlyOrders.filter(order => order.status === 'cancelled').length,
      totalRevenue: monthlyOrders.reduce((sum, order) => sum + order.pricing.total, 0)
    };
    
    setMonthlyStats(stats);
  };

  // Filter orders based on search term and status
  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  // Update order status
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (response.ok) {
        // Update the local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        
        // Update the selected order if it's currently open
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(prev => ({ ...prev, status: newStatus }));
        }
        
        // Recalculate monthly stats
        calculateMonthlyStats(orders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        ));
      } else {
        console.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  // Assign rider to order
  const assignRiderToOrder = async (orderId, riderId) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          orderId, 
          action: 'assignRider',
          riderId 
        }),
      });

      if (response.ok) {
        // Update the local state
        setOrders(prevOrders => 
          prevOrders.map(order => 
            order.id === orderId ? { ...order, assignedRider: riderId } : order
          )
        );
        
        // Update the selected order if it's currently open
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(prev => ({ ...prev, assignedRider: riderId }));
        }
        
        setShowRiderDropdown(null);
      } else {
        console.error('Failed to assign rider');
      }
    } catch (error) {
      console.error('Error assigning rider:', error);
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pending</span>;
      case 'confirmed':
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Confirmed</span>;
      case 'preparing':
        return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Preparing</span>;
      case 'ready':
        return <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Ready</span>;
      case 'out-for-delivery':
        return <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">Out for Delivery</span>;
      case 'delivered':
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Delivered</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Cancelled</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Unknown</span>;
    }
  };

  // Get status icon
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FiClock className="text-yellow-600" />;
      case 'confirmed':
        return <FiCheck className="text-blue-600" />;
      case 'preparing':
        return <FiPackage className="text-purple-600" />;
      case 'ready':
        return <FiPackage className="text-indigo-600" />;
      case 'out-for-delivery':
        return <FiTruck className="text-orange-600" />;
      case 'delivered':
        return <FiCheck className="text-green-600" />;
      case 'cancelled':
        return <FiX className="text-red-600" />;
      default:
        return null;
    }
  };

  // Show order details
  const showOrderDetailsModal = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-500 mr-4">
              <FiShoppingCart className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{monthlyStats.totalOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-500 mr-4">
              <FiDollarSign className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">৳{monthlyStats.totalRevenue}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-500 mr-4">
              <FiClock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900">{monthlyStats.pendingOrders}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-500 mr-4">
              <FiTrendingUp className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">{monthlyStats.deliveredOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Status Breakdown */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Monthly Order Status Breakdown</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">{monthlyStats.pendingOrders}</div>
            <div className="text-sm text-gray-500">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{monthlyStats.confirmedOrders}</div>
            <div className="text-sm text-gray-500">Confirmed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{monthlyStats.preparingOrders}</div>
            <div className="text-sm text-gray-500">Preparing</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-indigo-600">{monthlyStats.readyOrders}</div>
            <div className="text-sm text-gray-500">Ready</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{monthlyStats.outForDeliveryOrders}</div>
            <div className="text-sm text-gray-500">Out for Delivery</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{monthlyStats.deliveredOrders}</div>
            <div className="text-sm text-gray-500">Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{monthlyStats.cancelledOrders}</div>
            <div className="text-sm text-gray-500">Cancelled</div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by order ID or customer..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <FiFilter className="text-gray-500" />
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="out-for-delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rider
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customerInfo.fullName}</div>
                        <div className="text-sm text-gray-500">{order.customerInfo.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(order.orderDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ৳{order.pricing.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        {getStatusBadge(order.status)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.assignedRider ? (
                        <div className="flex items-center">
                          <FiUsers className="mr-1" />
                          {riders.find(r => r.id === order.assignedRider)?.name || 'Unknown Rider'}
                        </div>
                      ) : (
                        <span className="text-gray-400">Not assigned</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => showOrderDetailsModal(order)}
                          className="text-orange-600 hover:text-orange-900"
                        >
                          View
                        </button>
                        
                        {order.status === 'pending' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'confirmed')}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Confirm
                          </button>
                        )}
                        
                        {order.status === 'confirmed' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'preparing')}
                            className="text-purple-600 hover:text-purple-900"
                          >
                            Start Preparing
                          </button>
                        )}
                        
                        {order.status === 'preparing' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'ready')}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Mark Ready
                          </button>
                        )}
                        
                        {order.status === 'ready' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'out-for-delivery')}
                            className="text-orange-600 hover:text-orange-900"
                          >
                            Out for Delivery
                          </button>
                        )}
                        
                        {order.status === 'out-for-delivery' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'delivered')}
                            className="text-green-600 hover:text-green-900"
                          >
                            Mark Delivered
                          </button>
                        )}
                        
                        {order.status !== 'delivered' && order.status !== 'cancelled' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'cancelled')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Cancel
                          </button>
                        )}
                        
                        {order.status === 'ready' && !order.assignedRider && (
                          <div className="relative">
                            <button
                              onClick={() => setShowRiderDropdown(showRiderDropdown === order.id ? null : order.id)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Assign Rider
                            </button>
                            
                            {showRiderDropdown === order.id && (
                              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                                <div className="py-1">
                                  {riders.length > 0 ? (
                                    riders.map((rider) => (
                                      <button
                                        key={rider.id}
                                        onClick={() => assignRiderToOrder(order.id, rider.id)}
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
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      <OrderDetailsModal
        order={selectedOrder}
        isOpen={showOrderDetails}
        onClose={() => setShowOrderDetails(false)}
        updateOrderStatus={updateOrderStatus}
      />
    </div>
  );
};

export default ManageOrderPage;