import React, { useState, useEffect } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import EditProfile from "../pageUtils/user/EditProfile";
import { getUser } from "../service/UserService";
import { getId } from "../service/TokenService";
import DeleteAccount from "../pageUtils/user/DeleteAccount";
import useSettingsButtons from "../button/SettingsButtons";

export default function SettingsPage() {
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  const {
    topSettingsButtons,
    bottomSettingsButtons,
    editProfileButton,
    deleteAccountButton,
  } = useSettingsButtons();

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

  return (
    <div className="settings-page-container">
      <Navbar />

      <VerticalNavbar
        topButtons={topSettingsButtons}
        bottomButtons={bottomSettingsButtons}
      />
      <RightVerticalNabvar />

      {!loadingUser && editProfileButton && (
        <EditProfile user={user} setUser={setUser} />
      )}

      {deleteAccountButton && <DeleteAccount userId={user.id} />}
    </div>
  );
}
