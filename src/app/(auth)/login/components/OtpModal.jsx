"use client";

import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { AiOutlineClose } from "react-icons/ai";

export default function OtpModal({ email, onClose }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(30); // 30 seconds countdown
  const inputRefs = useRef([]);

  // Countdown for RESEND OTP 
  useEffect(() => {
    let interval;
    if (resendDisabled) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setResendDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendDisabled]);

  const handleChange = (value, index) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) inputRefs.current[index + 1].focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6)
      return Swal.fire("Error", "Enter the 6-digit OTP", "error");

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password: "dummy",
        otp: code,
        skipOtp: true,
      });

      if (res?.ok) {
        Swal.fire("Success", "OTP verified, logged in!", "success");
        onClose();
        window.location.href = "/";
      } else {
        Swal.fire("Error", res?.error || "Invalid OTP", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server error", "error");
    } finally {
      setLoading(false);
    }
  };

 const handleResend = async () => {
  setResendDisabled(true);
  setTimer(30);

  try {
    const res = await fetch("/api/resend-otp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await res.json(); 

    if (!res.ok) {
      Swal.fire("Error", data.message || "Could not resend OTP", "error");
    } else {
      Swal.fire("Success", "OTP resent! Check your inbox.", "success");
    }
  } catch (err) {
    console.error(err);
    Swal.fire("Error", "Server error", "error");
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md text-center relative">
        {/* Close Icon */}
        <AiOutlineClose
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          size={22}
          onClick={onClose}
        />

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Please Enter the OTP to Verify your Account
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          An OTP has been sent to <b>{email}</b>
        </p>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-3 mt-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              value={digit}
              maxLength={1}
              ref={(el) => (inputRefs.current[idx] = el)}
              onChange={(e) => handleChange(e.target.value, idx)}
              className="w-10 h-12 text-center border border-gray-300 rounded-md text-lg font-semibold dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          ))}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={loading}
          className="w-full mt-6 py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 transition disabled:opacity-50"
        >
          {loading ? "Verifying..." : "Validate OTP"}
        </button>

        {/* Resend Text */}
        <p className="mt-4 text-sm text-gray-500">
          Don't receive a code?{" "}
          <span
            onClick={!resendDisabled ? handleResend : undefined}
            className={`font-semibold cursor-pointer ${
              resendDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-orange-500 hover:underline"
            }`}
          >
            RESEND OTP
          </span>{" "}
          {resendDisabled && <span className="text-gray-400">({timer}s)</span>}
        </p>
      </div>
    </div>
  );
}
