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
  const [information, setInformation] = useState(false);
  const [posts, setPosts] = useState(true);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleInformation = () => {
    setPosts(false);
    setInformation(true);
  };

  const togglePosts = () => {
    setInformation(false);
    setPosts(true);
  };

  return (
    <div className="test">
      <Navbar />
      <VerticalNavbar
        className="left-navbar"
        toggleInformation={toggleInformation}
        information={information}
        togglePosts={togglePosts}
        posts={posts}
      />
      <RightVerticalNabvar className="right-navbar" />
      {!loading && <Profile user={user} />}
      {information && <Information user={user} />}
      {!loading && posts && <Posts user={user} setUser={setUser} />}
    </div>
  );
}
