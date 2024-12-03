import React from "react";
import "./ParticipatingGroups.css";
import Group from "./Group";

export default function ParticipatingGroups({ participatingGroups }) {
  return (
    <div className="participating-groups-container">
      <label className="participating-groups-label">Participating</label>

      <div className="participating-groups-border"></div>

      {participatingGroups.map((group, index) => (
        <Group group={group} index={index} />
      ))}
    </div>
  );
}
