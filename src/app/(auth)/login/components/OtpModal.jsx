"use client";

import { useState, useRef, useEffect } from "react";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";
import { AiOutlineClose } from "react-icons/ai";

export default function OtpModal({ email, onClose }) {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(30);
  const inputRefs = useRef([]);

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

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      Swal.fire("Error", "Please enter the 6-digit OTP code", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password: "dummy", // This should match your credential provider expectation
        otp: code,
        skipOtp: true,
      });

      console.log("OTP verification response:", res); // Debug log

      if (res?.ok || res?.url) {
        Swal.fire("Success", "OTP verified successfully! Logging you in...", "success");
        onClose();
        // Use window.location for full page refresh
        window.location.href = "/";
      } else {
        Swal.fire("Error", res?.error || "Invalid OTP code. Please try again.", "error");
        // Clear OTP on error
        setOtp(new Array(6).fill(""));
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      console.error("OTP verification error:", err);
      Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
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
        throw new Error(data.message || "Failed to resend OTP");
      }

      Swal.fire("Success", "OTP has been resent to your email!", "success");
      // Clear previous OTP
      setOtp(new Array(6).fill(""));
      inputRefs.current[0]?.focus();
    } catch (err) {
      console.error("Resend OTP error:", err);
      Swal.fire("Error", err.message || "Failed to resend OTP. Please try again.", "error");
      setResendDisabled(false);
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-xl w-full max-w-md text-center relative mx-4">
        <AiOutlineClose
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          size={22}
          onClick={onClose}
        />

        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Verify Your Account
        </h2>
        <p className="text-sm text-gray-500 mb-1">
          Enter the 6-digit code sent to
        </p>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-6">
          {email}
        </p>

        <div className="flex justify-center gap-2 mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              value={digit}
              maxLength={1}
              ref={(el) => (inputRefs.current[idx] = el)}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-12 h-12 text-center border border-gray-300 dark:border-gray-600 rounded-lg text-lg font-semibold dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
              disabled={loading}
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={loading || otp.join("").length !== 6}
          className="w-full py-3 rounded-lg bg-orange-500 text-white font-medium hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Verifying...
            </span>
          ) : "Verify OTP"}
        </button>

        <p className="text-sm text-gray-500">
          Didn't receive the code?{" "}
          <button
            onClick={!resendDisabled && !resendLoading ? handleResend : undefined}
            disabled={resendDisabled || resendLoading}
            className={`font-semibold ${
              resendDisabled || resendLoading
                ? "text-gray-400 cursor-not-allowed"
                : "text-orange-500 hover:underline transition-colors"
            }`}
          >
            {resendLoading ? "Sending..." : "Resend OTP"}
          </button>{" "}
          {resendDisabled && !resendLoading && (
            <span className="text-gray-400">({timer}s)</span>
          )}
        </p>
      </div>
    </div>
  );
}