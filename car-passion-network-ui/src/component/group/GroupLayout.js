import React from "react";
import GroupProfile from "./GroupProfile";
import { Outlet } from "react-router-dom";

export default function GroupLayout() {
  return (
    <div>
      <GroupProfile />

      <Outlet />
    </div>
  );
}
