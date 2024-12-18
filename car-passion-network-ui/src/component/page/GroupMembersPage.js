import React, { useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import { useParams } from "react-router-dom";
import GroupProfile from "../group/GroupProfile";
import GroupMembers from "../group/GroupMembers";
import { GroupProfileContext } from "../context/GroupProfileProvider";
import useGroupButtons from "../button/GroupButtons";
import { GroupMembersContext } from "../context/GroupMembersProvider";

export default function GroupMembersPage() {
  const { id } = useParams();
  const { loadingGroup } = useContext(GroupProfileContext);
  const { loadingGroupMembers } = useContext(GroupMembersContext);
  const { groupButtons } = useGroupButtons(id);
  groupButtons[1].isVisible = true;

  return (
    <div className="group-members-page-container">
      <Navbar />

      <VerticalNavbar topButtons={groupButtons} />
      <RightVerticalNabvar />

      {!loadingGroup && <GroupProfile />}

      {!loadingGroup && !loadingGroupMembers && <GroupMembers />}
    </div>
  );
}
