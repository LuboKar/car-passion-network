import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import CreatePost from "./CreatePost";
import ViewPosts from "./ViewPosts";

export default function Posts({ posts, setPosts, userId }) {
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const id = decodedToken.userId;
    setLoggedUser(id);
  }, []);
  return (
    <div>
      {loggedUser === userId && <CreatePost setPosts={setPosts} />}
      <ViewPosts posts={posts} setPosts={setPosts} />
    </div>
  );
}
