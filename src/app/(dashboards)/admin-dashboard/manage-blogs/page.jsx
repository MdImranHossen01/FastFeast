"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import AddBlogModal from "../modals/AddBlogModal";
import EditBlogModal from "../modals/EditBlogModal";

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // after clicking add button
  const handleUpdate = (id) => {
    const blog = blogs.find((b) => b._id === id);
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };
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


  // const handleUpdate = (id) => {
  //   const blog = blogs.find((b) => b._id === id);
  //   setEditBlog(blog);
  //   setOpenModal(true);
  // };


  // ✅ Save Blog (Update only)
  const handleSave = async (formValues) => {
    try {
      await fetch(`/api/blogs/${formValues._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      setBlogs((prev) =>
        prev.map((b) => (b._id === formValues._id ? { ...b, ...formValues } : b))
      );

      Swal.fire("Updated!", "Blog edited successfully!", "success");
    } catch (err) {
      console.error("Failed to update blog:", err);
      Swal.fire("Error", "Failed to update blog", "error");
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
      
        
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-500">Manage Blogs</h1>

            {/* ✅ Add Blog Modal button */}
            <AddBlogModal onSave={handleSave} />
          </div>

          {/* Table */}
         <div className="overflow-x-auto rounded-lg shadow-md py-2">
  <table className="w-full rounded-lg overflow-hidden text-sm table-auto">
    <thead className="hidden md:table-header-group bg-gray-100 dark:bg-gray-800">
      <tr className="text-sm block md:table-row text-gray-100 dark:text-gray-100 text-left">
        
        <th className="p-3 text-left">#</th>
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
          <td
            colSpan="6"
            className="p-4 text-center text-gray-500 dark:text-gray-400"
          >
            Loading blogs...
          </td>
        </tr>
      ) : blogs.length === 0 ? (
        <tr>
          <td
            colSpan="6"
            className="p-4 text-center text-gray-500 dark:text-gray-400"
          >
            No blogs found.
          </td>
        </tr>
      ) : (
        blogs.map((blog, index) => (
          <tr
            key={blog._id || blog.slug || index}
            className="transition-all duration-200 align-top border-t border-gray-200"
          >
            <td className="p-3 font-medium text-gray-800 dark:text-gray-100">
              {index}
            </td>
            <td className="p-3 font-medium text-gray-800 dark:text-gray-100">
              {blog.title}
            </td>

            {/* FIXED CELL */}
            <td className="p-3 text-gray-600 dark:text-gray-300 relative group">
              <div className="line-clamp-1 group-hover:line-clamp-none group-hover:absolute group-hover:z-10 group-hover:bg-white dark:group-hover:bg-gray-900 group-hover:p-2 group-hover:shadow-md group-hover:rounded-md group-hover:left-0 group-hover:right-0 transition-all duration-300">
                {blog.excerpt}
              </div>
            </td>

            <td className="p-3 text-gray-700 dark:text-gray-200">
              {blog.category}
            </td>
            <td className="p-3 text-gray-700 dark:text-gray-200">
              {blog.author}
            </td>
            <td className="p-3 text-center text-gray-800 dark:text-gray-100">
              {blog.visitCount || 0}
            </td>

            <td className="p-3 flex justify-center gap-3">
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => handleUpdate(blog._id)}
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


        
      

      {/* ✅ Modal এখানে থাকবে */}
      {selectedBlog && (
        <EditBlogModal
          blog={selectedBlog}
          open={isModalOpen}
          setOpen={setIsModalOpen}
          onUpdate={handleUpdate}
        />
      )}
    </main>
  );
}
