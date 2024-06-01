import React from "react";
import Navbar from "../pageUtils/Navbar";
import VerticalNavbar from "../pageUtils/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/RightVerticalNavbar";
import Profile from "../pageUtils/Profile";
import Posts from "../pageUtils/Posts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Information from "../pageUtils/Information";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [information, setInformation] = useState(false);
  const [viewPosts, setViewPosts] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const userData = await response.json();
      setUser(userData);
      setLoadingUser(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoadingUser(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(`http://localhost:8080/post/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const postData = await response.json();
      setPosts(postData);
      setLoadingPosts(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoadingPosts(false);
    }
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleInformation = () => {
    setViewPosts(false);
    setInformation(true);
  };

  const togglePosts = () => {
    setInformation(false);
    setViewPosts(true);
  };

  return (
    <div className="test">
      <Navbar />
      <VerticalNavbar
        className="left-navbar"
        toggleInformation={toggleInformation}
        information={information}
        togglePosts={togglePosts}
        posts={viewPosts}
      />
      <RightVerticalNabvar className="right-navbar" />
      {!loadingUser && !loadingPosts && <Profile user={user} />}
      {information && <Information user={user} />}
      {!loadingUser && !loadingPosts && viewPosts && (
        <Posts posts={posts} setPosts={setPosts} user={user} />
      )}
    </div>
  );
}
