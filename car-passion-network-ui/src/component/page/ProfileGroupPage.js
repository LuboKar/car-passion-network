import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Profile from "../pageUtils/user/Profile";
import Groups from "../group/Groups";
import useButtons from "../button/ProfileButtons";
import { ProfileContext } from "../context/ProfileProvider";

export default function ProfileGroupPage() {
  const { id } = useParams();
  const { loadingUser } = useContext(ProfileContext);

  const { profileButtons } = useButtons(id);
  profileButtons[3].isVisible = true;

  return (
    <div className="profile-group-page-container">
      {!loadingUser && <Profile />}

      <Groups userId={id} />
    </div>
  );
}
