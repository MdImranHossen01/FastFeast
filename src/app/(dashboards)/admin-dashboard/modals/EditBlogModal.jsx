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
import { FiEdit3 } from "react-icons/fi";

export default function EditBlogModal({ blog, onUpdate, open, setOpen }) {
  const [formData, setFormData] = useState({
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

  // ✅ Pre-fill form when modal opens
  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title || "",
        excerpt: blog.excerpt || "",
        details: blog.details || "",
        coverImage: blog.coverImage || "",
        gallery: blog.gallery || [],
        author: blog.author || "",
        publishDate: blog.publishDate
          ? new Date(blog.publishDate).toISOString().split("T")[0]
          : "",
        category: blog.category || "",
        tags: blog.tags ? blog.tags.join(", ") : "",
      });
    }
  }, [blog]);

  // ✅ Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Upload Cover Image
  const handleCoverImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const url = await uploadToImgBB(file);
      setFormData((prev) => ({ ...prev, coverImage: url }));
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Cover image upload failed!", "error");
    }
  };

  // ✅ Upload Gallery Images
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
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Gallery upload failed!", "error");
    }
  };

  // ✅ Submit handler
  const handleSubmit = async () => {
    const updatedBlog = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
      publishDate: formData.publishDate
        ? new Date(formData.publishDate).toISOString()
        : null,
    };

    try {
      const res = await fetch(`/api/blogs/${blog._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBlog),
      });

      const data = await res.json();

      if (!res.ok) throw new Error("Failed to update blog");

      if (data?.modifiedCount > 0 || data?.acknowledged) {
        Swal.fire({
          icon: "success",
          title: "Blog Updated!",
          text: `Your blog "${formData.title}" has been updated successfully 🎉`,
          confirmButtonColor: "#f97316",
        });

        if (onUpdate) onUpdate(updatedBlog);
        setOpen(false);
      } else {
        Swal.fire({
          icon: "info",
          title: "No Changes Made",
          text: "You didn't make any changes to the blog.",
        });
      }
    } catch (error) {
      console.error("❌ Error updating blog:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update blog!",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className="bg-orange-500 text-white flex items-center gap-2"
      >
        <FiEdit3 />
        Edit
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogDescription>
              Update your blog details and click <strong>Update</strong> when done.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {/* Title */}
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
              className="input input-bordered w-full"
            />

            {/* Excerpt */}
            <input
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              placeholder="Excerpt"
              className="input input-bordered w-full"
            />

            {/* Details */}
            <textarea
              name="details"
              value={formData.details}
              onChange={handleChange}
              placeholder="Details"
              className="textarea textarea-bordered w-full"
            />

            {/* ✅ Cover Image */}
            <div>
              <label className="block mb-1 font-medium">Cover Image</label>
              <input type="file" accept="image/*" onChange={handleCoverImage} />
              {formData.coverImage && (
                <img
                  src={formData.coverImage}
                  alt="Cover Preview"
                  className="mt-2 w-32 h-32 object-cover rounded"
                />
              )}
            </div>

            {/* ✅ Gallery Images */}
            <div>
              <label className="block mb-1 font-medium">Gallery Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleGallery}
              />
              <div className="flex gap-2 mt-2 flex-wrap">
                {formData.gallery.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Gallery ${idx}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            </div>

            {/* Other Fields */}
            <input
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
              className="input input-bordered w-full"
            />

            <input
              name="publishDate"
              type="date"
              value={formData.publishDate}
              onChange={handleChange}
              className="input input-bordered w-full"
            />

            <input
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              className="input input-bordered w-full"
            />

            <input
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="Tags (comma separated)"
              className="input input-bordered w-full"
            />
          </div>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} className="bg-orange-500 text-white">
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
