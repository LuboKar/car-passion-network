import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import "./PostPage.css";
import Navbar from "../pageUtils/navbar/Navbar";
import { getPost } from "../service/PostService";
import { PostsContext } from "../context/PostsProvider";
import Post from "../pageUtils/post/Post";

export default function PostPage() {
  const { id } = useParams();
  const [loadingPost, setLoadingPost] = useState(true);

  const { post, setPost } = useContext(PostsContext);

  const fetchPost = async () => {
    const response = await getPost(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const postData = await response.json();
    setPost(postData);
    setLoadingPost(false);
  };

  useEffect(() => {
    fetchPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="post-page-container">
      <Navbar />
      {!loadingPost && (
        <div className="single-post-container">
          <Post post={post} postId={post.id} />
        </div>
      )}
    </div>
  );
}
