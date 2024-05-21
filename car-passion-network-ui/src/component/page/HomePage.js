import React from "react";
import RegisterModal from "../modal/RegisterModal";
import "./HomePage.css";
import HomePageHeader from "../pageUtils/HomePageHeader";

export default function HomePage() {
  return (
    <div className="homepage">
      <HomePageHeader />
      <RegisterModal />
    </div>
  );
}
