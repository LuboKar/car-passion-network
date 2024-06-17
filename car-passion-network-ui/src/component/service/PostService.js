const getPosts = async (id) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch(`http://localhost:8080/post/user/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const createPost = async (createPostValues) => {
  try {
    const token = localStorage.getItem("jwtToken");
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
    console.error("Error sending data to backend:", error);
  }
};

const likePost = async (post) => {
  try {
    const token = localStorage.getItem("jwtToken");
    const response = await fetch("http://localhost:8080/post/like/" + post.id, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error sending data to backend:", error);
  }
};

export { getPosts, createPost, likePost };
