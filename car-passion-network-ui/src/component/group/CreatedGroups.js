import React, { useContext } from "react";
import Group from "./Group";
import "./CreatedGroups.css";
import { ProfileGroupsContext } from "../context/ProfileGroupsProvider";

export default function CreatedGroups() {
  const { userAdminGroups, setUserAdminGroups } =
    useContext(ProfileGroupsContext);

  return (
    <div className="created-groups-container">
      {userAdminGroups.map((group, index) => (
        <div className="created-groups-group" key={index}>
          <Group group={group} index={index} />
        </div>
      ))}
    </div>
  );
}
