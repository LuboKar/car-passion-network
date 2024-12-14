import React, { useContext } from "react";
import "./ParticipatingGroups.css";
import Group from "./Group";
import { ProfileGroupsContext } from "../context/ProfileGroupsProvider";

export default function ParticipatingGroups() {
  const { participatingGroups, setParticipatingGroups } =
    useContext(ProfileGroupsContext);

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
