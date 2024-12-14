import React, { useState, useEffect } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import postIcon from "../../images/post.png";
import infoIcon from "../../images/info.png";
import friendIcon from "../../images/friendIcon.png";
import groupsIcon from "../../images/groups.png";
import useNavigation from "../service/NavigateService";
import { useParams } from "react-router-dom";
import Profile from "../pageUtils/user/Profile";
import { getUser } from "../service/UserService";
import Groups from "../group/Groups";
import { getGroupsByAdmin } from "../service/GroupService";
import { getParticipatingGroups } from "../service/GroupService";
import { getOtherGroups } from "../service/GroupService";

export default function ProfileGroupPage() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const [viewGroups] = useState(true);
  const [userAdminGroups, setUserAdminGroups] = useState([]);
  const [loadingAdminGroups, setLoadingAdminGroups] = useState(true);
  const [participatingGroups, setParticipatingGroups] = useState([]);
  const [loadingParticipatingGroups, setLoadingParticipatingGroups] =
    useState(true);
  const [otherGroups, setOtherGroups] = useState([]);
  const [loadingOtherGroups, setLoadingOtherGroups] = useState(true);

  const {
    navigateToProfile,
    navigateToProfileFriendsPage,
    navigateToProfileInformationPage,
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

  const fetchAdminGroups = async () => {
    const response = await getGroupsByAdmin(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const groupData = await response.json();
    setUserAdminGroups(groupData);
    setLoadingAdminGroups(false);
  };

  const fetchParticipatingGroups = async () => {
    const response = await getParticipatingGroups(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const groupData = await response.json();
    setParticipatingGroups(groupData);
    setLoadingParticipatingGroups(false);
  };

  const fetchOtherGroups = async () => {
    const response = await getOtherGroups(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const groupData = await response.json();
    setOtherGroups(groupData);
    setLoadingOtherGroups(false);
  };

  useEffect(() => {
    fetchUser();
    fetchAdminGroups();
    fetchParticipatingGroups();
    fetchOtherGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const togglePosts = () => {
    navigateToProfile(id);
  };

  const toggleInformation = () => {
    navigateToProfileInformationPage(id);
  };

  const toggleFriends = () => {
    navigateToProfileFriendsPage(id);
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
      onClick: toggleInformation,
    },
    {
      label: "Friends",
      icon: friendIcon,
      onClick: toggleFriends,
    },
    {
      label: "Groups",
      icon: groupsIcon,
      isVisible: viewGroups,
    },
  ];

  return (
    <div className="profile-group-page-container">
      <Navbar />

      <VerticalNavbar topButtons={topButtons} />
      <RightVerticalNabvar />

      {!loadingUser && <Profile user={user} setUser={setUser} />}

      {!loadingAdminGroups &&
        !loadingParticipatingGroups &&
        !loadingOtherGroups && (
          <Groups
            userId={user.id}
            userAdminGroups={userAdminGroups}
            setUserAdminGroups={setUserAdminGroups}
            otherGroups={otherGroups}
            participatingGroups={participatingGroups}
            setParticipatingGroups={setParticipatingGroups}
          />
        )}
    </div>
  );
}
