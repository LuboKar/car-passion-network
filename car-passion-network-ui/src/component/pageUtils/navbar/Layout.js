import React from "react";
import Navbar from "./Navbar";
import { Outlet, useParams } from "react-router-dom";
import useButtons from "../../button/ProfileButtons";
import VerticalNavbar from "./VerticalNavbar";
import { useLocation } from "react-router-dom";
import RightVerticalNabvar from "./RightVerticalNavbar";

export default function Layout() {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const { profileButtons } = useButtons(id, currentPath);

  return (
    <div>
      <Navbar />

      <VerticalNavbar topButtons={profileButtons} />
      <RightVerticalNabvar />

      <Outlet />
    </div>
  );
}
