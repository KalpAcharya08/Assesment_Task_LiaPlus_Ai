import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";

export default function BlogPostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/posts");
        setPosts(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch posts");
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center p-6">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-6">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Blog Posts</h1>
      {posts.length === 0 ? (
        <div className="text-center p-6 bg-gray-100 rounded-lg">
          <p className="text-gray-600 mb-4">You haven't created any posts yet.</p>
          <Link to="/admin" className="text-blue-500 hover:text-blue-700">
            Create your first post
          </Link>
        </div>
      ) : (
        posts.map(post => (
          <div key={post._id} className="bg-white shadow-md rounded p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <p className="mb-4">{post.content}</p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Created on {new Date(post.createdAt).toLocaleDateString()}
              </span>
              <Link to={`/blogs/${post._id}`} className="text-blue-500 hover:text-blue-700">
                Read More
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
