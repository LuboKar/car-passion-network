import { getToken } from "./TokenService";
import { checkAuthentication } from "../Authentication/Authentication";

const getPosts = async (id) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/post/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};

const getGroupPosts = async (id) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/post/group/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching group posts:", error);
  }
};

const getAllPosts = async () => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch("http://localhost:8080/post", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching all posts:", error);
  }
};

const createPost = async (createPostValues) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch("http://localhost:8080/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(createPostValues),
    });

    return response;
  } catch (error) {
    console.error("Error creating post:", error);
  }
};

const likePost = async (post) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch("http://localhost:8080/post/like/" + post.id, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error liking post:", error);
  }
};

const getPost = async (id) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/post/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching post:", error);
  }
};

const deletePost = async (id) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/post/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error deleting post:", error);
  }
};

const editPost = async (editPostValues) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch("http://localhost:8080/post/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editPostValues),
    });

    return response;
  } catch (error) {
    console.error("Error editing post:", error);
  }
};

export {
  getPosts,
  createPost,
  likePost,
  getPost,
  getAllPosts,
  deletePost,
  editPost,
  getGroupPosts,
};
