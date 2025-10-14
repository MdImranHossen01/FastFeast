// src/app/orders/[id]/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiPackage, FiClock, FiCheck, FiTruck, FiMapPin, FiPhone, FiUser, FiCalendar, FiDollarSign } from 'react-icons/fi';

const OrderDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/orders/${params.id}`);
        const data = await response.json();
        
        if (data.success) {
          setOrder(data.order);
        } else {
          console.error('Failed to fetch order details');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchOrderDetails();
    }
  }, [params.id]);

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

  const normalizeStatus = (status) => {
    const s = String(status || '').trim().toLowerCase();
    if (s === 'complete' || s === 'completed' || s === 'delivery-completed') return 'delivered';
    if (s === 'out for delivery' || s === 'out_for_delivery') return 'out-for-delivery';
    return s;
  };

  const getStatusBadge = (status) => {
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
    return <span className={`px-3 py-1 text-sm font-medium rounded-full ${cls}`}>{label}</span>;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Order Not Found</h2>
            <p className="text-gray-600 mb-4">The order you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
          >
            <FiArrowLeft className="h-5 w-5 text-gray-600" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">Order Details</h1>
        </div>

        {/* Order Status Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Order #{order.id}</h2>
              <p className="text-sm text-gray-500">Placed on {formatDate(order.orderDate)}</p>
            </div>
            <div>
              {getStatusBadge(order.status)}
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items && order.items.length > 0 ? (
                order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 rounded-md overflow-hidden mr-3">
                        <img 
                          src={item.image || 'https://via.placeholder.com/48'} 
                          alt={item.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity || 1}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-800">৳{item.price || 0}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No items in this order</p>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">৳{order.pricing?.subtotal || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery Fee</span>
                <span className="font-medium">৳{order.pricing?.deliveryFee || 0}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">৳{order.pricing?.tax || 0}</span>
              </div>
              <div className="flex justify-between text-lg font-medium pt-2 border-t">
                <span>Total</span>
                <span>৳{order.pricing?.total || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Delivery Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <FiMapPin className="mt-1 mr-2 text-gray-500" />
              <div>
                <p className="font-medium text-gray-800">Delivery Address</p>
                <p className="text-sm text-gray-600">
                  {order.deliveryAddress?.street || 'N/A'}, {order.deliveryAddress?.city || 'N/A'}, {order.deliveryAddress?.postalCode || 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <FiCalendar className="mt-1 mr-2 text-gray-500" />
              <div>
                <p className="font-medium text-gray-800">Estimated Delivery</p>
                <p className="text-sm text-gray-600">{formatDate(order.estimatedDelivery)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Rider Information */}
        {order.riderInfo && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Delivery Rider</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img
                  className="h-12 w-12 rounded-full object-cover mr-3"
                  src={order.riderInfo.photoUrl || `https://avatar.vercel.sh/${order.riderInfo.email}`}
                  alt={order.riderInfo.name}
                />
                <div>
                  <p className="font-medium text-gray-800">{order.riderInfo.name}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <FiPhone className="mr-1" />
                    {order.riderInfo.phone}
                  </div>
                </div>
              </div>
              <button
                onClick={() => router.push(`/riders/${order.riderInfo.id}`)}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors flex items-center gap-1"
              >
                <FiUser className="h-4 w-4" />
                View Profile
              </button>
            </div>
          </div>
        )}

        {/* Payment Information */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-800 mb-3">Payment Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <FiDollarSign className="mr-2 text-gray-500" />
              <div>
                <p className="font-medium text-gray-800">Payment Method</p>
                <p className="text-sm text-gray-600">
                  {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Card Payment'}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <FiCheck className="mr-2 text-gray-500" />
              <div>
                <p className="font-medium text-gray-800">Payment Status</p>
                <p className="text-sm text-gray-600">
                  {order.paymentStatus || 'Pending'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;