"use client"
import { MdArticle } from "react-icons/md";
import getBlogs from "@/app/actions/blogs/getBlogs";
import AddBlogModal from "../modals/AddBlogModal";
import BlogRow from "../components/BlogRow";
import { useEffect, useState } from "react";


export default function ManageBlogs() {
const [blogs, setBlogs]=useState([])
const [loading, setLoading]= useState(true)
   
   useEffect(() => {
      const fetchData = async () => {
        try {
          const blogsData= await getBlogs()
          setBlogs(blogsData)
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, []);
    if(loading) return <p>Loading...</p>
  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
        <MdArticle size={40} /> Manage Blogs
      </h1>

      <div className="flex justify-end">
        {/* <AddBlogModal /> */}
      </div>

      <div className="overflow-x-auto rounded-lg shadow-md py-2 bg-white dark:bg-gray-900">
        <table className="w-full rounded-lg overflow-hidden text-sm table-auto">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr className="text-left text-gray-600 dark:text-gray-200">
              <th className="p-3">No.</th>
              <th className="p-3">Title</th>
              <th className="p-3">Excerpt</th>
              <th className="p-3">Category</th>
              <th className="p-3 text-center">Visits</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {blogs.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="p-4 text-center text-gray-500 dark:text-gray-400"
                >
                  No blogs found.
                </td>
              </tr>
            ) : (
              blogs.map((blog, index) => (
                <BlogRow key={blog._id} blog={blog} index={index} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
