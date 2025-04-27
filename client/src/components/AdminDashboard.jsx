import { useState, useEffect } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();  // For navigating to detail page

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError("");
        setSuccess("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

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

  const addPost = async (e) => {
    e.preventDefault();
    try {
      if (!title || !content) {
        setError("Title and content are required");
        return;
      }

      await axios.post("/posts", { title, content });
      setTitle("");
      setContent("");
      setError("");
      setSuccess("Post created successfully!");
      fetchPosts(); // Refresh posts list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  const deletePost = async (postId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this post?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`/posts/${postId}`);
      setSuccess("Post deleted successfully!");
      fetchPosts(); // Refresh posts list
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete post");
    }
  };

  const viewPostDetails = (post) => {
    setSelectedPost(post); // Set the selected post to show details
  };

  const goBackToList = () => {
    setSelectedPost(null);  // Return to the list of posts
  };

  if (loading) return <div className="text-center p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Posts</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {success && <div className="text-green-500 mb-4">{success}</div>}

      {selectedPost ? (
        // BlogPostDetail
        <div>
          <button onClick={goBackToList} className="mb-4 text-blue-600 hover:text-blue-800">
            Back to Post List
          </button>
          <div className="border p-4 rounded">
            <h2 className="font-semibold text-2xl mb-2">{selectedPost.title}</h2>
            <p>{selectedPost.content}</p>
            <span className="text-sm text-gray-600">
              Created on {new Date(selectedPost.createdAt).toLocaleDateString()}
            </span>
            <div className="flex justify-end">
              <button
                onClick={() => deletePost(selectedPost._id)}
                className="text-red-600 hover:text-red-800"
              >
                Delete Post
              </button>
            </div>
          </div>
        </div>
      ) : (
        // BlogPostList
        <div>
          <form onSubmit={addPost} className="space-y-4 mb-6">
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

          <div className="space-y-4">
            {posts.length === 0 ? (
              <div className="text-center p-6 bg-gray-100 rounded-lg">
                <p className="text-gray-600">You haven't created any posts yet. Start by creating your first post above!</p>
              </div>
            ) : (
              posts.map((post) => (
                <div key={post._id} className="border p-4 rounded">
                  <h2 className="font-semibold text-xl mb-2">
                    <button
                      onClick={() => viewPostDetails(post)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      {post.title}
                    </button>
                  </h2>
                  <p className="mb-4">{post.content.substring(0, 100)}...</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Created on {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
