import React from "react";
import "./GroupMembers.css";
import GroupMember from "./GroupMember";

export default function GroupMembers({ group }) {
  return (
    <div className="group-members-container">
      <label className="groups-members-admin-label"> Admin:</label>
      <div className="groups-members-admin-border"></div>
      <GroupMember member={group.admin} />

      <label className="groups-members-members-label"> Members:</label>
      <div className="groups-members-members-border"></div>
      {group.members.map((member, index) => (
        <GroupMember member={member} />
      ))}
    </div>
  );
}
