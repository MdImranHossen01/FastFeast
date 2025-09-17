"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    image: null, 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ⚡ Placeholder — backend integration later
    console.log("Register Data:", formData);

    setTimeout(() => {
      setLoading(false);
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Create an Account
        </h1>
        <p className="text-center text-gray-500 dark:text-gray-400">
          Sign up to get started
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
               dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
               dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
          </div>

          <div className="relative mt-4">
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1"
      >
        Password
      </label>

      <input
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm
          f dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
      />

      {/* view Icon */}
      <div
        className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <AiOutlineEyeInvisible size={25} /> : <AiOutlineEye size={25} />}
      </div>
    </div>

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
    className="absolute top-0 left-0 h-full px-4 py-2 bg-gray-600 text-white font-medium rounded-l-md cursor-pointer flex items-center justify-center"
  >
    Choose File
    <input
      type="file"
      id="image"
      name="image"
      accept="image/*"
      onChange={handleImageChange}
      className="hidden"
    />
  </label>
</div>
</div>


          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md
            focus:outline-none focus:ring-2 focus:ring-offset-2
            disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
}
