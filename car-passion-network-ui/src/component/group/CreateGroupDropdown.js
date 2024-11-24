import React, { useState, useEffect } from "react";
import "./CreateGroupDropdown.css";
import { createGroup } from "../service/GroupService";

export default function CreateGroupDropdown({ setCreateGroupDropdown }) {
  const [groupName, setGroupName] = useState("");
  const [emptyGroupName, setEmptyGroupName] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (groupName !== "") {
      setEmptyGroupName(false);
    }
  }, [groupName]);

  const handleInputChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleCreateGroup = async (event) => {
    event.preventDefault();

    if (groupName === "") {
      setEmptyGroupName(groupName === "");
      return;
    }

    const response = await createGroup(groupName);

    if (!response.ok) {
      const responseBody = await response.json();
      setErrorMessage(responseBody.error);
      return false;
    }

    const group = await response.json();
    setCreateGroupDropdown(false);
    console.log(group);
  };

  return (
    <div className="create-group-dropdown-container">
      <form className="create-group-dropdown-form" onSubmit={handleCreateGroup}>
        <label className="create-group-dropdown-form-error-message">
          {errorMessage}
        </label>

        <label className="create-group-dropdown-form-label">Group Name:</label>
        <input
          className={
            !emptyGroupName
              ? "create-group-dropdown-form-input"
              : "create-group-dropdown-form-empty-input"
          }
          placeholder="Group Name"
          type="text"
          name="groupName"
          value={groupName}
          onChange={handleInputChange}
        />

        <button className="create-group-dropdown-form-button" type="submit">
          Create
        </button>
      </form>
    </div>
  );
}
