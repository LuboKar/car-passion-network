import { getToken } from "./TokenService";

const writeComment = async (comment) => {
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
    console.error("Error sending data to backend:", error);
  }
};

const replyComment = async (comment) => {
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
    console.error("Error sending data to backend:", error);
  }
};

const likeComment = async (comment) => {
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
    console.error("Error sending data to backend:", error);
  }
};

const deleteComment = async (postId, commentId) => {
  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8080/comment/delete/${postId}/${commentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const editComment = async (editCommentValues) => {
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
    console.error("Error sending data to backend:", error);
  }
};

export { writeComment, likeComment, replyComment, deleteComment, editComment };
