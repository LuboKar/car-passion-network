import React from "react";
import "./GroupMember.css";
import ProfilePicture from "../pageUtils/user/ProfilePicture";
import useNavigation from "../service/NavigateService";
import RemoveGroupMember from "./RemoveGroupMember";
import { getId } from "../service/TokenService";

export default function GroupMember({
  member,
  index,
  adminId,
  toggleRemoveMember,
}) {
  const { navigateToProfile } = useNavigation();
  const currentUserId = getId();

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

      {currentUserId === adminId && (
        <RemoveGroupMember
          member={member}
          index={index}
          toggleRemoveMember={toggleRemoveMember}
        />
      )}
    </div>
  );
}
