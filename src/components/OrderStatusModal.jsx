// src/components/OrderStatusModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import { FiX, FiSearch, FiClock, FiCheck, FiPackage, FiTruck, FiPhone, FiMapPin, FiExternalLink, FiUser } from 'react-icons/fi';
import Link from 'next/link';
import toast from 'react-hot-toast';

// --- helpers ---
const normalizeStatus = (status) => {
  const s = String(status || '').trim().toLowerCase();
  if (s === 'complete' || s === 'completed' || s === 'delivery-completed') return 'delivered';
  if (s === 'out for delivery' || s === 'out_for_delivery') return 'out-for-delivery';
  return s;
};

const statusPercent = {
  'pending': 10,
  'confirmed': 25,
  'preparing': 50,
  'ready': 75,
  'out-for-delivery': 90,
  'delivered': 100,
  'cancelled': 0,
};

const StatusBadge = ({ status }) => {
  const s = normalizeStatus(status);
  const classes = {
    'pending': 'bg-yellow-100 text-yellow-800',
    'confirmed': 'bg-blue-100 text-blue-800',
    'preparing': 'bg-purple-100 text-purple-800',
    'ready': 'bg-indigo-100 text-indigo-800',
    'out-for-delivery': 'bg-orange-100 text-orange-800',
    'delivered': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
    'unknown': 'bg-gray-100 text-gray-800',
  };
  const label = {
    'pending': 'Pending',
    'confirmed': 'Confirmed',
    'preparing': 'Preparing',
    'ready': 'Ready',
    'out-for-delivery': 'Out for Delivery',
    'delivered': 'Delivered',
    'cancelled': 'Cancelled',
    'unknown': 'Unknown',
  }[s] ?? 'Unknown';

  const cls = classes[s] ?? classes['unknown'];
  return <span className={`px-2 py-1 text-xs font-medium rounded-full ${cls}`}>{label}</span>;
};

const StatusIcon = ({ status }) => {
  const s = normalizeStatus(status);
  switch (s) {
    case 'pending': return <FiClock className="text-yellow-600" />;
    case 'confirmed': return <FiCheck className="text-blue-600" />;
    case 'preparing': return <FiPackage className="text-purple-600" />;
    case 'ready': return <FiPackage className="text-indigo-600" />;
    case 'out-for-delivery': return <FiTruck className="text-orange-600" />;
    case 'delivered': return <FiCheck className="text-green-600" />;
    case 'cancelled': return <FiX className="text-red-600" />;
    default: return null;
  }
};

const progressFromStatus = (status) => {
  const s = normalizeStatus(status);
  return statusPercent[s] ?? 0;
};

const fmtDate = (dateString) => {
  const options = { year:'numeric', month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' };
  return new Date(dateString || Date.now()).toLocaleDateString(undefined, options);
};

const OrderStatusModal = ({ isOpen, onClose, userEmail }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showRiderDetails, setShowRiderDetails] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const pollRef = useRef(null);

  // fetch orders
  const fetchUserOrders = async () => {
    if (!userEmail) return;
    try {
      setLoading(true);
      setFetchError(null);
      const res = await fetch(`/api/orders?userEmail=${encodeURIComponent(userEmail)}`);
      
      if (!res.ok) {
        throw new Error(`Failed to fetch orders: ${res.status}`);
      }
      
      const data = await res.json();

      // normalize shape & status
      const list = (data.orders || []).map(o => ({
        ...o,
        id: String(o.id ?? o._id ?? ''),
        status: normalizeStatus(o.status),
        orderDate: o.orderDate ?? o.createdAt ?? Date.now(),
        pricing: o.pricing || {},
        items: Array.isArray(o.items) ? o.items : (o.items ? [o.items] : []),
        // Ensure riderInfo includes the ID
        riderInfo: o.riderInfo ? {
          ...o.riderInfo,
          id: o.riderInfo.id || o.riderInfo._id || ''
        } : null
      }));

      setOrders(list);
      setFilteredOrders(applySearch(list, searchTerm));
    } catch (e) {
      console.error('Error fetching orders:', e);
      setFetchError(e.message);
      toast.error('Failed to load orders. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // open/close lifecycle + lightweight polling (optional)
  useEffect(() => {
    if (isOpen && userEmail) {
      fetchUserOrders();

      // light polling while open (updates delivered step too)
      clearInterval(pollRef.current);
      pollRef.current = setInterval(fetchUserOrders, 8000); // 8s
      return () => clearInterval(pollRef.current);
    }
    // cleanup when closed
    clearInterval(pollRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, userEmail]);

  // search
  const applySearch = (list, q) => {
    const s = (q || '').trim().toLowerCase();
    if (!s) return list;
    return list.filter(order =>
      (order.id || '').toLowerCase().includes(s) ||
      normalizeStatus(order.status).includes(s)
    );
  };

  useEffect(() => {
    setFilteredOrders(applySearch(orders, searchTerm));
  }, [searchTerm, orders]);

  const showOrderDetails = (order) => setSelectedOrder(order);

  const handleRiderClick = (riderId, riderName) => {
    if (!riderId) {
      toast.error('Rider information is not available');
      return;
    }
    toast.success(`Opening ${riderName}'s profile...`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto items-center bg-black/70">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true" onClick={onClose}>
          <div className="absolute inset-0" />
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl leading-6 font-medium text-gray-900">Order Status Tracking</h3>
              <button type="button" className="text-gray-400 hover:text-gray-500 focus:outline-none" onClick={onClose}>
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
            ) : fetchError ? (
              <div className="text-center py-8">
                <p className="text-red-500 mb-4">{fetchError}</p>
                <button
                  onClick={fetchUserOrders}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            ) : filteredOrders.length > 0 ? (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredOrders.map((order) => {
                  const pct = progressFromStatus(order.status);
                  return (
                    <div key={order.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">Order #{order.id}</h4>
                          <p className="text-sm text-gray-500">{fmtDate(order.orderDate)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusIcon status={order.status} />
                          <StatusBadge status={order.status} />
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                          <span>Order Progress</span>
                          <span>{pct}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div>
                          <span className="text-gray-500">Items:</span>
                          <span className="ml-2 font-medium">{order.items?.length ?? 0}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Total:</span>
                          <span className="ml-2 font-medium">৳{order.pricing?.total ?? 0}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Delivery:</span>
                          <span className="ml-2 font-medium">{fmtDate(order.estimatedDelivery)}</span>
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
                              {/* Make the rider name clickable and link to rider details page */}
                              {order.riderInfo.id ? (
                                <Link href={`/riders/${order.riderInfo.id}`}>
                                  <span 
                                    className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline cursor-pointer flex items-center gap-1"
                                    onClick={() => handleRiderClick(order.riderInfo.id, order.riderInfo.name)}
                                  >
                                    {order.riderInfo.name}
                                    <FiExternalLink className="h-3 w-3" />
                                  </span>
                                </Link>
                              ) : (
                                <span className="text-sm font-medium text-gray-600">
                                  {order.riderInfo.name}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              {order.riderInfo.id && (
                                <Link href={`/riders/${order.riderInfo.id}`}>
                                  <button
                                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                                    onClick={() => handleRiderClick(order.riderInfo.id, order.riderInfo.name)}
                                  >
                                    <FiUser className="h-4 w-4" />
                                    Profile
                                  </button>
                                </Link>
                              )}
                              <button
                                className="text-blue-600 hover:text-blue-800 text-sm"
                                onClick={() => setShowRiderDetails(showRiderDetails === order.id ? null : order.id)}
                              >
                                {showRiderDetails === order.id ? 'Hide' : 'Show'} Details
                              </button>
                            </div>
                          </div>

                          {showRiderDetails === order.id && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <div className="flex items-center space-x-3">
                                <img
                                  className="h-10 w-10 rounded-full object-cover"
                                  src={order.riderInfo.photoUrl || `https://avatar.vercel.sh/${order.riderInfo.email}`}
                                  alt={order.riderInfo.name}
                                  onError={(e) => {
                                    e.target.src = `https://avatar.vercel.sh/${order.riderInfo.name || 'rider'}`;
                                  }}
                                />
                                <div className="flex-grow">
                                  <div className="font-medium">{order.riderInfo.name}</div>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <FiPhone className="mr-1" />
                                    {order.riderInfo.phone}
                                  </div>
                                  <div className="flex items-center text-sm text-gray-500">
                                    <FiMapPin className="mr-1" />
                                    {order.riderInfo.currentLocation
                                      ? `Lat: ${order.riderInfo.currentLocation.lat}, Lng: ${order.riderInfo.currentLocation.lng}`
                                      : 'Location not available'}
                                  </div>
                                  <div className="text-sm text-gray-500">
                                    Vehicle: {order.riderInfo.vehicleType || 'Not specified'}
                                  </div>
                                </div>
                                {order.riderInfo.id && (
                                  <Link href={`/riders/${order.riderInfo.id}`}>
                                    <button
                                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
                                      onClick={() => handleRiderClick(order.riderInfo.id, order.riderInfo.name)}
                                    >
                                      <FiExternalLink className="h-3 w-3" />
                                      View Profile
                                    </button>
                                  </Link>
                                )}
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
                  );
                })}
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