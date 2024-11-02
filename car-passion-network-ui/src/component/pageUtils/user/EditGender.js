import React, { useState, useEffect } from "react";
import "./EditGender.css";
import EditOption from "./EditOption";

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

      <EditOption
        dropdown={editGenderDropdown}
        toggleDropdown={toggleGenderDropdown}
        text="Edit gender"
      />

      {editGenderDropdown && (
        <div className="edit-gender-dropdown-container">
          <form className="edit-gender-dropdown-form" onSubmit={editUserGender}>
            <label className="edit-gender-dropdown-label">Gender:</label>

            <select
              id="selectOption"
              name="gender"
              className={
                !emptyGender
                  ? "edit-gender-dropdown-select-gender"
                  : "edit-gender-dropdown-select-empty-gender"
              }
              value={editGenderValue.gender}
              onChange={handleInputChange}
            >
              <option value="">--Select an option--</option>
              <option value="MALE">MALE</option>
              <option value="FEMALE">FEMALE</option>
            </select>

            <button className="edit-gender-dropdown-button" type="submit">
              Save changes
            </button>
          </form>
        </div>
      )}

      <div className="change-gender-border"></div>
    </div>
  );
}
