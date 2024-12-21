import React from "react";
import "./VerticalNavbar.css";
import NavbarButtons from "./NavbarButtons";
import useNavbarButtons from "../../button/NavbarButtons";

export default function VerticalNavbar() {
  const { topButtons, bottomButtons } = useNavbarButtons();

  return (
    <div className="navbar-container">
      <div className="navbar-top-bottons">
        <NavbarButtons buttons={topButtons} />
      </div>

      {bottomButtons && (
        <div className="navbar-bottom-buttons">
          <NavbarButtons buttons={bottomButtons} buttonColor="red" />
        </div>
      )}
    </div>
  );
}
