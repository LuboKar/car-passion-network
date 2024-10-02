import React, { useState, useEffect } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import editIcon from "../../images/edit.png";
import EditProfile from "../pageUtils/user/EditProfile";
import { getUser } from "../service/UserService";
import { getId } from "../service/TokenService";

export default function SettingsPage() {
  const [editProfileButton, setEditProfileButton] = useState(true);
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = async () => {
    const response = await getUser(getId());

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
  }, []);

  const buttons = [
    {
      label: "Edit Profile",
      icon: editIcon,
      //onClick: togglePosts,
      isVisible: editProfileButton,
    },
  ];

  return (
    <div className="settings-page-container">
      <Navbar />
      <VerticalNavbar buttons={buttons} />
      <RightVerticalNabvar />
      {!loadingUser && <EditProfile user={user} setUser={setUser} />}
    </div>
  );
}
