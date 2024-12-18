import React, { useContext } from "react";
import "./GroupMember.css";
import useNavigation from "../service/NavigateService";
import { getId } from "../service/TokenService";
import User from "../pageUtils/user/User";
import { GroupMembersContext } from "../context/GroupMembersProvider";
import { GroupProfileContext } from "../context/GroupProfileProvider";
import UserActionButton from "../pageUtils/user/UserActionButton";

export default function GroupMember({ member, index }) {
  const { navigateToProfile } = useNavigation();
  const { handleRemoveMember } = useContext(GroupMembersContext);
  const { group } = useContext(GroupProfileContext);
  const currentUserId = getId();

  return (
    <div className="group-member-container">
      <User
        user={member}
        navigateToProfile={() => navigateToProfile(member.id)}
      />

      {currentUserId === group.admin.id && group.admin !== member && (
        <UserActionButton
          buttonText="Remove"
          handleAction={() => handleRemoveMember(group.id, member.id, index)}
        />
      )}
    </div>
  );
}
