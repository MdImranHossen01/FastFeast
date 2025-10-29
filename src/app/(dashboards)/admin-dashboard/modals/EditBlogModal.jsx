"use client";
import { useState, useEffect } from "react";
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
import updateBlogById from "@/app/actions/blogs/updateBlogById";
import Image from "next/image";

export default function EditBlogModal({ open, onOpenChange, blog, onSave }) {
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    excerpt: "",
    details: "",
    coverImage: "",
    gallery: [],
    category: "",
    tags: "",
  });

  useEffect(() => {
    if (blog) {
      setFormData({
        slug: blog.slug || "",
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        details: blog.details || "",
        coverImage: blog.coverImage || "",
        gallery: blog.gallery || [],
        category: blog.category || "",
        tags: blog.tags?.join(", ") || "",
      });
    }
  }, [blog]);

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
      const uploadedUrls = await Promise.all(files.map(uploadToImgBB));
      setFormData((prev) => ({
        ...prev,
        gallery: [...prev.gallery, ...uploadedUrls],
      }));
    } catch {
      Swal.fire("Error", "Gallery upload failed!", "error");
    }
  };

  const removeGalleryImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async () => {
    if (!blog?._id) return;

    const blogData = {
      ...formData,
      slug: formData.title.toLowerCase().replace(/\s+/g, "-"),
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    try {
      await updateBlogById(blog._id, blogData);
      Swal.fire({
        icon: "success",
        title: "🎉 Blog Updated Successfully!",
        confirmButtonColor: "#f97316",
      });
      onSave?.(blogData);
      onOpenChange(false);
    } catch {
      Swal.fire("Oops!", "Something went wrong, try again!", "error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-gradient-to-br from-white to-orange-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl border border-orange-100 dark:border-gray-700 shadow-xl overflow-y-auto max-h-[90vh] p-6">
        <div className="overflow-y-auto max-h-[85vh] p-6">
          {/* Header */}
          <DialogHeader className="border-b border-orange-100 dark:border-gray-700 pb-4 mb-4">
            <DialogTitle className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              ✏️ Edit Blog Post
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
              Update your blog content and details
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
                value={formData.title}
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
                value={formData.excerpt}
                placeholder="Write a short summary..."
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 focus:ring-2 focus:ring-orange-400 outline-none"
                rows={2}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Blog Content */}
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
                className="file-input file-input-bordered file-input-sm w-full max-w-xs"
              />
              {formData.coverImage && (
                <div className=" relative">
                  <Image
                    src={formData.coverImage}
                    alt="Cover Preview"
                    fill
                    sizes="(max-width: 768px) 100vw, 500px"
                    className="object-cover rounded-xl border border-orange-200 shadow-md"
                  />


                </div>
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
                  <div key={i} className="relative">
                    <Image
                      src={img}
                      alt={`Gallery ${i}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 500px"
                      className="object-cover rounded-xl border border-orange-200 shadow-md"
                    />
                    <button
                      onClick={() => removeGalleryImage(i)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
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
                  value={formData.category}
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
                  value={formData.tags}
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
              onClick={() => onOpenChange(false)}
              className="rounded-full border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="rounded-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-semibold shadow-lg hover:scale-[1.03] transition-transform"
            >
              Update Blog
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
