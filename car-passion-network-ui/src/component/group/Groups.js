import React from "react";
import "./Groups.css";
import CreateGroup from "./CreateGroup";
import { getId } from "../service/TokenService";
import ViewGroups from "./ViewGroups";
import { ProfileGroupsProvider } from "../context/ProfileGroupsProvider";

export default function Groups({ userId }) {
  const currentUserId = getId();

  return (
    <div className="groups-container">
      {currentUserId === userId && <CreateGroup />}

      <ProfileGroupsProvider>
        <ViewGroups />
      </ProfileGroupsProvider>
    </div>
  );
}
