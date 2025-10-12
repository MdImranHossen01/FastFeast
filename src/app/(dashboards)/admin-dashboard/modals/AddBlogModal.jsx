"use client";

import { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { uploadToImgBB } from "@/utils/imageUpload";
import { FaPenFancy } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function AddBlogModal({ onSave }) {
  const { data: session } = useSession();
  // console.log(session.user.name)
  const userName = session?.user?.name;
  const userEmail = session?.user?.email;
  const userPhoto = session?.user?.image;
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    details: "",
    coverImage: "",
    gallery: [],
    author: "",
    publishDate: "",
    category: "",
    tags: "",
  });

  // ✅ Handle text input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCoverImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await uploadToImgBB(file);
      setFormData((prev) => ({ ...prev, coverImage: url })); // store hosted URL
    } catch (error) {
      console.error(error);
      alert("Cover image upload failed!");
    }
  };

  // ✅ Handle multiple image uploads (gallery)
  const handleGallery = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    try {
      // Upload all images in parallel
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadToImgBB(file))
      );

      // Save uploaded URLs into formData.gallery
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...uploadedUrls], // ✅ append, not overwrite
      }));
    } catch (error) {
      console.error(error);
      alert("Gallery upload failed!");
    }
  };

  // ✅ Submit
  const handleSubmit = async () => {
    const blogData = {
      ...formData,
      slug: formData.title.toLowerCase().replace(/\s+/g, "-"), // auto slug
      tags: formData.tags.split(",").map((t) => t.trim()),
      publishDate: formData.publishDate
        ? new Date(formData.publishDate).toISOString() // ✅ ISO format save
        : null,
      visitCount: 0,
      author: userName || "Anonymous",
      authorEmail: userEmail || "",
      authorPhoto: userPhoto || "/default-avatar.png",
    };

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blogData),
      });

      if (!res.ok) throw new Error("Failed to save blog");

      const result = await res.json();
      console.log("✅ Blog saved:", result);

      // ✅ SweetAlert success
      Swal.fire({
        icon: "success",
        title: "Blog Added!",
        text: `New blog "${formData.title}" added successfully 🎉`,
        confirmButtonColor: "#f97316",
      });

      // Optional: refresh parent state
      if (onSave) onSave(blogData);

      setOpen(false);
    } catch (error) {
      console.error("❌ Error saving blog:", error);

      // ❌ SweetAlert error
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to save blog. Please try again!",
        confirmButtonColor: "#ef4444", // red
      });
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white flex items-center gap-2 shadow-md px-4 py-2 rounded-lg"
      >
        <FaPenFancy />
        Add Blog
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg">
          <DialogHeader className="space-y-1">
            <DialogTitle className="text-2xl font-semibold">
              Create New Blog
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
              Provide the details below to publish your blog post.
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-4">
            {/* Title */}
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Title</span>
              <input
                name="title"
                className="w-full px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-orange-500"
                placeholder="Enter blog title"
                onChange={handleChange}
              />
            </label>

            {/* Excerpt */}
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Excerpt</span>
              <input
                name="excerpt"
                className="w-full px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-800 dark:border-gray-700 focus:ring-2 focus:ring-orange-500"
                placeholder="Short summary of the blog"
                onChange={handleChange}
              />
            </label>

            {/* Details */}
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Content</span>
              <textarea
                name="details"
                className="w-full px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-800 dark:border-gray-700 h-28 focus:ring-2 focus:ring-orange-500"
                placeholder="Write your full blog content here..."
                onChange={handleChange}
              />
            </label>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <span className="text-sm font-medium">Cover Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImage}
                className="text-sm"
              />
              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt="Preview"
                  className="mt-2 w-32 h-32 object-cover rounded-lg border shadow"
                />
              )}
            </div>

            {/* Gallery Image Upload */}
            <div className="space-y-2">
              <span className="text-sm font-medium">Gallery Images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGallery}
                className="text-sm"
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {formData.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Preview ${idx}`}
                    className="w-20 h-20 object-cover rounded-lg border shadow"
                  />
                ))}
              </div>
            </div>

            {/* Author */}
            <label className="flex flex-col gap-1">
              <span className="text-sm font-medium">Author</span>
              <input
                name="author"
                className="w-full px-3 py-2 rounded-lg border bg-gray-200 dark:bg-gray-700 cursor-not-allowed"
                value={userName}
                readOnly
              />
            </label>

            {/* Publish Date, Category, Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <input
                name="publishDate"
                type="date"
                className="px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                onChange={handleChange}
              />
              <input
                name="category"
                placeholder="Category"
                className="px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                onChange={handleChange}
              />
              <input
                name="tags"
                placeholder="Tags (comma separated)"
                className="px-3 py-2 rounded-lg border bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="dark:bg-gray-800 dark:text-gray-200 rounded-lg"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md"
            >
              Save Blog
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
