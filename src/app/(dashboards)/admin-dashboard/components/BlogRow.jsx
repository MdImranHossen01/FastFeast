"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import React from "react";

export default function BlogRow({ blog, index, handleUpdate, handleDelete }) {
  return (
    <tr
      key={blog._id}
      className="transition-all duration-200 align-top border-t border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <td className="p-3 font-medium text-gray-800 dark:text-gray-100">
        {index + 1}
      </td>

      <td className="p-3 font-medium text-gray-800 dark:text-gray-100">
        {blog.title}
      </td>

      {/* Excerpt with Hover Expand */}
      <td className="p-3 text-gray-600 dark:text-gray-300 relative group max-w-xs">
        <div className="line-clamp-1 overflow-hidden">{blog.excerpt}</div>

        {/* Hover Tooltip */}
        <div
          className="absolute invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-150 
      left-1/2 -translate-x-1/2 top-full mt-1 
      bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 
      shadow-lg rounded-md p-2 w-64 z-20"
        >
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {blog.excerpt}
          </p>
        </div>
      </td>

      <td className="p-3 text-gray-700 dark:text-gray-200">{blog.category}</td>

      <td className="p-3 text-center font-semibold text-gray-800 dark:text-gray-100">
        {blog.visitCount || 0}
      </td>

      <td className="p-3 flex justify-center gap-2">
        <Button
          size="sm"
          variant="outline"
          className="flex items-center gap-1 hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400"
          onClick={() => handleUpdate(blog._id)}
        >
          <Pencil className="w-4 h-4" /> Edit
        </Button>

        <Button
          size="sm"
          variant="destructive"
          className="flex items-center gap-1 hover:bg-red-600"
          onClick={() => handleDelete(blog._id)}
        >
          <Trash2 className="w-4 h-4" /> Delete
        </Button>
      </td>
    </tr>
  );
}
