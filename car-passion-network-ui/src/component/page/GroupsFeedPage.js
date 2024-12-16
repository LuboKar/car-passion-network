import React from "react";
import "./GroupsFeedPage.css";
import Navbar from "../pageUtils/navbar/Navbar";
import useDashboardButtons from "../button/DashboardButtons";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import Groups from "../group/Groups";
import { getId } from "../service/TokenService";

export default function GroupsFeedPage() {
  const currentUserId = getId();
  const { dashboardButtons } = useDashboardButtons();
  dashboardButtons[1].isVisible = true;

  return (
    <div className="groups-feed-page-container">
      <Navbar />

      <VerticalNavbar topButtons={dashboardButtons} />

      <div className="groups-feed-page-groups">
        <Groups userId={currentUserId} />
      </div>
    </div>
  );
}
