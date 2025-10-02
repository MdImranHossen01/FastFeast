import Link from "next/link";
import { FaHome, FaUser, FaCalendar, FaTags } from "react-icons/fa";
import getBlogs from "@/app/actions/blogs/getBlogs";
import ReactMarkdown from "react-markdown";

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

  return (
    <main className="max-w-[1500px] mx-auto px-14 py-18">
      {/* Cover Image */}
      <div className="w-full md:h-[500px] overflow-hidden rounded-xl shadow-lg mb-8">
        <img
          src={post.coverImage || post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title & Meta */}
      <header className="mb-6">
        <h1 className="text-4xl font-extrabold mb-4">{post.title}</h1>
        <div className="flex items-center gap-6 text-gray-600 text-sm">
          <span className="flex items-center gap-2">
            <img
              src={post.authorPhoto || "/default-avatar.png"}
              alt={post.author}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-medium">{post.author}</span>
              <span className="text-gray-500">{post.authorEmail}</span>
            </div>
          </span>
          <span className="flex items-center gap-2">
            <FaCalendar />{" "}
            {new Date(post.publishDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </header>


      {/* Details */}
      <article className="prose max-w-none mb-10">
        <ReactMarkdown>{post.details}</ReactMarkdown>
      </article>

      {/* Gallery */}
      {post.gallery && post.gallery.length > 0 && (
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {post.gallery.map((img, index) => (
              <div key={index} className="overflow-hidden rounded-lg shadow">
                <img
                  src={img}
                  alt={`Gallery ${index}`}
                  className="w-full h-78 object-cover hover:scale-110 transition-transform"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Tags */}
      <div className="flex items-center gap-2 flex-wrap mb-10">
        <FaTags className="text-gray-500" />
        {post.tags?.map((tag, idx) => (
          <span key={idx} className="badge badge-outline">
            {tag}
          </span>
        ))}
      </div>

      {/* Back Button */}
      <Link
        href="/blogs"
        className="btn btn-outline text-orange-500 hover:bg-orange-600 hover:text-white"
      >
        <FaHome className="mr-2" /> Back to Blogs
      </Link>
    </main>
  );
}
