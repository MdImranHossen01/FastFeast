"use client";

import { useState, useEffect, useCallback } from "react"; 
import { useSession } from "next-auth/react";

export default function TransactionsPage() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(null); 

  // Memoized function to fetch transactions
  const fetchTransactions = useCallback(async (email) => {
    try {
      if (!email) return;

      const res = await fetch(`/api/transactions?userEmail=${email}`);
      const data = await res.json();
      setTransactions(data.transactions || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  }, []); // Empty dependency array means this function is stable

  // Effect to run the fetcher
  useEffect(() => {
    if (session?.user?.email) {
      fetchTransactions(session.user.email);
    } else if (!session) {
      setLoading(false);
    }
  }, [session, fetchTransactions]);

  //  Handler for deleting a transaction
  const handleDelete = async (transactionId) => {
    if (!window.confirm("Are you sure you want to delete this transaction record? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(transactionId);
    try {
      const res = await fetch(`/api/transactions?id=${transactionId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        // Remove the deleted item from the state immediately
        setTransactions((prevTxns) =>
          prevTxns.filter((txn) => txn._id !== transactionId)
        );
      } else {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete transaction.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert(error.message);
    } finally {
      setIsDeleting(null);
    }
  };

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
      <h1 className="text-3xl font-bold text-center mb-15"> Transaction History</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {transactions.map((txn) => (
          <div
            key={txn._id}
            className="bg-white p-6 rounded-2xl border border-gray-700 shadow-xl hover:shadow-orange-500/30 transition duration-300 flex flex-col justify-between" 
          >
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-black">
                  #{txn.transactionId || txn._id?.slice(-6)}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${txn.status === "success"
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

            {/*DELETE BUTTON SECTION */}
            <button
              onClick={() => handleDelete(txn._id)}
              disabled={isDeleting === txn._id}
              className="mt-4 flex items-center justify-center space-x-2 px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors"
            >
              {isDeleting === txn._id ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  Delete History
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}