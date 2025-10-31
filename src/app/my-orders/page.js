'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

function MyOrdersPage() {
    const { data: session, status } = useSession();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.email) {
            const fetchMyOrders = async () => {
                try {
                    const userEmail = session.user.email;
                    const response = await fetch(`/api/user-orders/${userEmail}`);
                    const data = await response.json();

                    if (data.success) {
                        setOrders(data.orders);
                    } else {
                        throw new Error(data.message || 'Failed to fetch orders.');
                    }
                } catch (err) {
                    setError(err.message);
                    console.error(err);
                } finally {
                    setIsLoading(false);
                }
            };

            fetchMyOrders();
        } else if (status === 'loading') {
            setIsLoading(true);
        } else if (status === 'unauthenticated') {
            setError('Please log in to see your orders.');
            setIsLoading(false);
        }
    }, [session, status]);

    // 1. Handle Loading
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-black py-20">
                {/* REMOVED 'pt-30' from here */}
                <div className="mx-auto px-[11%]">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">My Order History</h2>
                    <p>Loading your order history...</p>
                </div>
            </div>
        );
    }

    // 2. Handle Errors
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-black py-20">
                <div className="mx-auto px-[11%]">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">My Order History</h2>
                    <div style={{ color: 'red' }}>Error: {error}</div>
                </div>
            </div>
        );
    }

    // 3. Display Orders
    return (
        // This wrapper provides the main page styling
        <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-black py-20">

            <div className="mx-auto px-[11%]">
                <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                    My Order History
                </h2>

                {orders.length === 0 ? (
                    <p className="text-gray-600 dark:text-gray-400">
                        You have not placed any orders yet.
                    </p>
                ) : (
                    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{order.orderId}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{new Date(order.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">${order.pricing.total.toFixed(2)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            {/* Status badges */}
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                                            ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : ''}
                                            ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : ''}
                                            ${order.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                                            `}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <Link href={`/order-details/${order._id}`} className="text-orange-600 hover:text-orange-800">
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyOrdersPage;