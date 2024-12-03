import React from "react";
import Group from "./Group";
import "./CreatedGroups.css";

export default function CreatedGroups({ userAdminGroups, setUserAdminGroups }) {
  return (
    <div className="created-groups-container">
      <label className="created-groups-label">Created</label>

      <div className="created-groups-border"></div>

      {userAdminGroups.map((group, index) => (
        <Group
          group={group}
          setUserAdminGroups={setUserAdminGroups}
          index={index}
        />
      ))}
    </div>
  );
}
