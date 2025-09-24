"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import AddBlogModal from "../modals/AddBlogModal";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  useEffect(() => {
    
  }, []);

  // ✅ Save Blog (Add or Update)
  const handleSave = async (formValues) => {
    try {
      // If updating blog (formValues contains _id)
      if (formValues._id) {
        await fetch(`/api/blogs/${formValues._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        });
        setBlogs((prev) =>
          prev.map((b) =>
            b._id === formValues._id ? { ...b, ...formValues } : b
          )
        );
        Swal.fire("Updated!", "Blog updated successfully", "success");
      } else {
        // Create new blog
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        });
        const newBlog = await res.json();
        setBlogs((prev) => [...prev, newBlog]);
        Swal.fire("Success!", "Blog added successfully", "success");
      }
    } catch (err) {
      console.error("Failed to save blog:", err);
      Swal.fire("Error", "Failed to save blog", "error");
    }
  };

  // ✅ Delete Blog
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This blog will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await fetch(`/api/blogs/${id}`, { method: "DELETE" });
          setBlogs((prev) => prev.filter((b) => b._id !== id));
          Swal.fire("Deleted!", "Blog has been deleted.", "success");
        } catch (err) {
          console.error("Failed to delete blog:", err);
          Swal.fire("Error", "Failed to delete blog", "error");
        }
      }
    });
  };

  return (
    <main className="container mx-auto">
      <Card className="shadow-lg">
        <CardContent className="p-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Manage Blogs</h1>

            {/* ✅ Add Blog Modal button */}
            <AddBlogModal onSave={handleSave} />
          </div>

          {/* Table */}
          <div className="overflow-hidden">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Excerpt</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Author</th>
                  <th className="p-3 text-center">Visits</th>
                  <th className="p-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      Loading blogs...
                    </td>
                  </tr>
                ) : blogs.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center text-gray-500">
                      No blogs found.
                    </td>
                  </tr>
                ) : (
                  blogs.map((blog) => (
                    <tr
                      key={blog._id}
                      className="border-t hover:bg-gray-50 transition"
                    >
                      <td className="p-3 font-medium">{blog.title}</td>
                      <td className="p-3 text-gray-600 line-clamp-1">
                        {blog.excerpt}
                      </td>
                      <td className="p-3">{blog.category}</td>
                      <td className="p-3">{blog.author}</td>
                      <td className="p-3 text-center">
                        {blog.visitCount || 0}
                      </td>
                      <td className="p-3 flex justify-center gap-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center gap-1"
                          onClick={
                            () => handleSave({ ...blog, _id: blog._id }) // reuse modal save
                          }
                        >
                          <Pencil className="w-4 h-4" /> Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="flex items-center gap-1"
                          onClick={() => handleDelete(blog._id)}
                        >
                          <Trash2 className="w-4 h-4" /> Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
