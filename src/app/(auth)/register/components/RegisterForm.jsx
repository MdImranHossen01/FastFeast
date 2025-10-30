"use client";

import { registerUser } from "@/app/actions/auth/registerUser";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) =>
    setFormData({ ...formData, image: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let photoUrl = "";

      // Upload image to ImgBB if a file is selected
      if (formData.image) {
        const imgData = new FormData();
        imgData.append("image", formData.image);
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: "POST", body: imgData }
        );
        const data = await res.json();
        if (data.success) {
          photoUrl = data.data.url;
        } else {
          Swal.fire("Error", "Image upload failed!", "error");
          setLoading(false);
          return;
        }
      }

      const result = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        image: photoUrl,
      });

      if (result.success) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Your account has been created successfully!",
          confirmButtonColor: "#2563eb",
        });
        setFormData({ name: "", email: "", password: "", image: null });
        router.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: result.message || "Registration failed",
          confirmButtonColor: "#dc2626",
        });
      }
    } catch (error) {
      console.error("Register error:", error);
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Something went wrong. Please try again later.",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6 transform transition duration-300 hover:scale-[1.02]">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Create an Account
        </h1>
        <p></p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="block w-full px-4 py-2 border rounded-md dark:bg-gray-700 text-gray-800 dark:text-white"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="block w-full px-4 py-2 border rounded-md text-gray-800 dark:bg-gray-700 dark:text-white"
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="block w-full px-4 py-2 border rounded-md dark:bg-gray-700 text-gray-800 dark:text-white pr-10"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </div>
          </div>

          {/* Profile Image */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Profile Image
            </label>
            <div className="relative w-full">
              <input
                type="text"
                readOnly
                value={formData.image ? formData.image.name : ""}
                placeholder="No file chosen"
                className="w-full px-4 py-2 pl-32 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2"
              />
              <label
                htmlFor="image"
                className="absolute top-0 left-0 h-full px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium rounded-l-md cursor-pointer flex items-center justify-center"
              >
                Choose File
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-md"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
          <span className="text-gray-500 dark:text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-600"></div>
        </div>

        {/* Google Sign In */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 
                 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 
                 transition-colors shadow-sm font-medium"
        >
          <FcGoogle className="text-xl" /> Continue with Google
        </button>
        <button
          onClick={() => signIn("github", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-gray-300 
                 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800 
                 transition-colors shadow-sm font-medium"
        >
          <FaGithub className="text-xl" />
          <span>Continue with GitHub</span>
        </button>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-2">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
