import React from "react";
import "./OtherGroups.css";
import Group from "./Group";

export default function OtherGroups({ otherGroups }) {
  return (
    <div className="other-groups-container">
      {otherGroups.map((group, index) => (
        <Group group={group} index={index} />
      ))}
    </div>
  );
}
