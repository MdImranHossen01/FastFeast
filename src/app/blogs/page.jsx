import Link from "next/link";
import getBlogs from "../actions/blogs/getBlogs";
import BlogContent from "./components/BlogContent";
import { FaHome } from "react-icons/fa";

export const metadata = {
  title: "FastFeast Food Journal – Tradition Meets Delivery",
  description:
    "Read about Bangladeshi cultural foods, modern delivery trends, and tasty tips for foodies across the nation.",
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto pt-18">
      {/* Header  */}
      <header className="mb-6 flex justify-between items-center space-y-6">
        <div>
          <h1 className="text-4xl font-extrabold py-5 bg-gradient-to-r from-red-700 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
            FastFeast Food Journal – Tradition Meets Delivery
          </h1>
          <p className="text-gray-600">
            Read about Bangladeshi cultural foods, modern delivery trends, and
            tasty tips for foodies across the nation. Latest tips, rider guides
            and food ordering news.
          </p>
        </div>
        <Link href={"/"}>
          <button className="btn btn-outline text-orange-500 rounded-sm flex justify-center hover:bg-orange-600 hover:text-white">
            <FaHome style={{ marginRight: "8px" }} /> Back to Home
          </button>
        </Link>
      </header>

      <BlogContent blogs={blogs} />
    </div>
  );
}
