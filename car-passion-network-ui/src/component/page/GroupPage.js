import React, { useState, useEffect, useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import postIcon from "../../images/post.png";
import GroupProfile from "../group/GroupProfile";
import { useParams } from "react-router-dom";
import { getGroupPosts } from "../service/PostService";
import { PostsContext } from "../context/PostsProvider";
import Posts from "../pageUtils/post/Posts";
import membersIcon from "../../images/friendIcon.png";
import useNavigation from "../service/NavigateService";
import { GroupProfileContext } from "../context/GroupProfileProvider";

export default function GroupPage() {
  const { id } = useParams();
  const [viewPosts] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  const { navigateToGroupMembersPage } = useNavigation();

  const { setPosts } = useContext(PostsContext);

  const { group, setGroup, loadingGroup } = useContext(GroupProfileContext);

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

  const toggleMembers = () => {
    navigateToGroupMembersPage(id);
  };

  const topButtons = [
    {
      label: "Posts",
      icon: postIcon,
      isVisible: viewPosts,
    },

    {
      label: "Members",
      icon: membersIcon,
      onClick: toggleMembers,
    },
  ];

  return (
    <div className="group-page-container">
      <Navbar />

      <VerticalNavbar topButtons={topButtons} />
      <RightVerticalNabvar />

      {!loadingGroup && <GroupProfile group={group} setGroup={setGroup} />}

      {!loadingGroup && !loadingPosts && viewPosts && (
        <Posts groupId={group.id} />
      )}
    </div>
  );
}
