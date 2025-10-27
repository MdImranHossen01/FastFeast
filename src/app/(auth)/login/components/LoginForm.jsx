"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn, getSession } from "next-auth/react";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Swal from "sweetalert2";
import OtpModal from "./OtpModal";
import CreateDemoUsersButton from "./CreateDemoUsersButton";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState({ google: false, github: false });
  const [rememberMe, setRememberMe] = useState(false);

  const [showOtp, setShowOtp] = useState(false);
  const [emailForOtp, setEmailForOtp] = useState("");

  const router = useRouter();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
        callbackUrl: "/"
      });

      console.log("Login result:", result);

      if (result?.error === "OTP_REQUIRED") {
        Swal.fire("OTP Sent", "Check your email for the verification code", "info");
        setEmailForOtp(formData.email);
        setShowOtp(true);
      } else if (result?.ok || result?.url) {
        // Force session refresh and hard redirect
        const session = await getSession();
        console.log("Session after login:", session);
        
        Swal.fire({
          title: "Success!",
          text: "Logged in successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false
        }).then(() => {
          // Hard redirect to ensure session is properly loaded
          window.location.href = "/";
        });
      } else {
        const errorMessage = result?.error?.includes("CredentialsSignin") 
          ? "Invalid email or password" 
          : (result?.error || "Login failed");
        Swal.fire("Error", errorMessage, "error");
      }
    } catch (err) {
      console.error("Login error:", err);
      Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthSignIn = async (provider) => {
    setOauthLoading(prev => ({ ...prev, [provider]: true }));

    try {
      // Use window location for production compatibility
      const callbackUrl = typeof window !== 'undefined' 
        ? `${window.location.origin}/` 
        : "/";
      
      await signIn(provider, { 
        callbackUrl,
        redirect: true 
      });
    } catch (err) {
      console.error(`${provider} OAuth error:`, err);
      Swal.fire("Error", `Failed to sign in with ${provider}`, "error");
      setOauthLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 transform transition duration-300 hover:scale-[1.02]">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Log In to Explore the World of Food
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white transition-colors"
                disabled={loading}
              />
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white pr-10 transition-colors"
                disabled={loading}
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 pt-7 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() => setRememberMe(!rememberMe)}
                  className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                  disabled={loading}
                />
                <label className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  Remember me
                </label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex gap-3 w-full justify-around">
              <div>
                <CreateDemoUsersButton />
              </div>
              <Link href={"/demo-users"}>
                <button 
                  type="button"
                  className="py-2 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-md hover:from-purple-600 hover:to-purple-700 transition-all mt-4"
                >
                  Demo User Details
                </button>
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-md hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : "Log In"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
            <span className="text-gray-500 dark:text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          </div>

          <button
            onClick={() => handleOAuthSignIn("google")}
            disabled={oauthLoading.google || loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 
                 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 
                 transition-colors shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {oauthLoading.google ? (
              <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <FcGoogle className="text-xl" />
            )}
            {oauthLoading.google ? "Connecting..." : "Continue with Google"}
          </button>
          
          <button
            onClick={() => handleOAuthSignIn("github")}
            disabled={oauthLoading.github || loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 
                 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 
                 transition-colors shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {oauthLoading.github ? (
              <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <FaGithub className="text-xl" />
            )}
            {oauthLoading.github ? "Connecting..." : "Continue with GitHub"}
          </button>

          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            Don't have an account?{" "}
            <Link href="/register" className="text-blue-600 hover:underline transition-colors">
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      {showOtp && (
        <OtpModal email={emailForOtp} onClose={() => setShowOtp(false)} />
      )}
    </>
  );
}