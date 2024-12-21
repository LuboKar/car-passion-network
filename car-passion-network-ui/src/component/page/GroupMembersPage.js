import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import GroupProfile from "../group/GroupProfile";
import GroupMembers from "../group/GroupMembers";
import { GroupProfileContext } from "../context/GroupProfileProvider";
import { GroupMembersContext } from "../context/GroupMembersProvider";

export default function GroupMembersPage() {
  const { loadingGroup } = useContext(GroupProfileContext);
  const { loadingGroupMembers } = useContext(GroupMembersContext);

  return (
    <div className="group-members-page-container">
      {!loadingGroup && <GroupProfile />}

      {!loadingGroup && !loadingGroupMembers && <GroupMembers />}
    </div>
  );
}
