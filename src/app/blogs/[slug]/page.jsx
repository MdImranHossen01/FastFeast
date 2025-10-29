import Link from "next/link";
import { FaHome, FaTags, FaEye } from "react-icons/fa";
import getBlogs from "@/app/actions/blogs/getBlogs";
import ReactMarkdown from "react-markdown";
import RelatedBlogSidebar from "../components/RelatedBlogSlider";
import SocialIcons from "../components/SocialIcons";
import DOMPurify from "dompurify";
import Image from "next/image";

export default async function BlogDetails({ params }) {
  const { slug } = await params;
  const blogs = await getBlogs();

  // find post by slug (assuming slug matches _id)
  const post = blogs.find((p) => p._id === slug);

  if (!post) {
    return (
      <div className="container mx-auto py-20 text-center">
        <h2 className="text-2xl font-bold">Post not found</h2>
        <Link href="/blogs" className="btn mt-4">
          Back to Blogs
        </Link>
      </div>
    );
  }

  // Filter out the current post for the sidebar
  const relatedBlogs = blogs.filter((blog) => blog._id !== slug);

  return (
    <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 bg-white shadow-lg rounded-lg mt-10 mb-20">
      {/* Header Image */}
      <div className="relative w-full mb-8 overflow-hidden rounded-lg">
        <Image
          src={post.coverImage || post.image}
          alt={post.title}
          
          height={40}
          width={100}
        
          className="w-full h-[400px] object-cover rounded-lg"
        />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Main Blog Content */}
        <article className="md:col-span-8">
          <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-snug">
            {post.title}
          </h1>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-3 text-gray-600 text-sm">
            <div className="relative flex items-center gap-2">
              <Image
                src={post.authorPhoto || "/user.png"}
                alt={post.author}
                width={10}
                height={10}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-gray-800">
                  {post.author}
                </span>
                <span className="text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* View Count */}
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
            <FaEye className="w-5 h-5" />{" "}
            <span className="font-medium">{post.visitCount || 0}</span> views
          </div>

          {/* <div className="prose prose-lg max-w-none leading-relaxed text-gray-800 mb-10">
            <ReactMarkdown>{post.details}</ReactMarkdown>
          </div> */}
          {/* <div
            className="prose prose-lg max-w-none leading-relaxed text-gray-800 mb-10"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.details) }}
          ></div> */}

          <div
            className="prose prose-lg max-w-none leading-relaxed text-gray-800 mb-10"
            dangerouslySetInnerHTML={{ __html: post.details }}
          ></div>





          {/* Tags */}
          <div className="flex items-center flex-wrap gap-3 mt-6">
            <FaTags className="text-gray-400" />
            {post.tags?.map((tag, idx) => (
              <span
                key={idx}
                className="text-sm px-3 py-1 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Gallery */}
          {post.gallery?.length > 0 && (
            <section className="mt-12">
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                Photo Gallery
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {post.gallery.map((img, i) => (
                  <div key={i} className="relative overflow-hidden rounded-lg">
                    <Image
                      src={img}
                      alt={`Gallery ${i}`}
                      
                      height={40}
                      width={40}
                      className="w-full h-56 object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* Sidebar */}
        <aside className="md:col-span-4 space-y-8">
          <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About the Author</h2>
            <div className="relative flex flex-col items-center text-center">
              <Image
                src={post.authorPhoto || "/default-avatar.png"}
                alt={post.author}
                width={30}
                height={30}
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
      </div>

      {/* Back Button */}
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
