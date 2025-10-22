"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function TransactionsPage() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions for the logged-in user
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const email = session?.user?.email;
        if (!email) return;

        const res = await fetch(`/api/transactions?userEmail=${email}`);
        const data = await res.json();
        setTransactions(data.transactions || []);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.email) fetchTransactions();
  }, [session]);

  // Loading UI
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-gray-300">
        <div className="animate-pulse text-lg">Loading your transactions...</div>
      </div>
    );
  }

  // Empty state
  if (!transactions.length) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-gray-400">
        <h2 className="text-3xl font-semibold">No Transactions Found</h2>
        <p className="text-gray-500 mt-3">
          Once you make a payment, your history will appear here.
        </p>
      </div>
    );
  }

  // Main UI
  return (
    <div className="min-h-screen px-[10%] pt-40">
      <h1 className="text-3xl font-bold text-center mb-15">💳 Transaction History</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {transactions.map((txn) => (
          <div
            key={txn._id}
            className="bg-white p-6 rounded-2xl border border-gray-700 shadow-xl hover:shadow-orange-500/30 transition duration-300"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-black">
                #{txn.transactionId || txn._id?.slice(-6)}
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  txn.status === "success"
                    ? "bg-green-700 text-green-200"
                    : txn.status === "failed"
                    ? "bg-red-700 text-red-200"
                    : "bg-yellow-700 text-yellow-200"
                }`}
              >
                {txn.status?.toUpperCase() || "PENDING"}
              </span>
            </div>

            <p className=" mb-1">Amount: ৳{txn.amount || "0"}</p>
            <p className=" mb-1 text-sm">
              Method: {txn.paymentMethod || "SSLCommerz"}
            </p>
            <p className="text-black mb-1 text-sm">
              Order ID: {txn.orderId || "N/A"}
            </p>

            <p className="text-gray-500 text-sm mt-3">
              {new Date(txn.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
