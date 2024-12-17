import React from "react";
import "./GroupMembers.css";
import GroupMember from "./GroupMember";
import { removeMember } from "../service/GroupService";

export default function GroupMembers({ group, setGroupMembers, groupMembers }) {
  const toggleRemoveMember = async (memberId, index) => {
    const response = await removeMember(group.id, memberId);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    setGroupMembers((prevGroupMembers) => [
      ...prevGroupMembers.slice(0, index),
      ...prevGroupMembers.slice(index + 1),
    ]);
  };

  return (
    <div className="group-members-container">
      <label className="groups-members-admin-label"> Admin:</label>
      <div className="groups-members-admin-border"></div>
      <GroupMember member={group.admin} />

      <label className="groups-members-members-label"> Members:</label>
      <div className="groups-members-members-border"></div>
      {groupMembers.map((member, index) => (
        <GroupMember
          member={member}
          index={index}
          adminId={group.admin.id}
          toggleRemoveMember={toggleRemoveMember}
        />
      ))}
    </div>
  );
}
