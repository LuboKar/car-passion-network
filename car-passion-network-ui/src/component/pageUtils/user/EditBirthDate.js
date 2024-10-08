import React, { useState, useEffect } from "react";
import "./EditBirthDate.css";
import DatePicker from "react-datepicker";

export default function EditBirthDate({ edit, setSuccessMessage }) {
  const [editBirthDateDropdown, setEditBirthDateDropdown] = useState(false);
  const [emptyDateOfBirth, setEmptyDateOfBirth] = useState(false);
  const [dateOfBirthValue, setDateOfBirthValue] = useState({
    dateOfBirth: "",
  });

  const toggleBirthDateDropdown = () => {
    setEditBirthDateDropdown(!editBirthDateDropdown);
    setSuccessMessage("");
  };

  useEffect(() => {
    if (dateOfBirthValue !== "") {
      setEmptyDateOfBirth(false);
    }
  }, [dateOfBirthValue]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    if (date !== null) {
      const formattedDate = formatDate(date);
      setDateOfBirthValue((prevDateOfBirthValues) => ({
        ...prevDateOfBirthValues,
        dateOfBirth: formattedDate,
      }));
    }
  };

  const editUserBirthDate = (event) => {
    event.preventDefault();

    if (dateOfBirthValue.dateOfBirth === "") {
      setEmptyDateOfBirth(true);
      return;
    }

    edit(dateOfBirthValue);
    setSuccessMessage("Birth date updated successfully.");
    setEditBirthDateDropdown(false);
  };

  return (
    <div className="edit-birth-date-container">
      <div className="change-birth-date-border"></div>

      <div
        className={
          editBirthDateDropdown
            ? "change-birth-date-label-container-selected"
            : "change-birth-date-label-container"
        }
        onClick={toggleBirthDateDropdown}
      >
        <label className="change-birth-date-label">Edit date of birth</label>
        <label className="greater-than-symbol">
          {editBirthDateDropdown ? "\u25B2" : "\u25BC"}
        </label>
      </div>

      {editBirthDateDropdown && (
        <div className="edit-birth-date-dropdown-container">
          <form className="edit-birth-date-form" onSubmit={editUserBirthDate}>
            <label className="label-birth-date">Birth Date:</label>

            <DatePicker
              className={
                emptyDateOfBirth
                  ? "empty-edit-form-birth-date"
                  : "edit-form-birth-date"
              }
              id="dateOfBirth"
              selected={dateOfBirthValue.dateOfBirth}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
            />

            <button className="edit-birth-date-button" type="submit">
              Save changes
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
