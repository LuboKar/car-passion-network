import React from "react";
import "./Groups.css";
import CreateGroup from "./CreateGroup";
import { getId } from "../service/TokenService";

export default function Group({ userId }) {
  const currentUserId = getId();

  return (
    <div className="groups-container">
      {currentUserId === userId && <CreateGroup />}
    </div>
  );
}
