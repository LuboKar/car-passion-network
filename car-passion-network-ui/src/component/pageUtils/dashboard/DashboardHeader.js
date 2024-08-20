import React from "react";
import "./DashboardHeader.css";

export default function DashboardHeader() {
  return (
    <div className="dashboard-header-container">
      <label className="dashboard-header-text">
        Welcome to the Car Passion Network.
      </label>
      <label className="dashboard-header-text">This is your dashboard.</label>
      <label className="dashboard-header-text">There are no posts yet.</label>
      <label className="dashboard-header-text">
        Be the first to write a post!
      </label>
    </div>
  );
}
