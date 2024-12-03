import React from "react";
import "./MyGroups.css";
import CreatedGroups from "./CreatedGroups";

export default function MyGroups({ userAdminGroups, setUserAdminGroups }) {
  return (
    <div className="my-groups-container">
      <label className="my-groups-label">My Groups</label>

      <div className="my-groups-border"></div>

      <CreatedGroups
        userAdminGroups={userAdminGroups}
        setUserAdminGroups={setUserAdminGroups}
      />
    </div>
  );
}
