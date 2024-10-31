import React from "react";
import "./DashboardHeader.css";

export default function DashboardHeader() {
  return (
    <div className="dashboard-header-container">
      <label className="dashboard-header-label">
        Welcome to the Car Passion Network.
      </label>
      <label className="dashboard-header-label">This is your dashboard.</label>
      <label className="dashboard-header-label">There are no posts yet.</label>
      <label className="dashboard-header-label">
        Be the first to write a post!
      </label>
    </div>
  );
}
