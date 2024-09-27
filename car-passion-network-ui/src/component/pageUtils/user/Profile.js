import React, { useRef } from "react";
import "./Profile.css";
import { uploadProfilePicture } from "../../service/UserService";
import pic from "../../../images/profile-pic.jpg";
import { getId } from "../../service/TokenService";
import { saveProfilePictureUrl } from "../../service/profilePictureService";

export default function Profile({ user }) {
  const fileInputRef = useRef(null);

  const handleContainerClick = () => {
    if (user.id !== getId()) {
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
    <div className="profile-container">
      <div className="image-container" onClick={handleContainerClick}>
        <img
          src={
            user.profilePicture
              ? `http://localhost:8080/${user.profilePicture}`
              : pic
          }
          alt={"profile-pic"}
          className="profile-pic"
        />
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
      <label className="profile-name">
        {user.firstName} {user.lastName}
      </label>
    </div>
  );
}
