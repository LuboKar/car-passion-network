import React from "react";
import "./RemoveGroupMember.css";

export default function RemoveGroupMember({
  member,
  index,
  toggleRemoveMember,
}) {
  return (
    <div className="remove-group-member-container">
      <button
        className="remove-group-member-button"
        onClick={() => toggleRemoveMember(member.id, index)}
      >
        Remove
      </button>
    </div>
  );
}
