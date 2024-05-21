import React from "react";
import RegisterModal from "../modal/RegisterModal";
import "./HomePage.css";
import HomePageHeader from "../pageUtils/HomePageHeader";
import LoginModal from "../modal/LoginModal";
import { useState } from "react";

export default function HomePage() {
  const [registerModal, setRegisterModalOpen] = useState(true);
  const [loginModal, setLoginModalOpen] = useState(false);

  const toggleModal = () => {
    setRegisterModalOpen(!registerModal);
    setLoginModalOpen(!loginModal);
  };

  return (
    <div className="homepage">
      <HomePageHeader />
      {registerModal && <RegisterModal toggleModal={toggleModal} />}
      {loginModal && <LoginModal toggleModal={toggleModal} />}
    </div>
  );
}
