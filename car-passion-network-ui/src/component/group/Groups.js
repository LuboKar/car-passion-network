import React from "react";
import "./Groups.css";
import CreateGroup from "./CreateGroup";
import { getId } from "../service/TokenService";
import ViewGroups from "./ViewGroups";

export default function Groups({
  userId,
  userAdminGroups,
  setUserAdminGroups,
  otherGroups,
  participatingGroups,
  setParticipatingGroups,
}) {
  const currentUserId = getId();

  return (
    <div className="groups-container">
      {currentUserId === userId && <CreateGroup />}

      <ViewGroups
        userAdminGroups={userAdminGroups}
        setUserAdminGroups={setUserAdminGroups}
        otherGroups={otherGroups}
        participatingGroups={participatingGroups}
        setParticipatingGroups={setParticipatingGroups}
      />
    </div>
  );
}
