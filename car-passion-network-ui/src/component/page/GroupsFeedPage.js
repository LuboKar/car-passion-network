import React from "react";
import "./GroupsFeedPage.css";
import Groups from "../group/Groups";
import { getId } from "../service/TokenService";

export default function GroupsFeedPage() {
  const currentUserId = getId();

  return (
    <div className="groups-feed-page-container">
      <div className="groups-feed-page-groups">
        <Groups userId={currentUserId} />
      </div>
    </div>
  );
}
