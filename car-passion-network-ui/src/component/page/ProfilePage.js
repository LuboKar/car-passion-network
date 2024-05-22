import React from "react";
import Navbar from "../pageUtils/Navbar";
import VerticalNavbar from "../pageUtils/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/RightVerticalNavbar";
import Profile from "../pageUtils/Profile";

export default function ProfilePage() {
  return (
    <div className="test">
      <Navbar />
      <VerticalNavbar />
      <RightVerticalNabvar className="right-navbar" />
      <Profile />
    </div>
  );
}
