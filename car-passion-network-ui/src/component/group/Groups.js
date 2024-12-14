import React, { useContext } from "react";
import "./Groups.css";
import CreateGroup from "./CreateGroup";
import { getId } from "../service/TokenService";
import ViewGroups from "./ViewGroups";
import { useParams } from "react-router-dom";
import { ProfileGroupsProvider } from "../context/ProfileGroupsProvider";

export default function Groups() {
  const { id } = useParams();
  const currentUserId = getId();

  return (
    <div className="groups-container">
      {currentUserId === id && <CreateGroup />}

      <ProfileGroupsProvider>
        <ViewGroups />
      </ProfileGroupsProvider>
    </div>
  );
}
