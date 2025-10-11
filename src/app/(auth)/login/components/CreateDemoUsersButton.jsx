"use client";

import { useState } from "react";
import Swal from "sweetalert2";

export default function CreateDemoUsersButton() {
  const [loading, setLoading] = useState(false);

  const handleCreateDemoUsers = async () => {
    // Confirm before creating users
    const result = await Swal.fire({
      title: "Create Demo Users?",
      html: `
        <p>This will create 15 demo users (3 for each role) in your database.</p>
        <p>Existing demo users will be skipped.</p>
        <p class="mt-3 text-sm">Roles: user, rider, restaurant, moderator, admin</p>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, create them!",
    });

    if (!result.isConfirmed) return;

    setLoading(true);
    try {
      const response = await fetch("/api/create-demo-users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message with demo user credentials
        Swal.fire({
          title: "Demo Users Created!",
          html: `
            <p>15 demo users have been created successfully.</p>
            <p class="mt-3">You can now log in with these accounts:</p>
            <div class="text-left mt-3">
              <p><strong>User:</strong> demo-user-1@fastfeast.com / demo-user-1</p>
              <p><strong>Rider:</strong> demo-rider-1@fastfeast.com / demo-rider-1</p>
              <p><strong>Restaurant:</strong> demo-restaurant-1@fastfeast.com / demo-restaurant-1</p>
              <p><strong>Moderator:</strong> demo-moderator-1@fastfeast.com / demo-moderator-1</p>
              <p><strong>Admin:</strong> demo-admin-1@fastfeast.com / demo-admin-1</p>
            </div>
            <p class="mt-3 text-sm">OTP verification is disabled for all demo users.</p>
          `,
          icon: "success",
          width: "600px",
        });
      } else {
        Swal.fire(
          "Error",
          data.error || "Failed to create demo users",
          "error"
        );
      }
    } catch (error) {
      console.error("Error creating demo users:", error);
      Swal.fire(
        "Error",
        "An error occurred while creating demo users",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCreateDemoUsers}
      disabled={loading}
      className="py-2 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed mt-4"
    >
      {loading ? "Creating..." : "Create Demo Users"}
    </button>
  );
}