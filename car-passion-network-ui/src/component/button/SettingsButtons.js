import { useState } from "react";
import editIcon from "../../images/edit.png";
import deleteProfileIcon from "../../images/delete.png";

const useSettingsButtons = () => {
  const [editProfileButton, setEditProfileButton] = useState(true);
  const [deleteAccountButton, setDeleteAccountButton] = useState(false);

  const toggleEditProfile = () => {
    setDeleteAccountButton(false);
    setEditProfileButton(true);
  };

  const toggleDeleteAccount = () => {
    setEditProfileButton(false);
    setDeleteAccountButton(true);
  };

  const topSettingsButtons = [
    {
      label: "Edit Profile",
      icon: editIcon,
      onClick: toggleEditProfile,
      isVisible: editProfileButton,
    },
  ];

  const bottomSettingsButtons = [
    {
      label: "Delete Account",
      icon: deleteProfileIcon,
      onClick: toggleDeleteAccount,
      isVisible: deleteAccountButton,
    },
  ];
  return {
    topSettingsButtons,
    bottomSettingsButtons,
    editProfileButton,
    deleteAccountButton,
  };
};

export default useSettingsButtons;
