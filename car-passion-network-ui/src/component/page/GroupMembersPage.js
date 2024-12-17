import React, { useState, useEffect, useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import { useParams } from "react-router-dom";
import GroupProfile from "../group/GroupProfile";
import GroupMembers from "../group/GroupMembers";
import { getAllGroupMembers } from "../service/UserService";
import { GroupProfileContext } from "../context/GroupProfileProvider";
import useGroupButtons from "../button/GroupButtons";

export default function GroupMembersPage() {
  const { id } = useParams();
  const [groupMembers, setGroupMembers] = useState([]);
  const [loadingGroupMembers, setLoadingGroupMembers] = useState(true);

  const { group, loadingGroup } = useContext(GroupProfileContext);

  const { groupButtons } = useGroupButtons(id);
  groupButtons[1].isVisible = true;

  const fetchGroupMembers = async () => {
    const response = await getAllGroupMembers(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const membersData = await response.json();
    setGroupMembers(membersData);
    setLoadingGroupMembers(false);
  };

  useEffect(() => {
    fetchGroupMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="group-members-page-container">
      <Navbar />

      <VerticalNavbar topButtons={groupButtons} />
      <RightVerticalNabvar />

      {!loadingGroup && <GroupProfile />}

      {!loadingGroup && !loadingGroupMembers && (
        <GroupMembers
          group={group}
          setGroupMembers={setGroupMembers}
          groupMembers={groupMembers}
        />
      )}
    </div>
  );
}
