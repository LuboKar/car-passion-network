import React from "react";
import Profile from "./Profile";
import { Outlet } from "react-router-dom";

export default function ProfileLayout() {
  return (
    <div>
      <Profile />

      <Outlet />
    </div>
  );
}
