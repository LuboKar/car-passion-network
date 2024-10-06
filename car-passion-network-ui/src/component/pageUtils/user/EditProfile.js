import React, { useState } from "react";
import "./EditProfile.css";
import EditName from "./EditName";
import { editUser } from "../../service/UserService";
import EditPassword from "./EditPassword";

export default function EditProfile({ user, setUser }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const edit = async (editValues) => {
    const response = await editUser(editValues);

    if (!response.ok) {
      const responseBody = await response.json();
      setErrorMessage(responseBody.error);
      return false;
    }

    const editedUser = await response.json();
    setUser(editedUser);
    return true;
  };

  return (
    <div className="edit-profile-container">
      <label className={successMessage ? "success-message" : "error-message"}>
        {successMessage ? successMessage : errorMessage}
      </label>

      <EditName user={user} edit={edit} setSuccessMessage={setSuccessMessage} />

      <EditPassword
        edit={edit}
        setSuccessMessage={setSuccessMessage}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
}
