import Link from "next/link";
import Image from "next/image";
import getBlogs from "../actions/blogs/getBlogs";
import BlogContent from "./components/BlogContent";
import { FaHome } from "react-icons/fa";
import bannerImage from "../../assets/blog-page-banner.jpg";
import Banner from "./components/Banner";

// export const metadata = {
//   title: "FastFeast Food Journal – Tradition Meets Delivery",
//   description:
//     "Read about Bangladeshi cultural foods, modern delivery trends, and tasty tips for foodies across the nation.",
// };

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="mx-auto pt-18">
      <Banner blogs={blogs}/>
      

      <BlogContent blogs={blogs} />
    </div>
  );
}
