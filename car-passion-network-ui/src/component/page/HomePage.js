import React from "react";
import RegisterModal from "../modal/RegisterModal";
import "./HomePage.css";
import HomePageHeader from "../pageUtils/home/HomePageHeader";
import LoginModal from "../modal/LoginModal";
import { useState } from "react";

export default function HomePage() {
  const [registerModal, setRegisterModalOpen] = useState(true);

  return (
    <div className="homepage-container">
      <HomePageHeader />
      {registerModal ? (
        <RegisterModal toggleModal={() => setRegisterModalOpen(false)} />
      ) : (
        <LoginModal toggleModal={() => setRegisterModalOpen(true)} />
      )}
    </div>
  );
}
