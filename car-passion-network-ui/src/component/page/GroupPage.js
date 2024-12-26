import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { getGroupPosts } from "../service/PostService";
import { PostsContext } from "../context/PostsProvider";
import Posts from "../pageUtils/post/Posts";

export default function GroupPage() {
  const { id } = useParams();
  const [viewPosts] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const { setPosts } = useContext(PostsContext);

  const fetchPosts = async () => {
    const response = await getGroupPosts(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const postsData = await response.json();
    setPosts(postsData);
    setLoadingPosts(false);
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="group-page-container">
      {!loadingPosts && viewPosts && <Posts groupId={id} />}
    </div>
  );
}
