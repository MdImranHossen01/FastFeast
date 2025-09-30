"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function EditBlogModal({ open, setOpen, onSave, initialData }) {
  const [formData, setFormData] = useState(initialData);

  // ✅ When initialData changes (user clicked Edit), prefill the form
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData); // send updated values with _id
    setOpen(false);
  };

  if (!formData) return null; // don’t render if no blog is selected

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Blog Title"
            className="input input-bordered w-full"
          />
          <input
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Excerpt"
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

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit} className="bg-orange-500 text-white">
            Update
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

