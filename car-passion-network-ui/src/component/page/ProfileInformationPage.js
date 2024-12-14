import React, { useState, useEffect } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import postIcon from "../../images/post.png";
import infoIcon from "../../images/info.png";
import friendIcon from "../../images/friendIcon.png";
import groupsIcon from "../../images/groups.png";
import useNavigation from "../service/NavigateService";
import Profile from "../pageUtils/user/Profile";
import { useParams } from "react-router-dom";
import { getUser } from "../service/UserService";
import Information from "../pageUtils/user/Information";

export default function ProfileInformationPage() {
  const { id } = useParams();
  const [viewInformation] = useState(true);
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  const {
    navigateToProfile,
    navigateToProfileFriendsPage,
    navigateToProfileGroupPage,
  } = useNavigation();

  const fetchUser = async () => {
    const response = await getUser(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const userData = await response.json();
    setUser(userData);
    setLoadingUser(false);
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const togglePosts = () => {
    navigateToProfile(id);
  };

  const toggleFriends = () => {
    navigateToProfileFriendsPage(id);
  };

  const toggleGroups = () => {
    navigateToProfileGroupPage(id);
  };

  const topButtons = [
    {
      label: "Posts",
      icon: postIcon,
      onClick: togglePosts,
    },
    {
      label: "Information",
      icon: infoIcon,
      isVisible: viewInformation,
    },
    {
      label: "Friends",
      icon: friendIcon,
      onClick: toggleFriends,
    },
    {
      label: "Groups",
      icon: groupsIcon,
      onClick: toggleGroups,
    },
  ];
  return (
    <div className="profile-information-page-container">
      <Navbar />

      <VerticalNavbar topButtons={topButtons} />
      <RightVerticalNabvar />

      {!loadingUser && <Profile user={user} setUser={setUser} />}

      {!loadingUser && <Information user={user} />}
    </div>
  );
}
