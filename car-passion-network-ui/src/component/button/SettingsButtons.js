import { useState } from "react";
import editIcon from "../../images/edit.png";
import deleteProfileIcon from "../../images/delete.png";
import useNavigation from "../service/NavigateService";

const useSettingsButtons = (currentPath) => {
  const editUrl = `/settings`;
  const deleteUrl = `/settings/delete`;
  const { navigateToSettingsPage, navigateToSettingsDeletePage } =
    useNavigation();

  const toggleEditProfile = () => {
    navigateToSettingsPage();
  };

  const toggleDeleteAccount = () => {
    navigateToSettingsDeletePage();
  };

  const topSettingsButtons = [
    {
      label: "Edit Profile",
      icon: editIcon,
      onClick: toggleEditProfile,
      isVisible: currentPath === editUrl,
    },
  ];

  const bottomSettingsButtons = [
    {
      label: "Delete Account",
      icon: deleteProfileIcon,
      onClick: toggleDeleteAccount,
      isVisible: currentPath === deleteUrl,
    },
  ];
  return {
    topSettingsButtons,
    bottomSettingsButtons,
  };
};

export default useSettingsButtons;
