import React, { useRef } from "react";
import "./UserProfilePicture.css";
import ProfilePicture from "./ProfilePicture";
import { saveProfilePictureUrl } from "../../service/profilePictureService";
import { getId } from "../../service/TokenService";
import { uploadProfilePicture } from "../../service/UserService";

export default function UserProfilePicture({ user }) {
  const currentUserId = getId();
  const fileInputRef = useRef(null);

  const handleContainerClick = () => {
    if (user.id !== currentUserId) {
      return;
    }

    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append("file", file);

    if (file) {
      const response = await uploadProfilePicture(formData);

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      saveProfilePictureUrl(data.profilePicture);
      window.location.reload(false);
    }
  };

  return (
    <div
      className="user-profile-picture-container"
      onClick={handleContainerClick}
    >
      <ProfilePicture profilePicture={user.profilePicture} />

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </div>
  );
}
