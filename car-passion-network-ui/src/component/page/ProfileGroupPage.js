import React, { useState, useEffect, useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import { useParams } from "react-router-dom";
import Profile from "../pageUtils/user/Profile";
import Groups from "../group/Groups";
import { getGroupsByAdmin } from "../service/GroupService";
import { getParticipatingGroups } from "../service/GroupService";
import { getOtherGroups } from "../service/GroupService";
import useButtons from "../button/ProfileButtons";
import { ProfileContext } from "../context/ProfileProvider";

export default function ProfileGroupPage() {
  const { id } = useParams();
  const { loadingUser } = useContext(ProfileContext);
  const [userAdminGroups, setUserAdminGroups] = useState([]);
  const [loadingAdminGroups, setLoadingAdminGroups] = useState(true);
  const [participatingGroups, setParticipatingGroups] = useState([]);
  const [loadingParticipatingGroups, setLoadingParticipatingGroups] =
    useState(true);
  const [otherGroups, setOtherGroups] = useState([]);
  const [loadingOtherGroups, setLoadingOtherGroups] = useState(true);

  const { profileButtons } = useButtons(id);
  profileButtons[3].isVisible = true;

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
    fetchAdminGroups();
    fetchParticipatingGroups();
    fetchOtherGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="profile-group-page-container">
      <Navbar />

      <VerticalNavbar topButtons={profileButtons} />
      <RightVerticalNabvar />

      {!loadingUser && <Profile />}

      {!loadingAdminGroups &&
        !loadingParticipatingGroups &&
        !loadingOtherGroups && (
          <Groups
            userId={id}
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
