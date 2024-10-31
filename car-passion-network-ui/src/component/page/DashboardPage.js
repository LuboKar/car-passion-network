import React, { useState, useEffect, useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar.js";
import { getAllPosts } from "../service/PostService";
import Posts from "../pageUtils/post/Posts.js";
import "./DashboardPage.css";
import DashboardHeader from "../pageUtils/dashboard/DashboardHeader.js";
import { getId } from "../service/TokenService.js";
import { PostsContext } from "../context/PostsProvider.js";

export default function DashboardPage() {
  const [loadingPosts, setLoadingPosts] = useState(true);
  const currentUserId = getId();

  const { posts, setPosts } = useContext(PostsContext);

  const fetchPosts = async () => {
    const response = await getAllPosts();

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const postData = await response.json();
    setPosts(postData);
    setLoadingPosts(false);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="dashboard-container">
      <Navbar />

      {!loadingPosts && (
        <div className="dashboard-posts-container">
          <Posts ownerId={currentUserId} />
        </div>
      )}

      {posts.length < 1 && !loadingPosts && <DashboardHeader />}
    </div>
  );
}
