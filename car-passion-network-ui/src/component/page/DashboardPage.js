import React, { useState, useEffect } from "react";
import Navbar from "../pageUtils/navbar/Navbar.js";
import { getAllPosts } from "../service/PostService";
import { getUser } from "../service/UserService.js";
import { jwtDecode } from "jwt-decode";
import Posts from "../pageUtils/post/Posts.js";
import "./DashboardPage.css";
import DashboardHeader from "../pageUtils/dashboard/DashboardHeader.js";
export default function DashboardPage() {
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

  const fetchPosts = async () => {
    const response = await getAllPosts();

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const postData = await response.json();
    setPosts(postData);
    setLoadingPosts(false);
  };

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem("jwtToken");
    const decodedToken = jwtDecode(token);
    const currentId = decodedToken.userId;

    const response = await getUser(currentId);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const userData = await response.json();
    setCurrentUser(userData);
  };

  useEffect(() => {
    fetchPosts();
    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Navbar />

      {!loadingPosts && (
        <div className="dashboard-container">
          <Posts
            posts={posts}
            setPosts={setPosts}
            ownerId={currentUser.id}
            currentUser={currentUser}
          />
        </div>
      )}

      {posts.length < 1 && <DashboardHeader />}
    </div>
  );
}
