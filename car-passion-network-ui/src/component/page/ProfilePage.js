import React, { useEffect, useState, useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import Profile from "../pageUtils/user/Profile";
import Posts from "../pageUtils/post/Posts";
import { useParams } from "react-router-dom";
import Information from "../pageUtils/user/Information";
import { getUser } from "../service/UserService";
import { getPosts } from "../service/PostService";
import ProfilePageHeader from "../pageUtils/user/ProfilePageHeader";
import { PostsContext } from "../context/PostsProvider";
import infoIcon from "../../images/info.png";
import postIcon from "../../images/post.png";

export default function ProfilePage() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [userInformation, setUserInformation] = useState(false);
  const [viewPosts, setViewPosts] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

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

  const toggleInformation = () => {
    setViewPosts(false);
    setUserInformation(true);
  };

  const togglePosts = () => {
    setUserInformation(false);
    setViewPosts(true);
  };

  const buttons = [
    {
      label: "Posts",
      icon: postIcon,
      onClick: togglePosts,
      isVisible: viewPosts,
    },
    {
      label: "Information",
      icon: infoIcon,
      onClick: toggleInformation,
      isVisible: userInformation,
    },
  ];

  return (
    <div className="profile-page-container">
      <Navbar />
      <VerticalNavbar buttons={buttons} />
      <RightVerticalNabvar />

      {!loadingUser && !loadingPosts && (
        <Profile user={user} setUser={setUser} />
      )}
      {!loadingUser && !loadingPosts && viewPosts && (
        <Posts ownerId={user.id} />
      )}

      {posts.length < 1 && viewPosts && !loadingUser && !loadingPosts && (
        <ProfilePageHeader />
      )}

      {userInformation && <Information user={user} />}
    </div>
  );
}
