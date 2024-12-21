import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import VerticalNavbar from "./VerticalNavbar";
import RightVerticalNabvar from "./RightVerticalNavbar";

export default function Layout() {
  return (
    <div>
      <Navbar />

      <VerticalNavbar />
      <RightVerticalNabvar />

      <Outlet />
    </div>
  );
}
