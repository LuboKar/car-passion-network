import React, { useState } from "react";
import "./EditProfile.css";
import EditName from "./EditName";
import { editUser } from "../../service/UserService";

export default function EditProfile({ user, setUser }) {
  const [successMessage, setSuccessMessage] = useState("");

  const edit = async (editValues) => {
    const response = await editUser(editValues);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const editedUser = await response.json();
    setUser(editedUser);
  };

  return (
    <div className="edit-profile-container">
      <label className="success-message">{successMessage}</label>

      <EditName user={user} edit={edit} setSuccessMessage={setSuccessMessage} />
    </div>
  );
}
