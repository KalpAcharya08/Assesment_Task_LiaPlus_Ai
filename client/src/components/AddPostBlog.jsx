import { useState } from "react";
import axios from "../api/axios";  // Adjust your axios path accordingly

export default function AddPostBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addPost = async (e) => {
    e.preventDefault();
    try {
      if (!title || !content) {
        setError("Title and content are required");
        return;
      }

      // Send POST request to the backend to create a new blog post
      const response = await axios.post(
        "/api/blogs",  // Your backend API endpoint
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,  // Add token for authentication
          },
        }
      );

      // Reset form fields
      setTitle("");
      setContent("");
      setError("");
      setSuccess("Post created successfully!");

      console.log(response.data);  // Handle the response from the backend

      // Optional: Redirect or show success message
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add a New Blog Post</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      <form onSubmit={addPost} className="space-y-4">
        <input 
          type="text" 
          placeholder="Post Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          className="w-full p-2 border rounded" 
          required
        />
        <textarea 
          placeholder="Post Content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
          className="w-full p-2 border rounded" 
          required
        />
        <button 
          type="submit" 
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Add Post
        </button>
      </form>
    </div>
  );
}
