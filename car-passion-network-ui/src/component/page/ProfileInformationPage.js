import React, { useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import Profile from "../pageUtils/user/Profile";
import { useParams } from "react-router-dom";
import Information from "../pageUtils/user/Information";
import useButtons from "../button/ProfileButtons";
import { ProfileContext } from "../context/ProfileProvider";

export default function ProfileInformationPage() {
  const { id } = useParams();
  const { user, setUser, loadingUser } = useContext(ProfileContext);

  const { profileButtons } = useButtons(id);
  profileButtons[1].isVisible = true;

  return (
    <div className="profile-information-page-container">
      <Navbar />

      <VerticalNavbar topButtons={profileButtons} />
      <RightVerticalNabvar />

      {!loadingUser && <Profile user={user} setUser={setUser} />}

      {!loadingUser && <Information user={user} />}
    </div>
  );
}
