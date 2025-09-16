"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function LoginPage() {
const [formData, setFormData] = useState({
email: "",
password: "",
});
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const router = useRouter();

const handleChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
e.preventDefault();
setLoading(true);

// have to connect backend later here
console.log("Login Data:", formData);

setTimeout(() => {
setLoading(false);
router.push("/");
}, 1000);
};

return (
<div className="flex items-center justify-center">
<div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md space-y-6">
<h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
Welcome Back
</h1>
<p className="text-center text-gray-500 dark:text-gray-400">
Sign in to access your account
</p>

<form onSubmit={handleSubmit} className="space-y-4">
{/* Email */}
<div>
<label
htmlFor="email"
className="block text-sm font-medium text-gray-700 dark:text-gray-200"
>
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

{/* Password */}
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
dark:bg-gray-700 dark:border-gray-600 dark:text-white pr-10"
/>

<div
className="absolute inset-y-0 right-0 pr-3 pt-5 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
onClick={() => setShowPassword(!showPassword)}
>
{showPassword ? <AiOutlineEyeInvisible size={25} /> : <AiOutlineEye size={25} />}
</div>
</div>

{/* Submit*/}
<button
type="submit"
disabled={loading}
className="w-full py-2 px-4 bg-gray-600 text-white font-semibold rounded-md
focus:outline-none focus:ring-2 focus:ring-offset-2
disabled:bg-indigo-400 disabled:cursor-not-allowed"
>
{loading ? "Signing in..." : "Sign In"}
</button>
</form>

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