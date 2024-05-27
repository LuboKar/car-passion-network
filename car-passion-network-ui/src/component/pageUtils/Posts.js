import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import CreatePost from "./CreatePost";
import ViewPosts from "./ViewPosts";

export default function Posts({ user }) {
  const [posts, setPosts] = useState(user.posts);
  const [loggedUser, setLoggedUser] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const id = decodedToken.userId;
    setLoggedUser(id);
  }, []);
  return (
    <div>
      {loggedUser === user.id && <CreatePost setPosts={setPosts} />}
      <ViewPosts posts={posts} user={user} setPosts={setPosts} />
    </div>
  );
}
