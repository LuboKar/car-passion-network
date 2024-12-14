import React, { useEffect, useState, useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import Profile from "../pageUtils/user/Profile";
import Posts from "../pageUtils/post/Posts";
import { useParams } from "react-router-dom";
import { getUser } from "../service/UserService";
import { getPosts } from "../service/PostService";
import ProfilePageHeader from "../pageUtils/user/ProfilePageHeader";
import { PostsContext } from "../context/PostsProvider";
import useButtons from "../button/ProfileButtons";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const { profileButtons } = useButtons(id);

  const { posts, setPosts } = useContext(PostsContext);

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

  return (
    <div className="profile-page-container">
      <Navbar />

      <VerticalNavbar topButtons={profileButtons} />
      <RightVerticalNabvar />

      {!loadingUser && <Profile user={user} setUser={setUser} />}

      {!loadingUser && !loadingPosts && <Posts ownerId={user.id} />}
      {posts.length < 1 && !loadingUser && !loadingPosts && (
        <ProfilePageHeader />
      )}
    </div>
  );
}
