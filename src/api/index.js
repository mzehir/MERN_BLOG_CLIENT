import axios from "axios";

const apiEndPoint = "http://localhost:5000/posts/";

export const fetchPosts = async () => {
  return await axios.get(apiEndPoint);
};

export const fetchSinglePost = async (id) => {
  return await axios.get(`${apiEndPoint}${id}`);
};

export const createPost = async (post) => {
  return await axios.post(apiEndPoint, post);
};

export const updatePost = async (id, updatedPost) => {
  return await axios.patch(`${apiEndPoint}${id}`, updatedPost);
};

export const deletePost = async (id) => {
  return await axios.delete(`${apiEndPoint}${id}`);
};
