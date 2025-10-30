"use client";

import { MdArticle } from "react-icons/md";
import { useState, useEffect } from "react";
import AddBlogModal from "../modals/AddBlogModal";
import EditBlogModal from "../modals/EditBlogModal";
import BlogRow from "../components/BlogRow";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [editOpen, setEditOpen] = useState(false);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("/api/blogs");
      if (!response.ok) throw new Error("Failed to fetch blogs");
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleAddBlog = (newBlog) => {
    setBlogs((prev) => [newBlog, ...prev]);
  };

  const handleUpdateBlog = (updatedBlog) => {
    setBlogs((prev) =>
      prev.map((b) => (b._id === updatedBlog._id ? { ...b, ...updatedBlog } : b))
    );
  };

  const openEditModal = (blog) => {
    setSelectedBlog(blog);
    setEditOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-600 dark:text-gray-300">
        <div className="text-lg animate-pulse">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
          <MdArticle size={36} className="text-orange-500" /> Manage Blogs
        </h1>
        <AddBlogModal onSave={handleAddBlog} />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
        <table className="w-full rounded-lg overflow-hidden text-sm table-auto">
          <thead className="bg-orange-100 dark:bg-gray-800">
            <tr className="text-left text-gray-700 dark:text-gray-200">
              <th className="p-3 font-semibold">No.</th>
              <th className="p-3 font-semibold">Title</th>
              <th className="p-3 font-semibold">Excerpt</th>
              <th className="p-3 font-semibold">Category</th>
              <th className="p-3 text-center font-semibold">Visits</th>
              <th className="p-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500 dark:text-gray-400 italic">
                  No blogs found. Try adding a new one!
                </td>
              </tr>
            ) : (
              blogs.map((blog, index) => (
                <BlogRow
                  key={blog._id}
                  blog={blog}
                  index={index}
                  onEdit={() => openEditModal(blog)}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Blog Modal */}
      <EditBlogModal
        open={editOpen}
        onOpenChange={setEditOpen}
        blog={selectedBlog}
        onSave={handleUpdateBlog}
      />
    </div>
  );
}
