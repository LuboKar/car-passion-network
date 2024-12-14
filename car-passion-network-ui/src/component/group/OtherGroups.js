import React, { useContext } from "react";
import "./OtherGroups.css";
import Group from "./Group";
import { ProfileGroupsContext } from "../context/ProfileGroupsProvider";

export default function OtherGroups() {
  const { otherGroups } = useContext(ProfileGroupsContext);

  return (
    <div className="other-groups-container">
      {otherGroups.map((group, index) => (
        <Group group={group} index={index} />
      ))}
    </div>
  );
}
