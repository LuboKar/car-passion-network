import React, { useEffect, useState } from "react";
import Navbar from "../pageUtils/Navbar";
import VerticalNavbar from "../pageUtils/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/RightVerticalNavbar";
import Profile from "../pageUtils/Profile";
import Posts from "../pageUtils/Posts";
import { useParams } from "react-router-dom";
import Information from "../pageUtils/Information";
import { getUser } from "../service/UserService";
import { getPosts } from "../service/PostService";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userInformation, setUserInformation] = useState(false);
  const [viewPosts, setViewPosts] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const fetchUser = async () => {
    const response = await getUser(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const userData = await response.json();
    setUser(userData);
    setLoadingUser(false);
  };

  const fetchPosts = async () => {
    const response = await getPosts(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const postData = await response.json();
    setPosts(postData);
    setLoadingPosts(false);
  };

  useEffect(() => {
    fetchUser();
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const toggleInformation = () => {
    setViewPosts(false);
    setUserInformation(true);
  };

  const togglePosts = () => {
    setUserInformation(false);
    setViewPosts(true);
  };

  return (
    <div className="profile-page-container">
      <Navbar />
      <VerticalNavbar
        toggleInformation={toggleInformation}
        userInformation={userInformation}
        togglePosts={togglePosts}
        viewPosts={viewPosts}
      />
      <RightVerticalNabvar />

      {!loadingUser && !loadingPosts && <Profile user={user} />}
      {!loadingUser && !loadingPosts && viewPosts && (
        <Posts posts={posts} setPosts={setPosts} user={user} />
      )}

      {userInformation && <Information user={user} />}
    </div>
  );
}
