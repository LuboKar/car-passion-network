import React, { useState, useEffect } from "react";
import "./EditName.css";
import EditOption from "./EditOption";

export default function EditName({ user, edit, setSuccessMessage }) {
  const [editNameDropdown, setEditNameDropdown] = useState(false);
  const [emptyFirstName, setEmptyFirstName] = useState(false);
  const [emptyLastName, setEmptyLastName] = useState(false);
  const [editNameValues, setEditNameValues] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
  });

  useEffect(() => {
    if (editNameValues.firstName !== "") {
      setEmptyFirstName(false);
    }

    if (editNameValues.lastName !== "") {
      setEmptyLastName(false);
    }
  }, [editNameValues.firstName, editNameValues.lastName]);

  const toggleEditNameDropdown = () => {
    setEditNameDropdown(!editNameDropdown);
    setSuccessMessage("");
  };

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setEditNameValues((editNameValues) => ({
      ...editNameValues,
      [name]: value,
    }));
  };

  const editUserName = (event) => {
    event.preventDefault();

    if (editNameValues.firstName === "" || editNameValues.lastName === "") {
      setEmptyFirstName(editNameValues.firstName === "");
      setEmptyLastName(editNameValues.lastName === "");
      return;
    }

    edit(editNameValues);
    setSuccessMessage("Name updated successfully.");
    setEditNameDropdown(false);
  };

  return (
    <div className="edit-name-container">
      <div className="change-name-border"></div>

      <EditOption
        dropdown={editNameDropdown}
        toggleDropdown={toggleEditNameDropdown}
        text="Edit name"
      />

      {editNameDropdown && (
        <div className="edit-name-dropdown-container">
          <form className="edit-name-dropdown-form" onSubmit={editUserName}>
            <label className="edit-name-dropdown-label">First Name:</label>
            <input
              className={
                !emptyFirstName
                  ? "edit-name-dropdown-input"
                  : "edit-name-dropdown-name-empty-input"
              }
              placeholder="First Name"
              type="text"
              name="firstName"
              value={editNameValues.firstName}
              onChange={handleInputChange}
            />

            <label className="edit-name-dropdown-label">Last Name:</label>
            <input
              className={
                !emptyLastName
                  ? "edit-name-dropdown-input"
                  : "edit-name-dropdown-name-empty-input"
              }
              placeholder="Last Name"
              type="text"
              name="lastName"
              value={editNameValues.lastName}
              onChange={handleInputChange}
            />

            <button className="edit-name-dropdown-button" type="submit">
              Save changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
