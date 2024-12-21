import React from "react";
import Navbar from "./Navbar";
import { Outlet, useParams } from "react-router-dom";
import useButtons from "../../button/ProfileButtons";
import VerticalNavbar from "./VerticalNavbar";
import { useLocation } from "react-router-dom";
import RightVerticalNabvar from "./RightVerticalNavbar";
import useDashboardButtons from "../../button/DashboardButtons";
import useGroupButtons from "../../button/GroupButtons";
import useSettingsButtons from "../../button/SettingsButtons";

export default function Layout() {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const { profileButtons } = useButtons(id, currentPath);
  const { dashboardButtons } = useDashboardButtons(currentPath);
  const { groupButtons } = useGroupButtons(id, currentPath);
  const { topSettingsButtons, bottomSettingsButtons } =
    useSettingsButtons(currentPath);
  let topButtons = null;
  let bottomButtons = null;

  if (currentPath.startsWith(`/${id}`)) {
    topButtons = profileButtons;
  } else if (currentPath.startsWith(`/feed`)) {
    topButtons = dashboardButtons;
  } else if (currentPath.startsWith(`/group`)) {
    topButtons = groupButtons;
  } else if (currentPath.startsWith(`/settings`)) {
    topButtons = topSettingsButtons;
    bottomButtons = bottomSettingsButtons;
  }

  return (
    <div>
      <Navbar />

      <VerticalNavbar topButtons={topButtons} bottomButtons={bottomButtons} />
      <RightVerticalNabvar />

      <Outlet />
    </div>
  );
}
