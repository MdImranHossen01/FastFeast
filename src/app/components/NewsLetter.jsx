"use client"
import React, { useState } from "react";
import { FaRegPaperPlane } from "react-icons/fa";
import Swal from "sweetalert2";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (e) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(e).toLowerCase())
  }


  const handleSubmit = async (ev) => {
    ev.preventDefault();

    if (!email.trim()) {
      return Swal.fire({ icon: "warning", title: "Empty", text: "Please enter your email." });
    }
    if (!validateEmail(email)) {
      return Swal.fire({ icon: "error", title: "Invalid email", text: "Enter a valid email address." });
    }

    setLoading(true);
    try {
      const res = await fetch("/api/newsletters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // success sweet alert
        await Swal.fire({
          icon: "success",
          title: "Subscribed!",
          text: data.message || "You've been added to our newsletter.",
          timer: 2500,
          showConfirmButton: false,
        });
        setEmail("");
      } else {
        // handle 200 with already subscribed or error messages
        await Swal.fire({
          icon: data.success ? "info" : "error",
          title: data.success ? "Info" : "Error",
          text: data.message || "Something went wrong.",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Network Error", text: "Failed to subscribe. Try again later." });
    } finally {
      setLoading(false);
    }
  };




  return (
    <div>
      <p className="text-sm leading-relaxed mb-4">
        Get exclusive updates, offers, and content directly to your
        inbox.
      </p>
      <form className="flex"

        onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="your email address"
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="w-full bg-gray-700 text-white px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          suppressHydrationWarning
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-4 py-3 rounded-r-md transition-colors "
          aria-label="Subscribe"
        >
          <FaRegPaperPlane />
          {loading ? "Saving..." : "Subscribe"}
        </button>

      </form>
    </div>
  );
}
