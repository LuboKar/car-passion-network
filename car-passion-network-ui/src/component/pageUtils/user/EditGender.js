import React, { useState, useEffect } from "react";
import "./EditGender.css";

export default function EditGender({ edit, setSuccessMessage }) {
  const [editGenderDropdown, setEditGenderDropdown] = useState(false);
  const [emptyGender, setEmptyGender] = useState(false);
  const [editGenderValue, setEditGenderValue] = useState({
    gender: "",
  });

  useEffect(() => {
    if (editGenderValue.gender !== "") {
      setEmptyGender(false);
    }
  }, [editGenderValue.gender]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditGenderValue((prevEditGenderValue) => ({
      ...prevEditGenderValue,
      [name]: value,
    }));
  };

  const toggleGenderDropdown = () => {
    setEditGenderDropdown(!editGenderDropdown);
    setSuccessMessage("");
  };

  const editUserGender = (event) => {
    event.preventDefault();

    if (editGenderValue.gender === "") {
      setEmptyGender(true);
      return;
    }

    edit(editGenderValue);
    setSuccessMessage("Gender updated successfully.");
    setEditGenderDropdown(false);
  };

  return (
    <div className="edit-gender-container">
      <div className="change-gender-border"></div>

      <div
        className={
          editGenderDropdown
            ? "change-gender-label-container-selected"
            : "change-gender-label-container"
        }
        onClick={toggleGenderDropdown}
      >
        <label className="change-gender-label">Edit gender</label>
        <label className="greater-than-symbol">
          {editGenderDropdown ? "\u25B2" : "\u25BC"}
        </label>
      </div>

      {editGenderDropdown && (
        <div className="edit-gender-dropdown-container">
          <form className="edit-gender-form" onSubmit={editUserGender}>
            <label className="label-gender">Gender:</label>

            <select
              id="selectOption"
              name="gender"
              className={
                emptyGender ? "empty-edit-select-gender" : "edit-select-gender"
              }
              value={editGenderValue.gender}
              onChange={handleInputChange}
            >
              <option value="">--Select an option--</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>

            <button className="edit-gender-button" type="submit">
              Save changes
            </button>
          </form>
        </div>
      )}

      <div className="change-gender-border"></div>
    </div>
  );
}
