"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import updateBlogById from "@/app/actions/blogs/updateBlogById";
import deleteBlogById from "@/app/actions/blogs/deleteBlogById";
import { toast } from "react-hot-toast";

export default function BlogRow({ blog, index }) {
  const handleUpdate = async () => {
    const updatedData = { title: prompt("New title:", blog.title) };
    if (!updatedData.title) return;

    const result = await updateBlogById(blog._id, updatedData);
    if (result.success) toast.success("Updated!");
    else toast.error(result.message);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    const result = await deleteBlogById(blog._id);
    if (result.success) toast.success("Deleted!");
    else toast.error(result.message);
  };

  return (
    <tr className="border-t border-gray-200 dark:border-gray-700">
      <td className="p-3">{index + 1}</td>
      <td className="p-3">{blog.title}</td>
      <td className="p-3 line-clamp-1">{blog.excerpt}</td>
      <td className="p-3">{blog.category}</td>
      <td className="p-3 text-center">{blog.visitCount || 0}</td>
      <td className="p-3 flex justify-center gap-2">
        <Button size="sm" onClick={handleUpdate} variant="outline">
          <Pencil className="w-4 h-4" /> Edit
        </Button>
        <Button size="sm" onClick={handleDelete} variant="destructive">
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </td>
    </tr>
  );
}
