import Link from "next/link";
import Image from "next/image";
import getBlogs from "../actions/blogs/getBlogs";
import BlogContent from "./components/BlogContent";
import { FaHome } from "react-icons/fa";
import bannerImage from "../../assets/blog-page-banner.jpg";

export const metadata = {
  title: "FastFeast Food Journal – Tradition Meets Delivery",
  description:
    "Read about Bangladeshi cultural foods, modern delivery trends, and tasty tips for foodies across the nation.",
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="max-w-[1500px] mx-auto pt-16">
      {/* Header */}
      <header className="mb-6 relative bg-cover bg-center bg-no-repeat min-h-80 h-80 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={bannerImage}
            alt="FastFeast Blog Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center h-full p-8">
          <div>
            <h1 className="text-4xl font-extrabold py-2 bg-gradient-to-r from-red-700 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              FastFeast Food Journal – Tradition Meets Delivery
            </h1>
            <p className="text-gray-100 max-w-2xl">
              Read about Bangladeshi cultural foods, modern delivery trends, and
              tasty tips for foodies across the nation. Latest tips, rider
              guides and food ordering news.
            </p>
          </div>

          <Link href={"/"}>
            <button className="mt-4 md:mt-0 px-5 py-2 border border-orange-500 text-orange-500 rounded-sm flex items-center hover:bg-orange-600 hover:text-white transition">
              <FaHome className="mr-2" /> Back to Home
            </button>
          </Link>
        </div>
      </header>

      <BlogContent blogs={blogs} />
    </div>
  );
}