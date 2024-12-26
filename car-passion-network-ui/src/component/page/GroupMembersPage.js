import React, { useContext } from "react";
import GroupMembers from "../group/GroupMembers";
import { GroupMembersContext } from "../context/GroupMembersProvider";

export default function GroupMembersPage() {
  const { loadingGroupMembers } = useContext(GroupMembersContext);

  return (
    <div className="group-members-page-container">
      {!loadingGroupMembers && <GroupMembers />}
    </div>
  );
}
