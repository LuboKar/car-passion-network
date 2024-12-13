import React from "react";
import Group from "./Group";
import "./CreatedGroups.css";

export default function CreatedGroups({ userAdminGroups, setUserAdminGroups }) {
  return (
    <div className="created-groups-container">
      {userAdminGroups.map((group, index) => (
        <div className="created-groups-group" key={index}>
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
