"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { uploadToImgBB } from "@/utils/imageUpload";
import { FaPenFancy } from "react-icons/fa";
import addBlog from "@/app/actions/blogs/addBlog";
import Image from "next/image";

export default function AddBlogModal({ onSave }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    details: "",
    coverImage: "",
    gallery: [],
    author: "68c991e89e31b26271cf8510",
    category: "",
    tags: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleDetailsChange = (e) =>
    setFormData({ ...formData, details: e.target.value });

  const handleCoverImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await uploadToImgBB(file);
      setFormData((prev) => ({ ...prev, coverImage: url }));
    } catch {
      Swal.fire("Error", "Cover image upload failed!", "error");
    }
  };

  const handleGallery = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    try {
      const uploadedUrls = await Promise.all(
        files.map((file) => uploadToImgBB(file))
      );
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...uploadedUrls],
      }));
    } catch {
      Swal.fire("Error", "Gallery upload failed!", "error");
    }
  };

 const handleSubmit = async () => {
  const blogData = {
    ...formData,
    slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
    tags: formData.tags.split(",").map((t) => t.trim()),
  };

  try {
   const res = await addBlog(blogData)
    

    if (!res.success) {
      throw new Error(data.message || "Failed to add blog");
    }

    Swal.fire({
      icon: "success",
      title: "🎉 Blog Added Successfully!",
      confirmButtonColor: "#f97316",
    });

    onSave?.(blogData);
    setOpen(false);
  } catch (error) {
    console.error("Error adding blog:", error);
    
    Swal.fire("Oops!", "Something went wrong, try again!", "error");
  }
};


  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-medium flex items-center gap-2 px-5 py-2 rounded-full shadow-lg transition-all duration-300 hover:scale-[1.02]"
      >
        <FaPenFancy /> Add Blog
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-orange-100 dark:border-gray-700 shadow-xl overflow-y-auto max-h-[90vh] p-6">
          {/* Header */}
          <DialogHeader className="border-b border-orange-100 dark:border-gray-700 pb-4 mb-4">
            <DialogTitle className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              ✍️ Create New Blog Post
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
              Share your ideas, stories, or updates with the world 🌍
            </DialogDescription>
          </DialogHeader>

          {/* Form */}
          <div className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                Blog Title
              </label>
              <input
                name="title"
                type="text"
                placeholder="Enter your blog title"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-400 outline-none"
                onChange={handleChange}
              />
            </div>

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                Short Excerpt
              </label>
              <textarea
                name="excerpt"
                placeholder="Write a short summary..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-400 outline-none"
                rows={2}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Blog Content - Simple Textarea */}
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">
                Blog Content
              </label>
              <textarea
                name="details"
                value={formData.details}
                onChange={handleDetailsChange}
                placeholder="Write your full blog content here..."
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:ring-2 focus:ring-orange-400 outline-none min-h-[200px] resize-y"
                rows={10}
              />
            </div>

            {/* Cover Image */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Cover Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImage}
                className="relative file-input file-input-bordered file-input-sm w-full max-w-xs"
              />
              {formData.coverImage && (
                <Image
                  src={formData.coverImage}
                  alt="Preview"
                  width={20}
                  height={20}
                  className="mt-2 w-40 h-28 object-cover rounded-xl border border-orange-200 shadow-md"
                />
              )}
            </div>

            {/* Gallery */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Gallery Images
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGallery}
                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.gallery.map((img, i) => (
                  <Image
                    key={i}
                    src={img}
                    alt=""
                    width={20}
                    height={20}
                    className="w-20 h-20 rounded-lg object-cover border shadow-sm"
                  />
                ))}
              </div>
            </div>

            {/* Category & Tags */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <input
                  name="category"
                  placeholder="e.g., Food, Travel, Health"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-400 outline-none"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Tags
                </label>
                <input
                  name="tags"
                  placeholder="comma separated tags"
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-400 outline-none"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-8 border-t border-orange-100 dark:border-gray-700 pt-4">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="rounded-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold shadow-lg hover:scale-[1.03] transition-transform"
            >
              Save Blog
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}