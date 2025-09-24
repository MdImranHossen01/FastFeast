"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { uploadToImgBB } from "@/utils/imageUpload";


export default function AddBlogModal({ onSave }) {
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
        files.map((file) => uploadToImgBB(file)) // use our helper
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
  const handleSubmit = () => {
    const blogData = {
      ...formData,
      tags: formData.tags.split(",").map((t) => t.trim()),
      visitCount: 0,
    };
    onSave(blogData);
    setOpen(false);
  };

  return (
  <>
  <Button
    onClick={() => setOpen(true)}
    className="bg-orange-500 text-white"
  >
    Add Blog
  </Button>

  <Dialog open={open} onOpenChange={setOpen}>
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Add New Blog</DialogTitle>
      </DialogHeader>

      <div className="space-y-3">
        {/* Slug */}
        <input
          name="slug"
          placeholder="Slug"
          className="input input-bordered w-full"
          onChange={handleChange}
        />

        {/* Title */}
        <input
          name="title"
          placeholder="Title"
          className="input input-bordered w-full"
          onChange={handleChange}
        />

        {/* Excerpt */}
        <input
          name="excerpt"
          placeholder="Excerpt"
          className="input input-bordered w-full"
          onChange={handleChange}
        />

        {/* Details */}
        <textarea
          name="details"
          placeholder="Details"
          className="textarea textarea-bordered w-full"
          onChange={handleChange}
        />

        {/* ✅ Single Image Upload */}
        <div>
          <label className="block mb-1 font-medium">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleCoverImage} />
          {formData.coverImage && (
            <img
              src={formData.coverImage}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded"
            />
          )}
        </div>

        {/* ✅ Multiple Image Upload */}
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
                alt={`Preview ${idx}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Other Fields */}
        <input
          name="author"
          placeholder="Author"
          className="input input-bordered w-full"
          onChange={handleChange}
        />
        <input
          name="publishDate"
          type="date"
          className="input input-bordered w-full"
          onChange={handleChange}
        />
        <input
          name="category"
          placeholder="Category"
          className="input input-bordered w-full"
          onChange={handleChange}
        />
        <input
          name="tags"
          placeholder="Tags (comma separated)"
          className="input input-bordered w-full"
          onChange={handleChange}
        />
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3 mt-4">
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} className="bg-orange-500 text-white">
          Save
        </Button>
      </div>
    </DialogContent>
  </Dialog>
</>

  );
}
