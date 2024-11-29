import React from "react";
import "./ViewGroups.css";
import Group from "./Group";

export default function ViewGroups({ userAdminGroups, setUserAdminGroups }) {
  return (
    <div className="view-groups-container">
      <label className="view-groups-my-groups-label">My Groups</label>

      <div className="view-groups-my-groups-border"></div>

      {userAdminGroups.map((group, index) => (
        <div className="view-groups-my-groups-group-container" key={index}>
          <Group
            group={group}
            setUserAdminGroups={setUserAdminGroups}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}
