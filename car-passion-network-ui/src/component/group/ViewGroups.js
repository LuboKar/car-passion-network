import React from "react";
import "./ViewGroups.css";
import MyGroups from "./MyGroups";
import OtherGroups from "./OtherGroups";

export default function ViewGroups({
  userAdminGroups,
  setUserAdminGroups,
  otherGroups,
  participatingGroups,
  setParticipatingGroups,
}) {
  return (
    <div className="view-groups-container">
      <MyGroups
        userAdminGroups={userAdminGroups}
        setUserAdminGroups={setUserAdminGroups}
        participatingGroups={participatingGroups}
        setParticipatingGroups={setParticipatingGroups}
      />

      <OtherGroups otherGroups={otherGroups} />
    </div>
  );
}
