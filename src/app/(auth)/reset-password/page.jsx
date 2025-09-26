"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Lock } from "lucide-react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Password Reset",
          text: "Your password has been reset successfully",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        Swal.fire("Error", data.message || "Invalid or expired token", "error");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 via-white to-orange-50 dark:from-gray-900 dark:via-gray-950 dark:to-black">
        <p className="text-red-500 text-lg font-semibold">
          Invalid or expired reset link
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition duration-300 hover:scale-[1.02]"
      >
        <h2 className="text-3xl font-extrabold mb-2 text-center text-gray-900 dark:text-white">
          Reset Password
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 mb-6 text-sm">
          Choose a new password for your account
        </p>

        <div className="relative mb-4">
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-300" />
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="relative mb-6">
          <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-400 dark:text-gray-300" />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full pl-10 pr-4 py-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg hover:from-orange-600 hover:to-orange-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>

        <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Back to{" "}
          <a
            href="/login"
            className="text-orange-600 font-medium hover:underline"
          >
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
