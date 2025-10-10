import getBlogs from "../actions/blogs/getBlogs";
import BlogWrapper from "./components/BlogWrapper";

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <div className="mx-auto space-y-4">
      <BlogWrapper blogs={blogs} />
    </div>
  );
}
