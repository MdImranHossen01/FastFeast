// src/app/(dashboards)/admin-dashboard/manage-orders/components/OrderDetailsModal.jsx
import React, { useState } from 'react';
import { FiClock, FiCheck, FiX, FiPackage, FiTruck, FiUsers } from 'react-icons/fi';

const OrderDetailsModal = ({ order, isOpen, onClose, updateOrderStatus, assignRiderToOrder, riders }) => {
  const [showRiderDropdown, setShowRiderDropdown] = useState(false);

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

  // Get next status action
  const getNextStatusAction = (status) => {
    switch (status) {
      case 'pending':
        return { 
          label: 'Confirm Order', 
          action: () => updateOrderStatus(order.id, 'confirmed'),
          className: 'bg-blue-600 hover:bg-blue-700'
        };
      case 'confirmed':
        return { 
          label: 'Start Preparing', 
          action: () => updateOrderStatus(order.id, 'preparing'),
          className: 'bg-purple-600 hover:bg-purple-700'
        };
      case 'preparing':
        return { 
          label: 'Mark as Ready', 
          action: () => updateOrderStatus(order.id, 'ready'),
          className: 'bg-indigo-600 hover:bg-indigo-700'
        };
      case 'ready':
        return { 
          label: 'Out for Delivery', 
          action: () => updateOrderStatus(order.id, 'out-for-delivery'),
          className: 'bg-orange-600 hover:bg-orange-700'
        };
      case 'out-for-delivery':
        return { 
          label: 'Mark as Delivered', 
          action: () => updateOrderStatus(order.id, 'delivered'),
          className: 'bg-green-600 hover:bg-green-700'
        };
      default:
        return null;
    }
  };

  // Handle rider assignment
  const handleAssignRider = (riderId) => {
    assignRiderToOrder(order.id, riderId);
    setShowRiderDropdown(false);
  };

  if (!isOpen || !order) return null;

  const nextAction = getNextStatusAction(order.status);
  const assignedRider = order.assignedRider ? riders.find(r => r.id === order.assignedRider) : null;

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
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl leading-6 font-medium text-gray-900">
                Order Details - {order.id}
              </h3>
              <button
                type="button"
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                onClick={onClose}
              >
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Customer Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-sm font-medium text-gray-500 w-24">Name:</span>
                      <span className="text-sm text-gray-900">{order.customerInfo.fullName}</span>
                    </div>
                    <div className="flex">
                      <span className="text-sm font-medium text-gray-500 w-24">Email:</span>
                      <span className="text-sm text-gray-900">{order.customerInfo.email}</span>
                    </div>
                    <div className="flex">
                      <span className="text-sm font-medium text-gray-500 w-24">Phone:</span>
                      <span className="text-sm text-gray-900">{order.customerInfo.phone}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-500 w-24 mb-1">Address:</span>
                      <span className="text-sm text-gray-900">
                        {order.customerInfo.address}, {order.customerInfo.city}, {order.customerInfo.postalCode}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Information */}
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-3">Order Information</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="space-y-2">
                    <div className="flex">
                      <span className="text-sm font-medium text-gray-500 w-32">Order Date:</span>
                      <span className="text-sm text-gray-900">{formatDate(order.orderDate)}</span>
                    </div>
                    <div className="flex">
                      <span className="text-sm font-medium text-gray-500 w-32">Est. Delivery:</span>
                      <span className="text-sm text-gray-900">{formatDate(order.estimatedDelivery)}</span>
                    </div>
                    <div className="flex">
                      <span className="text-sm font-medium text-gray-500 w-32">Payment Method:</span>
                      <span className="text-sm text-gray-900">
                        {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Credit/Debit Card'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 w-32">Status:</span>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        {getStatusBadge(order.status)}
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-gray-500 w-32">Assigned Rider:</span>
                      {assignedRider ? (
                        <div className="flex items-center">
                          <FiUsers className="mr-1" />
                          <span className="text-sm text-gray-900">{assignedRider.name}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">Not assigned</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Items */}
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Order Items</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Item
                      </th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          <div>
                            <div className="font-medium">{item.title}</div>
                            {item.specialInstructions && (
                              <div className="text-xs text-gray-500">Note: {item.specialInstructions}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {item.quantity}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          ৳{item.price}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          ৳{item.price * item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            {/* Pricing */}
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Pricing</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-2">
                  <div className="flex justify-between py-1">
                    <span className="text-sm">Subtotal:</span>
                    <span className="text-sm">৳{order.pricing.subtotal}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-sm">Delivery Fee:</span>
                    <span className="text-sm">৳{order.pricing.deliveryFee}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-sm">Tax:</span>
                    <span className="text-sm">৳{order.pricing.tax}</span>
                  </div>
                  <div className="flex justify-between py-1 font-medium text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>৳{order.pricing.total}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Order Timeline */}
            <div className="mt-6">
              <h4 className="text-lg font-medium text-gray-900 mb-3">Order Timeline</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="relative">
                  <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                        order.status === 'pending' || order.status === 'confirmed' || order.status === 'preparing' || 
                        order.status === 'ready' || order.status === 'out-for-delivery' || order.status === 'delivered' 
                          ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        <FiCheck className="text-white text-sm" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Order Placed</p>
                        <p className="text-xs text-gray-500">{formatDate(order.orderDate)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                        order.status === 'confirmed' || order.status === 'preparing' || 
                        order.status === 'ready' || order.status === 'out-for-delivery' || order.status === 'delivered' 
                          ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        <FiCheck className="text-white text-sm" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Order Confirmed</p>
                        <p className="text-xs text-gray-500">
                          {order.status === 'confirmed' || order.status === 'preparing' || 
                           order.status === 'ready' || order.status === 'out-for-delivery' || order.status === 'delivered' 
                            ? 'Completed' : 'Pending'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                        order.status === 'preparing' || order.status === 'ready' || 
                        order.status === 'out-for-delivery' || order.status === 'delivered' 
                          ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        <FiCheck className="text-white text-sm" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Preparing</p>
                        <p className="text-xs text-gray-500">
                          {order.status === 'preparing' || order.status === 'ready' || 
                           order.status === 'out-for-delivery' || order.status === 'delivered' 
                            ? 'Completed' : 'Pending'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                        order.status === 'ready' || order.status === 'out-for-delivery' || order.status === 'delivered' 
                          ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        <FiCheck className="text-white text-sm" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Ready for Pickup</p>
                        <p className="text-xs text-gray-500">
                          {order.status === 'ready' || order.status === 'out-for-delivery' || order.status === 'delivered' 
                            ? 'Completed' : 'Pending'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                        order.status === 'out-for-delivery' || order.status === 'delivered' 
                          ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        <FiCheck className="text-white text-sm" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Out for Delivery</p>
                        <p className="text-xs text-gray-500">
                          {order.status === 'out-for-delivery' || order.status === 'delivered' 
                            ? 'Completed' : 'Pending'}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${
                        order.status === 'delivered' ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        <FiCheck className="text-white text-sm" />
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-gray-900">Delivered</p>
                        <p className="text-xs text-gray-500">
                          {order.status === 'delivered' ? 'Completed' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Modal Actions */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse gap-2">
            {nextAction && (
              <button
                type="button"
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white ${nextAction.className} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm`}
                onClick={nextAction.action}
              >
                {nextAction.label}
              </button>
            )}
            
            {order.status === 'ready' && !order.assignedRider && (
              <div className="relative">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowRiderDropdown(!showRiderDropdown)}
                >
                  Assign Rider
                </button>
                
                {showRiderDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      {riders.length > 0 ? (
                        riders.map((rider) => (
                          <button
                            key={rider.id}
                            onClick={() => handleAssignRider(rider.id)}
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
            
            {order.status !== 'delivered' && order.status !== 'cancelled' && (
              <button
                type="button"
                className="w-full inline-flex justify-center rounded-md border border-red-300 shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={() => updateOrderStatus(order.id, 'cancelled')}
              >
                Cancel Order
              </button>
            )}
            
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:ml-3 sm:w-auto sm:text-sm"
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

export default OrderDetailsModal;