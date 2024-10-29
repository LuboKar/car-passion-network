import React, { useState, useEffect } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import editIcon from "../../images/edit.png";
import EditProfile from "../pageUtils/user/EditProfile";
import { getUser } from "../service/UserService";
import { getId } from "../service/TokenService";
import deleteProfileIcon from "../../images/delete.png";
import DeleteAccount from "../pageUtils/user/DeleteAccount";

export default function SettingsPage() {
  const [editProfileButton, setEditProfileButton] = useState(true);
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);
  const [deleteAccountButton, setDeleteAccountButton] = useState(false);

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

  const toggleEditProfile = () => {
    setDeleteAccountButton(false);
    setEditProfileButton(true);
  };

  const toggleDeleteAccount = () => {
    setEditProfileButton(false);
    setDeleteAccountButton(true);
  };

  const topButtons = [
    {
      label: "Edit Profile",
      icon: editIcon,
      onClick: toggleEditProfile,
      isVisible: editProfileButton,
    },
  ];

  const bottomButtons = [
    {
      label: "Delete Account",
      icon: deleteProfileIcon,
      onClick: toggleDeleteAccount,
      isVisible: deleteAccountButton,
    },
  ];

  return (
    <div className="settings-page-container">
      <Navbar />
      <VerticalNavbar topButtons={topButtons} bottomButtons={bottomButtons} />
      <RightVerticalNabvar />
      {!loadingUser && editProfileButton && (
        <EditProfile user={user} setUser={setUser} />
      )}

      {deleteAccountButton && <DeleteAccount userId={user.id} />}
    </div>
  );
}
