// src/components/OrderStatusModal.jsx
import React, { useState, useEffect } from 'react';
import { FiX, FiSearch, FiClock, FiCheck, FiPackage, FiTruck, FiUser, FiPhone, FiMapPin } from 'react-icons/fi';

const OrderStatusModal = ({ isOpen, onClose, userEmail }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showRiderDetails, setShowRiderDetails] = useState(false);

  // Fetch user orders when modal opens
  useEffect(() => {
    if (isOpen && userEmail) {
      fetchUserOrders();
    }
  }, [isOpen, userEmail]);

  // Filter orders based on search term
  useEffect(() => {
    if (searchTerm) {
      const filtered = orders.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [searchTerm, orders]);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/orders?userEmail=${userEmail}`);
      const data = await response.json();
      setOrders(data.orders || []);
      setFilteredOrders(data.orders || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
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

  // Get progress percentage based on status
  const getProgressPercentage = (status) => {
    switch (status) {
      case 'pending': return 10;
      case 'confirmed': return 25;
      case 'preparing': return 50;
      case 'ready': return 75;
      case 'out-for-delivery': return 90;
      case 'delivered': return 100;
      case 'cancelled': return 0;
      default: return 0;
    }
  };

  // Show order details
  const showOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto items-center bg-black/70">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity" 
          aria-hidden="true"
          onClick={onClose}
        >
          <div className="absolute inset-0"></div>
        </div>
        
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl leading-6 font-medium text-gray-900">
                Order Status Tracking
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <FiX className="h-6 w-6" />
              </button>
            </div>
            
            {/* Search Bar */}
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by order ID or status..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Orders List */}
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-gray-900">Order #{order.id}</h4>
                        <p className="text-sm text-gray-500">{formatDate(order.orderDate)}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Order Progress</span>
                        <span>{getProgressPercentage(order.status)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${getProgressPercentage(order.status)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Order Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-500">Items:</span>
                        <span className="ml-2 font-medium">{order.items.length}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Total:</span>
                        <span className="ml-2 font-medium">৳{order.pricing.total}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Delivery:</span>
                        <span className="ml-2 font-medium">{formatDate(order.estimatedDelivery)}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Payment:</span>
                        <span className="ml-2 font-medium">
                          {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Card'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Rider Information (if assigned) */}
                    {order.riderInfo && (
                      <div className="mt-3 p-3 bg-white rounded-lg">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FiTruck className="text-orange-500 mr-2" />
                            <span className="text-sm font-medium">Delivery by: {order.riderInfo.name}</span>
                          </div>
                          <button
                            className="text-blue-600 hover:text-blue-800 text-sm"
                            onClick={() => setShowRiderDetails(showRiderDetails === order.id ? null : order.id)}
                          >
                            {showRiderDetails === order.id ? 'Hide' : 'Show'} Details
                          </button>
                        </div>
                        
                        {showRiderDetails === order.id && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <div className="flex items-center space-x-3">
                              <img
                                className="h-10 w-10 rounded-full"
                                src={order.riderInfo.photoUrl || `https://avatar.vercel.sh/${order.riderInfo.email}`}
                                alt={order.riderInfo.name}
                              />
                              <div>
                                <div className="font-medium">{order.riderInfo.name}</div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <FiPhone className="mr-1" />
                                  {order.riderInfo.phone}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                  <FiMapPin className="mr-1" />
                                  {order.riderInfo.currentLocation ? 
                                    `Lat: ${order.riderInfo.currentLocation.lat}, Lng: ${order.riderInfo.currentLocation.lng}` : 
                                    'Location not available'
                                  }
                                </div>
                                <div className="text-sm text-gray-500">
                                  Vehicle: {order.riderInfo.vehicleType || 'Not specified'}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* View Details Button */}
                    <div className="mt-3">
                      <button
                        className="w-full py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                        onClick={() => showOrderDetails(order)}
                      >
                        View Full Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {searchTerm ? 'No orders found matching your search.' : 'You have no orders yet.'}
                </p>
              </div>
            )}
          </div>
          
          {/* Modal Actions */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderStatusModal;