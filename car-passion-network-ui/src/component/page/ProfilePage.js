import React, { useContext, useEffect, useState } from "react";
import Posts from "../pageUtils/post/Posts";
import { PostsContext } from "../context/PostsProvider";
import ProfilePageHeader from "../pageUtils/user/ProfilePageHeader.js";
import { useParams } from "react-router-dom";
import { getPosts } from "../service/PostService.js";

export default function ProfilePage() {
  const { id } = useParams();
  const { posts, setPosts } = useContext(PostsContext);
  const [loadingPosts, setLoadingPosts] = useState(true);

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
      {!loadingPosts && <Posts ownerId={id} />}

      {posts.length < 1 && !loadingPosts && <ProfilePageHeader />}
    </div>
  );
}
