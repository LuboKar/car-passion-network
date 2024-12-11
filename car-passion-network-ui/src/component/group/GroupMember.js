import React from "react";
import "./GroupMember.css";
import ProfilePicture from "../pageUtils/user/ProfilePicture";
import useNavigation from "../service/NavigateService";

export default function GroupMember({ member }) {
  const { navigateToProfile } = useNavigation();
  return (
    <div className="group-member-container">
      <div className="group-member-profile-picture-container">
        <ProfilePicture
          profilePicture={member.profilePicture}
          navigateToProfile={() => navigateToProfile(member.id)}
        />
      </div>

      <label
        className="group-member-name-label"
        onClick={() => navigateToProfile(member.id)}
      >
        {member.firstName} {member.lastName}
      </label>
    </div>
  );
}
