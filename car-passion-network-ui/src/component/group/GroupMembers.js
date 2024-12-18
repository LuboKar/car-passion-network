import React, { useContext } from "react";
import "./GroupMembers.css";
import GroupMember from "./GroupMember";
import { GroupProfileContext } from "../context/GroupProfileProvider";
import { GroupMembersContext } from "../context/GroupMembersProvider";

export default function GroupMembers() {
  const { group } = useContext(GroupProfileContext);
  const { groupMembers } = useContext(GroupMembersContext);

  return (
    <div className="group-members-container">
      <label className="groups-members-admin-label"> Admin:</label>
      <div className="groups-members-admin-border"></div>
      <GroupMember member={group.admin} />

      <label className="groups-members-members-label"> Members:</label>
      <div className="groups-members-members-border"></div>
      {groupMembers.map((member, index) => (
        <GroupMember member={member} index={index} />
      ))}
    </div>
  );
}
