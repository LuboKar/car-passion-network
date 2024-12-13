import React, { useState } from "react";
import "./ViewGroups.css";
import OtherGroups from "./OtherGroups";
import GroupButtons from "./GroupButtons";
import CreatedGroups from "./CreatedGroups.js";
import ParticipatingGroups from "./ParticipatingGroups.js";

export default function ViewGroups({
  userAdminGroups,
  setUserAdminGroups,
  otherGroups,
  participatingGroups,
  setParticipatingGroups,
}) {
  const [viewCreated, setViewCreated] = useState(true);
  const [viewParticipating, setViewParticipating] = useState(false);
  const [viewOthers, setViewOthers] = useState(false);

  const disableAllButtons = () => {
    setViewCreated(false);
    setViewParticipating(false);
    setViewOthers(false);
  };

  const toggleCreated = () => {
    disableAllButtons();
    setViewCreated(true);
  };

  const toggleParticipating = () => {
    disableAllButtons();
    setViewParticipating(true);
  };

  const toggleOthers = () => {
    disableAllButtons();
    setViewOthers(true);
  };

  const groupButtons = [
    {
      label: "Created",
      onClick: toggleCreated,
      isVisible: viewCreated,
    },
    {
      label: "Participating",
      onClick: toggleParticipating,
      isVisible: viewParticipating,
    },
    {
      label: "Other",
      onClick: toggleOthers,
      isVisible: viewOthers,
    },
  ];

  return (
    <div className="view-groups-container">
      <GroupButtons groupButtons={groupButtons} />
      <div className="view-groups-border"></div>

      {viewCreated && (
        <CreatedGroups
          userAdminGroups={userAdminGroups}
          setUserAdminGroups={setUserAdminGroups}
        />
      )}

      {viewParticipating && (
        <ParticipatingGroups
          participatingGroups={participatingGroups}
          setParticipatingGroups={setParticipatingGroups}
        />
      )}

      {viewOthers && <OtherGroups otherGroups={otherGroups} />}
    </div>
  );
}
