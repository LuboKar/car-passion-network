import React from "react";
import "./MyGroups.css";
import CreatedGroups from "./CreatedGroups";
import ParticipatingGroups from "./ParticipatingGroups";

export default function MyGroups({
  userAdminGroups,
  setUserAdminGroups,
  participatingGroups,
}) {
  return (
    <div className="my-groups-container">
      <label className="my-groups-label">My Groups</label>

      <div className="my-groups-border"></div>

      <CreatedGroups
        userAdminGroups={userAdminGroups}
        setUserAdminGroups={setUserAdminGroups}
      />

      <ParticipatingGroups participatingGroups={participatingGroups} />
    </div>
  );
}
