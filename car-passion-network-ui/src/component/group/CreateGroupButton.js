import React from "react";
import "./CreateGroupButton.css";

export default function CreateGroupButton({ toggleCreateGroup }) {
  return (
    <div className="create-group-button-container" onClick={toggleCreateGroup}>
      <label className="create-group-button-label">Create Group</label>
    </div>
  );
}
