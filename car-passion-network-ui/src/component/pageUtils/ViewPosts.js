import React from "react";
import Post from "./Post";

export default function ViewPosts({ posts, setPosts, currentUser }) {
  const toggleLike = (index) => {
    const updatedPosts = [...posts];
    updatedPosts[index].currentUserLike = !updatedPosts[index].currentUserLike;

    const userExists = updatedPosts[index].likes.some(
      (like) => like.id === currentUser.id
    );

    if (userExists) {
      updatedPosts[index].likes = updatedPosts[index].likes.filter(
        (like) => like.id !== currentUser.id
      );
    } else {
      updatedPosts[index].likes = [...updatedPosts[index].likes, currentUser];
    }

    setPosts(updatedPosts);
  };

  return (
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <Post
            post={post}
            index={index}
            toggleLike={toggleLike}
            setPosts={setPosts}
          />
        </div>
      ))}
    </div>
  );
}
