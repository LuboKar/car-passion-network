import React, { useState, useEffect } from "react";
import "./EditPassword.css";
import EditOption from "./EditOption";

export default function EditPassword({
  edit,
  setSuccessMessage,
  setErrorMessage,
}) {
  const [editPasswordDropdown, setEditPasswordDropdown] = useState(false);
  const [emptyOldPassword, setEmptyOldPassword] = useState(false);
  const [emptyConfirmPassword, setEmptyConfirmPassword] = useState(false);
  const [emptyNewPassword, setEmptyNewPassword] = useState(false);
  const [editPasswordValues, setEditPasswordValues] = useState({
    oldPassword: "",
    confirmPassword: "",
    newPassword: "",
  });

  useEffect(() => {
    if (editPasswordValues.oldPassword !== "") {
      setEmptyOldPassword(false);
    }

    if (editPasswordValues.confirmPassword !== "") {
      setEmptyConfirmPassword(false);
    }

    if (editPasswordValues.newPassword !== "") {
      setEmptyNewPassword(false);
    }
  }, [
    editPasswordValues.oldPassword,
    editPasswordValues.confirmPassword,
    editPasswordValues.newPassword,
  ]);

  const toggleEditPasswordDropdown = () => {
    setEditPasswordDropdown(!editPasswordDropdown);
    setSuccessMessage("");
    setErrorMessage("");
  };

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setEditPasswordValues((editPasswordValues) => ({
      ...editPasswordValues,
      [name]: value,
    }));
  };

  const isNewPasswordValid = () => {
    if (editPasswordValues.newPassword !== editPasswordValues.confirmPassword) {
      setEmptyConfirmPassword(true);
      setEmptyNewPassword(true);
      return false;
    }
    return true;
  };

  const isFieldEmpty = () => {
    if (
      editPasswordValues.oldPassword === "" ||
      editPasswordValues.confirmPassword === "" ||
      editPasswordValues.newPassword === ""
    ) {
      setEmptyOldPassword(editPasswordValues.oldPassword === "");
      setEmptyConfirmPassword(editPasswordValues.confirmPassword === "");
      setEmptyNewPassword(editPasswordValues.newPassword === "");
      return true;
    }
    return false;
  };

  const editUserPassword = async (event) => {
    event.preventDefault();

    if (isFieldEmpty()) {
      return;
    }

    if (!isNewPasswordValid()) {
      return;
    }

    const edited = await edit(editPasswordValues);

    if (edited) {
      setSuccessMessage("Password updated successfully.");
      setEditPasswordDropdown(false);
    } else {
      setEmptyOldPassword(true);
    }
  };

  return (
    <div className="edit-password-container">
      <div className="change-password-border"></div>

      <EditOption
        dropdown={editPasswordDropdown}
        toggleDropdown={toggleEditPasswordDropdown}
        text="Edit password"
      />

      {editPasswordDropdown && (
        <div className="edit-password-dropdown-container">
          <form
            className="edit-password-dropdown-form"
            onSubmit={editUserPassword}
          >
            <label className="edit-password-dropdown-label">
              Old Password:
            </label>
            <input
              className={
                !emptyOldPassword
                  ? "edit-password-dropdown-input"
                  : "edit-password-dropdown-empty-input"
              }
              placeholder="Old Password"
              type="password"
              autocomplete="new-password"
              name="oldPassword"
              value={editPasswordValues.oldPassword}
              onChange={handleInputChange}
            />

            <label className="edit-password-dropdown-label">
              New Password:
            </label>
            <input
              className={
                !emptyNewPassword
                  ? "edit-password-dropdown-input"
                  : "edit-password-dropdown-empty-input"
              }
              placeholder="New Password"
              type="password"
              name="newPassword"
              value={editPasswordValues.newPassword}
              onChange={handleInputChange}
            />

            <label className="edit-password-dropdown-label">
              Confirm Password:
            </label>
            <input
              className={
                !emptyConfirmPassword
                  ? "edit-password-dropdown-input"
                  : "edit-password-dropdown-empty-input"
              }
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={editPasswordValues.confirmPassword}
              onChange={handleInputChange}
            />

            <button className="edit-password-dropdown-button" type="submit">
              Save changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
