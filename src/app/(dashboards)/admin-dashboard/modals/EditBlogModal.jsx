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

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
      const urls = await Promise.all(files.map((file) => uploadToImgBB(file)));
      setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, ...urls] }));
    } catch {
      Swal.fire("Error", "Gallery upload failed!", "error");
    }
  };

  const handleSubmit = async () => {
    const confirmUpdate = await Swal.fire({
      title: "Save changes?",
      text: `Update blog "${formData.title}"?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, update it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#f97316",
    });

    if (!confirmUpdate.isConfirmed) return;

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

      Swal.fire(
        "Updated!",
        `Blog "${formData.title}" has been updated.`,
        "success"
      );
      onUpdate?.(updatedBlog);
      setOpen(false);
    } catch {
      Swal.fire("Error", "Failed to update blog!", "error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogDescription>Update your blog details below.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
          />
          <input
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Excerpt"
          />
          <textarea
            name="details"
            value={formData.details}
            onChange={handleChange}
            placeholder="Details"
          />

          {/* Cover Image */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Cover Image
            </label>
            <input type="file" accept="image/*" onChange={handleCoverImage} />
            {formData.coverImage && (
              <img
                src={formData.coverImage}
                className="mt-2 w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          {/* Gallery */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Gallery Images
            </label>
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
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          </div>

          <input
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author"
          />
          <input
            type="date"
            name="publishDate"
            value={formData.publishDate}
            onChange={handleChange}
          />
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
          />
          <input
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="Tags (comma separated)"
          />
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button className="bg-orange-500 text-white" onClick={handleSubmit}>
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
