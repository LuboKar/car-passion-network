import React, { useState, useEffect, useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import GroupProfile from "../group/GroupProfile";
import { useParams } from "react-router-dom";
import { getGroupPosts } from "../service/PostService";
import { PostsContext } from "../context/PostsProvider";
import Posts from "../pageUtils/post/Posts";
import { GroupProfileContext } from "../context/GroupProfileProvider";
import useGroupButtons from "../button/GroupButtons";

export default function GroupPage() {
  const { id } = useParams();
  const [viewPosts] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const { setPosts } = useContext(PostsContext);

  const { group, loadingGroup } = useContext(GroupProfileContext);

  const { groupButtons } = useGroupButtons(id);
  groupButtons[0].isVisible = true;

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
      <Navbar />

      <VerticalNavbar topButtons={groupButtons} />
      <RightVerticalNabvar />

      {!loadingGroup && <GroupProfile />}

      {!loadingGroup && !loadingPosts && viewPosts && (
        <Posts groupId={group.id} />
      )}
    </div>
  );
}
