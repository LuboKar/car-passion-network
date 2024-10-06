import React, { useState, useEffect } from "react";
import "./EditPassword.css";

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

      <div
        className={
          editPasswordDropdown
            ? "change-password-label-container-selected"
            : "change-password-label-container"
        }
        onClick={toggleEditPasswordDropdown}
      >
        <label className="change-password-label">Edit password</label>
        <label className="greater-than-symbol">
          {editPasswordDropdown ? "\u25B2" : "\u25BC"}
        </label>
      </div>

      {editPasswordDropdown && (
        <div className="edit-password-dropdown-container">
          <form className="edit-password-form" onSubmit={editUserPassword}>
            <label className="label-password">Old Password:</label>
            <input
              className={
                emptyOldPassword ? "empty-password-input" : "password-input"
              }
              placeholder="Old Password"
              type="password"
              name="oldPassword"
              value={editPasswordValues.oldPassword}
              onChange={handleInputChange}
            />
            <label className="label-password">New Password:</label>
            <input
              className={
                emptyNewPassword ? "empty-password-input" : "password-input"
              }
              placeholder="New Password"
              type="password"
              name="newPassword"
              value={editPasswordValues.newPassword}
              onChange={handleInputChange}
            />

            <label className="label-password">Confirm Password:</label>
            <input
              className={
                emptyConfirmPassword ? "empty-password-input" : "password-input"
              }
              placeholder="Confirm Password"
              type="password"
              name="confirmPassword"
              value={editPasswordValues.confirmPassword}
              onChange={handleInputChange}
            />

            <button className="edit-password-button" type="submit">
              Save changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
