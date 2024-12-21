import React from "react";
import Navbar from "./Navbar";
import { Outlet, useParams } from "react-router-dom";
import useButtons from "../../button/ProfileButtons";
import VerticalNavbar from "./VerticalNavbar";
import { useLocation } from "react-router-dom";
import RightVerticalNabvar from "./RightVerticalNavbar";
import useDashboardButtons from "../../button/DashboardButtons";

export default function Layout() {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const { profileButtons } = useButtons(id, currentPath);
  const { dashboardButtons } = useDashboardButtons(currentPath);
  let topButtons = null;

  if (currentPath.startsWith(`/${id}`)) {
    topButtons = profileButtons;
  } else if (currentPath.startsWith(`/feed`)) {
    topButtons = dashboardButtons;
  }

  return (
    <div>
      <Navbar />

      <VerticalNavbar topButtons={topButtons} />
      <RightVerticalNabvar />

      <Outlet />
    </div>
  );
}
