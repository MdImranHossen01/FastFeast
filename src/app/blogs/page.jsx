import getBlogs from "../actions/blogs/getBlogs";
import BlogContent from "./components/BlogContent";

export const metadata = {
  title: "FastFeast Food Journal – Tradition Meets Delivery",
  description:
    "Read about Bangladeshi cultural foods, modern delivery trends, and tasty tips for foodies across the nation.",
};

export default async function BlogsPage() {
  const posts = await getBlogs();

  return <BlogContent posts={posts} />;
}
