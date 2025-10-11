"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import deleteBlogById from "@/app/actions/blogs/deleteBlogById";
import Swal from "sweetalert2";
import EditBlogModal from "../modals/EditBlogModal";

export default function BlogRow({ blog, index, onBlogUpdated }) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This blog will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    const result = await deleteBlogById(blog._id);
    if (result.success) {
      Swal.fire("Deleted!", "The blog has been removed.", "success");
    } else {
      Swal.fire("Error!", result.message, "error");
    }
  };

  return (
    <>
      <tr className="border-t border-gray-200 dark:border-gray-700">
        <td className="p-3">{index + 1}</td>
        <td className="p-3">{blog.title}</td>
        <td className="p-3 line-clamp-1">{blog.excerpt}</td>
        <td className="p-3">{blog.category}</td>
        <td className="p-3 text-center">{blog.visitCount || 0}</td>
        <td className="p-3 flex justify-center gap-2">
          <Button
            size="sm"
            onClick={() => setIsEditOpen(true)}
            variant="outline"
          >
            <Pencil className="w-4 h-4" /> Edit
          </Button>
          <Button size="sm" onClick={handleDelete} variant="destructive">
            <Trash2 className="w-4 h-4" /> Delete
          </Button>
        </td>
      </tr>

      {/* Modal */}
      {isEditOpen && (
        <EditBlogModal
          blog={blog}
          open={isEditOpen}
          setOpen={setIsEditOpen}
          onUpdate={(updatedBlog) => {
            if (onBlogUpdated) onBlogUpdated(updatedBlog);
          }}
        />
      )}
    </>
  );
}
