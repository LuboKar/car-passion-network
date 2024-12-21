import React, { useContext } from "react";
import Profile from "../pageUtils/user/Profile";
import { useParams } from "react-router-dom";
import Information from "../pageUtils/user/Information";
import useButtons from "../button/ProfileButtons";
import { ProfileContext } from "../context/ProfileProvider";

export default function ProfileInformationPage() {
  const { id } = useParams();
  const { loadingUser } = useContext(ProfileContext);

  const { profileButtons } = useButtons(id);
  profileButtons[1].isVisible = true;

  return (
    <div className="profile-information-page-container">
      {!loadingUser && <Profile />}

      {!loadingUser && <Information />}
    </div>
  );
}
