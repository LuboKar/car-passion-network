import React, { useState, useEffect } from "react";
import "./EditName.css";

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

      <div
        className={
          editNameDropdown
            ? "change-name-label-container-selected"
            : "change-name-label-container"
        }
        onClick={toggleEditNameDropdown}
      >
        <label className="change-name-label">Edit name</label>
        <label className="greater-than-symbol">
          {editNameDropdown ? "\u25B2" : "\u25BC"}
        </label>
      </div>

      {editNameDropdown && (
        <div className="edit-name-dropdown-container">
          <form className="edit-name-form" onSubmit={editUserName}>
            <label className="label-name">First Name:</label>
            <input
              className={
                emptyFirstName ? "empty-edit-name-input" : "edit-name-input"
              }
              placeholder="First Name"
              type="text"
              name="firstName"
              value={editNameValues.firstName}
              onChange={handleInputChange}
            />
            <label className="label-name">Last Name:</label>
            <input
              className={
                emptyLastName ? "empty-edit-name-input" : "edit-name-input"
              }
              placeholder="Last Name"
              type="text"
              name="lastName"
              value={editNameValues.lastName}
              onChange={handleInputChange}
            />

            <button className="edit-name-button" type="submit">
              Save changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
