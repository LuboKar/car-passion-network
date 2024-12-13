import React from "react";
import "./ParticipatingGroups.css";
import Group from "./Group";

export default function ParticipatingGroups({
  participatingGroups,
  setParticipatingGroups,
}) {
  return (
    <div className="participating-groups-container">
      {participatingGroups.map((group, index) => (
        <Group
          group={group}
          index={index}
          setParticipatingGroups={setParticipatingGroups}
        />
      ))}
    </div>
  );
}
