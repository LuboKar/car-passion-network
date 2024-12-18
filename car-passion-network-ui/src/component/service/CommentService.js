import { getToken } from "./TokenService";
import { checkAuthentication } from "../Authentication/Authentication";

const writeComment = async (comment) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch("http://localhost:8080/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    });

    return response;
  } catch (error) {
    console.error("Error writing comment:", error);
  }
};

const replyComment = async (comment) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch("http://localhost:8080/comment/reply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(comment),
    });

    return response;
  } catch (error) {
    console.error("Error repling comment:", error);
  }
};

const likeComment = async (comment) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(
      "http://localhost:8080/comment/like/" + comment.id,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error liking comment:", error);
  }
};

const deleteComment = async (postId, commentId) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8080/comment/delete/${postId}/${commentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error deleting comment:", error);
  }
};

const editComment = async (editCommentValues) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch("http://localhost:8080/comment/edit", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editCommentValues),
    });

    return response;
  } catch (error) {
    console.error("Error editting comment:", error);
  }
};

export { writeComment, likeComment, replyComment, deleteComment, editComment };
