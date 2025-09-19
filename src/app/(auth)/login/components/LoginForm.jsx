"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res.error) {
      Swal.fire("Error", res.error, "error");
    } else {
      Swal.fire({
        icon: "success",
        title: "Welcome!",
        text: "Logged in successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      router.push("/");
    }

    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
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
              placeholder="Email"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="relative mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Password"
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={25} />
              ) : (
                <AiOutlineEye size={25} />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="text-gray-500 dark:text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border rounded-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition font-medium text-gray-700 dark:text-gray-200"
        >
          <FcGoogle size={22} /> Continue with Google
        </button>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-600 hover:underline">
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}
