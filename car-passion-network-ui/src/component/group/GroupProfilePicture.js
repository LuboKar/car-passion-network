import React, { useRef } from "react";
import "./GroupProfilePicture.css";
import ProfilePicture from "../pageUtils/user/ProfilePicture";
import defaultGroupPicture from "../../images/group image.png";
import { getId } from "../service/TokenService";
import { uploadGroupPicture } from "../service/GroupService";

export default function GroupProfilePicture({ group, setGroup }) {
  const currentUserId = getId();
  const fileInputRef = useRef(null);

  const handleContainerClick = () => {
    if (group.admin.id !== currentUserId) {
      return;
    }

    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    if (file) {
      const response = await uploadGroupPicture(formData, group.id);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      setGroup(data);
    }
  };
  return (
    <div
      className="group-profile-picture-container"
      onClick={handleContainerClick}
    >
      <ProfilePicture
        profilePicture={group.groupPicture}
        defaultProfilePicture={defaultGroupPicture}
      />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}
