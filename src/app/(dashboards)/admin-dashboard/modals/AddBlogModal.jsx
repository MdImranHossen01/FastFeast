"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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

  // ✅ Handle single image upload (coverImage)
  const handleCoverImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, coverImage: reader.result })); // Base64 string
    };
    reader.readAsDataURL(file);
  };

  // ✅ Handle multiple image uploads (gallery)
  const handleGallery = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then((images) => {
      setFormData((prev) => ({ ...prev, gallery: images }));
    });
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Add New Blog</DialogTitle>
          </DialogHeader>

          <div className="space-y-3">
            <input name="slug" placeholder="Slug" className="input input-bordered w-full" onChange={handleChange}/>
            <input name="title" placeholder="Title" className="input input-bordered w-full" onChange={handleChange}/>
            <input name="excerpt" placeholder="Excerpt" className="input input-bordered w-full" onChange={handleChange}/>
            <textarea name="details" placeholder="Details" className="textarea textarea-bordered w-full" onChange={handleChange}/>
            
            {/* ✅ Single Image Upload */}
            <div>
              <label className="block mb-1 font-medium">Cover Image</label>
              <input type="file" accept="image/*" onChange={handleCoverImage}/>
              {formData.coverImage && (
                <img src={formData.coverImage} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded"/>
              )}
            </div>

            {/* ✅ Multiple Image Upload */}
            <div>
              <label className="block mb-1 font-medium">Gallery Images</label>
              <input type="file" accept="image/*" multiple onChange={handleGallery}/>
              <div className="flex gap-2 mt-2 flex-wrap">
                {formData.gallery.map((img, idx) => (
                  <img key={idx} src={img} alt="Preview" className="w-20 h-20 object-cover rounded"/>
                ))}
              </div>
            </div>

            <input name="author" placeholder="Author" className="input input-bordered w-full" onChange={handleChange}/>
            <input name="publishDate" type="date" className="input input-bordered w-full" onChange={handleChange}/>
            <input name="category" placeholder="Category" className="input input-bordered w-full" onChange={handleChange}/>
            <input name="tags" placeholder="Tags (comma separated)" className="input input-bordered w-full" onChange={handleChange}/>
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} className="bg-orange-500 text-white">Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
