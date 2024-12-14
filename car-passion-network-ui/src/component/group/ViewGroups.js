import React, { useContext } from "react";
import "./ViewGroups.css";
import OtherGroups from "./OtherGroups";
import GroupButtons from "./GroupButtons";
import CreatedGroups from "./CreatedGroups.js";
import ParticipatingGroups from "./ParticipatingGroups.js";
import { ProfileGroupsContext } from "../context/ProfileGroupsProvider.js";
import useProfileGroupButtons from "../button/ProfileGroupButtons.js";

export default function ViewGroups() {
  const { profileGroupButtons, viewCreated, viewParticipating, viewOthers } =
    useProfileGroupButtons();

  const { loadingAdminGroups, loadingParticipatingGroups, loadingOtherGroups } =
    useContext(ProfileGroupsContext);

  return (
    <div className="view-groups-container">
      <GroupButtons groupButtons={profileGroupButtons} />
      <div className="view-groups-border"></div>

      {!loadingAdminGroups && viewCreated && <CreatedGroups />}

      {!loadingParticipatingGroups && viewParticipating && (
        <ParticipatingGroups />
      )}

      {!loadingOtherGroups && viewOthers && <OtherGroups />}
    </div>
  );
}
