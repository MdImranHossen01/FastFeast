import Link from "next/link";
import { FaHome, FaTags } from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import RelatedBlogSidebar from "../components/RelatedBlogSlider";
import SocialIcons from "../components/SocialIcons";
import getBlogById from "@/app/actions/blogs/getBlogById";
import getBlogs from "@/app/actions/blogs/getBlogs";

export default async function BlogDetailsPage({ params: { slug: id } }) {
  const blog = await getBlogById(id);

  if (!blog) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold">Post not found</h2>
        <Link href="/blogs" className="btn mt-4">
          Back to Blogs
        </Link>
      </div>
    );
  }

  const relatedBlogs = await getBlogs({
    limit: 3,
    excludeIds: [blog._id],
  });

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 bg-white shadow-lg rounded-lg mt-10 mb-20">
      <article className="md:col-span-8">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-snug">
            {blog.title}
          </h1>
          <div className="flex items-center gap-4 mb-3 text-gray-600 text-sm">
            <img
              src={blog.authorPhoto || "/default-avatar.png"}
              alt={blog.author}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-gray-800">{blog.author}</span>
              <span className="text-gray-500">
                {new Date(blog.publishDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </header>

        <div className="prose prose-lg max-w-none leading-relaxed text-gray-800 mb-10">
          <ReactMarkdown>{blog.details}</ReactMarkdown>
        </div>

        <div className="flex items-center flex-wrap gap-3 mt-6">
          <FaTags className="text-gray-500" />
          {blog.tags?.map((tag, idx) => (
            <span
              key={idx}
              className="text-sm px-3 py-1 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
            >
              #{tag}
            </span>
          ))}
        </div>

        {blog.gallery?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
              Photo Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {blog.gallery.map((img, i) => (
                <div key={i} className="overflow-hidden rounded-lg">
                  <img
                    src={img}
                    alt={`Gallery ${i}`}
                    className="w-full h-56 object-cover hover:scale-105 transition-transform"
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </article>

      <aside className="md:col-span-4 space-y-8">
        <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">About the Author</h2>
          <div className="flex flex-col items-center text-center">
            <img
              src={"/default-avatar.png"}
              alt={blog.author}
              className="w-20 h-20 rounded-full mb-3 object-cover"
            />
            <p className="text-gray-600 text-sm">
              Passionate about exploring flavors and sharing stories through
              food.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">More Posts</h2>
          {relatedBlogs.length > 0 ? (
            <RelatedBlogSidebar blogs={relatedBlogs} />
          ) : (
            <p className="text-gray-500">No other posts found.</p>
          )}
        </div>

        <SocialIcons />
      </aside>

      <div className="mt-12 text-center">
        <Link
          href="/blogs"
          className="inline-flex items-center px-6 py-3 text-sm font-semibold border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-500 hover:text-white transition-colors"
        >
          <FaHome className="mr-2" /> Back to Blogs
        </Link>
      </div>
    </main>
  );
}
