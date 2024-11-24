import React, { useState } from "react";
import "./CreateGroup.css";
import CreateGroupButton from "./CreateGroupButton";
import CreateGroupDropdown from "./CreateGroupDropdown";

export default function CreateGroup() {
  const [createGroupDropdown, setCreateGroupDropdown] = useState(false);

  const toggleCreateGroup = () => {
    setCreateGroupDropdown(true);
  };

  return (
    <div className="create-group-container">
      {!createGroupDropdown && (
        <CreateGroupButton toggleCreateGroup={toggleCreateGroup} />
      )}

      {createGroupDropdown && (
        <CreateGroupDropdown setCreateGroupDropdown={setCreateGroupDropdown} />
      )}
    </div>
  );
}
