import React, { useState, useEffect, useContext } from "react";
import { getAllPosts } from "../service/PostService.js";
import Posts from "../pageUtils/post/Posts.js";
import "./FeedPage.css";
import DashboardHeader from "../pageUtils/dashboard/DashboardHeader.js";
import { getId } from "../service/TokenService.js";
import { PostsContext } from "../context/PostsProvider.js";
import useDashboardButtons from "../button/DashboardButtons.js";

export default function FeedPage() {
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
      {!loadingPosts && (
        <div className="dashboard-posts-container">
          <Posts ownerId={currentUserId} />
        </div>
      )}

      {posts.length < 1 && !loadingPosts && <DashboardHeader />}
    </div>
  );
}
