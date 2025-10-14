// src/app/riders/[id]/page.jsx
"use client";

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiArrowLeft, FiPhone, FiMapPin, FiTruck, FiMail, FiCalendar, FiStar, FiPackage, FiCheckCircle } from 'react-icons/fi';

const RiderDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [rider, setRider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeOrders, setActiveOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    const fetchRiderDetails = async () => {
      try {
        setLoading(true);
        // Fetch rider details
        const riderResponse = await fetch(`/api/riders/${params.id}`);
        const riderData = await riderResponse.json();
        
        if (riderData.success) {
          setRider(riderData.rider);
          
          // Fetch active orders for this rider
          const activeOrdersResponse = await fetch(`/api/riders/${params.id}/orders?status=active`);
          const activeOrdersData = await activeOrdersResponse.json();
          setActiveOrders(activeOrdersData.orders || []);
          
          // Fetch completed orders for this rider
          const completedOrdersResponse = await fetch(`/api/riders/${params.id}/orders?status=completed`);
          const completedOrdersData = await completedOrdersResponse.json();
          setCompletedOrders(completedOrdersData.orders || []);
        } else {
          console.error('Failed to fetch rider details');
        }
      } catch (error) {
        console.error('Error fetching rider details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchRiderDetails();
    }
  }, [params.id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatDateTime = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!rider) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Rider Not Found</h2>
            <p className="text-gray-600 mb-4">The rider you're looking for doesn't exist or has been removed.</p>
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
          <h1 className="text-2xl font-bold text-gray-800">Rider Details</h1>
        </div>

        {/* Rider Profile Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                className="h-24 w-24 rounded-full object-cover"
                src={rider.photoUrl || `https://avatar.vercel.sh/${rider.email}`}
                alt={rider.name}
              />
            </div>
            <div className="flex-grow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{rider.name}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center">
                  <FiMail className="mr-2 text-gray-500" />
                  <span>{rider.email}</span>
                </div>
                <div className="flex items-center">
                  <FiPhone className="mr-2 text-gray-500" />
                  <span>{rider.phone}</span>
                </div>
                <div className="flex items-center">
                  <FiTruck className="mr-2 text-gray-500" />
                  <span>Vehicle: {rider.vehicleType || 'Not specified'}</span>
                </div>
                <div className="flex items-center">
                  <FiCalendar className="mr-2 text-gray-500" />
                  <span>Joined: {formatDate(rider.createdAt)}</span>
                </div>
                <div className="flex items-center">
                  <FiStar className="mr-2 text-gray-500" />
                  <span>Rating: {rider.rating || 'Not rated yet'}</span>
                </div>
                <div className="flex items-center">
                  <FiMapPin className="mr-2 text-gray-500" />
                  <span>
                    {rider.currentLocation
                      ? `Lat: ${rider.currentLocation.lat}, Lng: ${rider.currentLocation.lng}`
                      : 'Location not available'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <FiPackage className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Active Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{activeOrders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <FiCheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed Orders</p>
                <p className="text-2xl font-semibold text-gray-900">{completedOrders.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-full">
                <FiStar className="h-6 w-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-2xl font-semibold text-gray-900">
                  ৳{completedOrders.reduce((sum, order) => sum + (order.pricing?.deliveryFee || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs for Orders */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex -mb-px">
              <button
                onClick={() => setActiveTab('active')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'active'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Active Orders ({activeOrders.length})
              </button>
              <button
                onClick={() => setActiveTab('completed')}
                className={`py-2 px-4 border-b-2 font-medium text-sm ${
                  activeTab === 'completed'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Completed Orders ({completedOrders.length})
              </button>
            </nav>
          </div>

          {/* Active Orders */}
          {activeTab === 'active' && (
            <div className="p-4">
              {activeOrders.length > 0 ? (
                <div className="space-y-4">
                  {activeOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">Order #{order.id}</h4>
                          <p className="text-sm text-gray-500">
                            Customer: {order.customerInfo?.fullName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {formatDateTime(order.orderDate)}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Total: <span className="font-medium text-gray-900">৳{order.pricing?.total || 0}</span>
                        </div>
                        <button 
                          onClick={() => router.push(`/orders/${order.id}`)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiPackage className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No active orders</p>
                </div>
              )}
            </div>
          )}

          {/* Completed Orders */}
          {activeTab === 'completed' && (
            <div className="p-4">
              {completedOrders.length > 0 ? (
                <div className="space-y-4">
                  {completedOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">Order #{order.id}</h4>
                          <p className="text-sm text-gray-500">
                            Customer: {order.customerInfo?.fullName}
                          </p>
                          <p className="text-sm text-gray-500">
                            Delivered: {formatDateTime(order.updatedAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Delivered
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Total: <span className="font-medium text-gray-900">৳{order.pricing?.total || 0}</span>
                          {order.pricing?.deliveryFee && (
                            <span className="ml-2 text-green-600">
                              (Earned: ৳{order.pricing.deliveryFee})
                            </span>
                          )}
                        </div>
                        <button 
                          onClick={() => router.push(`/orders/${order.id}`)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FiCheckCircle className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-500">No completed orders</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RiderDetailsPage;