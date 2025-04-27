import axios from "./axios";

export const fetchPosts = async (token) => {
  const response = await axios.get("/posts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createPost = async (postData, token) => {
  const response = await axios.post("/posts", postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const deletePost = async (postId, token) => {
  const response = await axios.delete(`/posts/${postId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
