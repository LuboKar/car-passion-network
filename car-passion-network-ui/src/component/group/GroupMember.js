import React from "react";
import "./GroupMember.css";
import ProfilePicture from "../pageUtils/user/ProfilePicture";
import useNavigation from "../service/NavigateService";
import RemoveGroupMember from "./RemoveGroupMember";
import { getId } from "../service/TokenService";
import User from "../pageUtils/user/User";

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
      <User
        user={member}
        navigateToProfile={() => navigateToProfile(member.id)}
      />

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
