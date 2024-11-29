import React from "react";
import "./Groups.css";
import CreateGroup from "./CreateGroup";
import { getId } from "../service/TokenService";
import ViewGroups from "./ViewGroups";

export default function Group({ userId, userAdminGroups, setUserAdminGroups }) {
  const currentUserId = getId();

  return (
    <div className="groups-container">
      {currentUserId === userId && <CreateGroup />}

      <ViewGroups
        userAdminGroups={userAdminGroups}
        setUserAdminGroups={setUserAdminGroups}
      />
    </div>
  );
}
