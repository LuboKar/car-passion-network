import React, { useContext } from "react";
import Content from "./Content";
import EditPost from "./EditPost";
import { PostsContext } from "../../context/PostsProvider";
import { editPost } from "../../service/PostService";

export default function PostContent({ post, index }) {
  const { editPostId, editPostByIndex, setEditPostId } =
    useContext(PostsContext);

  const editAuthorPost = async (editPostValues) => {
    const response = await editPost(editPostValues);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const editedPost = await response.json();

    editPostByIndex(editedPost, index);
    setEditPostId(0);
  };

  return (
    <div>
      {editPostId !== post.id && <Content post={post} />}

      {editPostId === post.id && (
        <EditPost post={post} editAuthorPost={editAuthorPost} />
      )}
    </div>
  );
}
