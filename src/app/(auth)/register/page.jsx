"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) =>
    setFormData({ ...formData, image: e.target.files[0] });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoUrl = "";

      // 1. Upload image to ImgBB
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
          alert("Image upload failed!");
          setLoading(false);
          return;
        }
      }

      // 2. Save user in DB
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          photoUrl,
        }),
      });

      const result = await res.json();

      if (res.error) {
        Swal.fire("Error", res.error, "error");
      } 
      else {
        Swal.fire({
          icon: "success",
          title: "Congratulations!",
          text: `${formData.name}`,
          timer: 2000,
          showConfirmButton: false,
        });
        router.push("/login");
      }
    } 
    catch (err) {
      console.error("Error registering:", err);
      alert("Something went wrong!");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
          Create an Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
            className="block w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="block w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white"
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
              className="block w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:text-white pr-10"
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
      className="w-full px-4 py-2 pl-32 border border-gray-300 dark:border-gray-600 
                 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-200 
                 focus:outline-none focus:ring-2"
    />
    <label
      htmlFor="image"
      className="absolute top-0 left-0 h-full px-4 py-2 bg-gray-600 text-white font-medium 
                 rounded-l-md cursor-pointer flex items-center justify-center"
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
            className="w-full py-2 px-4 bg-gray-600 text-white rounded-md"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Google Sign In */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border rounded-md mt-4"
        >
          <FcGoogle size={22} /> Continue with Google
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
