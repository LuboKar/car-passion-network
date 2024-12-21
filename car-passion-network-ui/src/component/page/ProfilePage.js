import React, { useEffect, useState, useContext } from "react";
import Profile from "../pageUtils/user/Profile";
import Posts from "../pageUtils/post/Posts";
import { useParams } from "react-router-dom";
import { getPosts } from "../service/PostService";
import { PostsContext } from "../context/PostsProvider";
import useButtons from "../button/ProfileButtons";
import { ProfileContext } from "../context/ProfileProvider";
import ProfilePageHeader from "../pageUtils/user/ProfilePageHeader.js";

export default function ProfilePage() {
  const { id } = useParams();
  const { loadingUser } = useContext(ProfileContext);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const { profileButtons } = useButtons(id);
  profileButtons[0].isVisible = true;

  const { posts, setPosts } = useContext(PostsContext);

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
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="profile-page-container">
      {!loadingUser && <Profile />}

      {!loadingUser && !loadingPosts && <Posts ownerId={id} />}

      {posts.length < 1 && <ProfilePageHeader />}
    </div>
  );
}
