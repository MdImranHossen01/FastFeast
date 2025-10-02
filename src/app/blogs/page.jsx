import getBlogs from "../actions/blogs/getBlogs";
import BlogWrapper from "./components/BlogWrapper";


export default async function BlogsPage() {
  
  const blogs = await getBlogs();

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Blogs</h1>
      <BlogWrapper blogs={blogs} /> {/* client component call */}
    </div>
  );
}
