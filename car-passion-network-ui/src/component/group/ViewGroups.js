import React, { useState, useContext } from "react";
import "./ViewGroups.css";
import OtherGroups from "./OtherGroups";
import GroupButtons from "./GroupButtons";
import CreatedGroups from "./CreatedGroups.js";
import ParticipatingGroups from "./ParticipatingGroups.js";
import { ProfileGroupsContext } from "../context/ProfileGroupsProvider.js";

export default function ViewGroups() {
  const [viewCreated, setViewCreated] = useState(true);
  const [viewParticipating, setViewParticipating] = useState(false);
  const [viewOthers, setViewOthers] = useState(false);

  const {
    userAdminGroups,
    setUserAdminGroups,
    loadingAdminGroups,
    participatingGroups,
    setParticipatingGroups,
    loadingParticipatingGroups,
    otherGroups,
    loadingOtherGroups,
  } = useContext(ProfileGroupsContext);

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

      {!loadingAdminGroups && viewCreated && (
        <CreatedGroups
          userAdminGroups={userAdminGroups}
          setUserAdminGroups={setUserAdminGroups}
        />
      )}

      {!loadingParticipatingGroups && viewParticipating && (
        <ParticipatingGroups
          participatingGroups={participatingGroups}
          setParticipatingGroups={setParticipatingGroups}
        />
      )}

      {!loadingOtherGroups && viewOthers && (
        <OtherGroups otherGroups={otherGroups} />
      )}
    </div>
  );
}
