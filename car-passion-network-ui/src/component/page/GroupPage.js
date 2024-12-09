import React, { useState, useEffect, useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import postIcon from "../../images/post.png";
import GroupProfile from "../group/GroupProfile";
import { getGroup } from "../service/GroupService";
import { useParams } from "react-router-dom";
import { getGroupPosts } from "../service/PostService";
import { PostsContext } from "../context/PostsProvider";
import Posts from "../pageUtils/post/Posts";

export default function GroupPage() {
  const { id } = useParams();
  const [viewPosts, setViewPosts] = useState(true);
  const [group, setGroup] = useState({});
  const [loadingGroup, setLoadingGroup] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const { posts, setPosts } = useContext(PostsContext);

  const fetchGroup = async () => {
    const response = await getGroup(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const groupData = await response.json();
    setGroup(groupData);
    setLoadingGroup(false);
  };

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
    fetchGroup();
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const topButtons = [
    {
      label: "Posts",
      icon: postIcon,
      //   onClick: togglePosts,
      isVisible: viewPosts,
    },
  ];

  console.log(posts);

  return (
    <div className="group-page-container">
      <Navbar />

      <VerticalNavbar topButtons={topButtons} />
      <RightVerticalNabvar />

      {!loadingGroup && <GroupProfile group={group} />}

      {!loadingGroup && !loadingPosts && <Posts groupId={group.id} />}
    </div>
  );
}
