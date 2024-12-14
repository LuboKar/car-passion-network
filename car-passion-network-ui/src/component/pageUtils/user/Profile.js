import React, { useContext, useRef } from "react";
import "./Profile.css";
import { uploadProfilePicture } from "../../service/UserService";
import { getId } from "../../service/TokenService";
import { saveProfilePictureUrl } from "../../service/profilePictureService";
import FriendActionButton from "./FriendActionButton";
import ProfilePicture from "./ProfilePicture";
import { ProfileContext } from "../../context/ProfileProvider";

export default function Profile() {
  const currentUserId = getId();
  const fileInputRef = useRef(null);
  const { user, handleAddFriend, handleRemoveFriend } =
    useContext(ProfileContext);

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
    <div className="profile-container">
      <div className="profile-image-container" onClick={handleContainerClick}>
        <ProfilePicture profilePicture={user.profilePicture} />

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

      {currentUserId !== user.id && (
        <div className="profile-friend-request">
          {user.friend ? (
            <FriendActionButton
              buttonText="Remove Friend"
              handleAction={handleRemoveFriend}
            />
          ) : (
            <FriendActionButton
              buttonText="Add Friend"
              handleAction={handleAddFriend}
            />
          )}
        </div>
      )}
    </div>
  );
}
