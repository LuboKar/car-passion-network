import React from "react";
import "./VerticalNavbar.css";
import NavbarButtons from "./NavbarButtons";

export default function VerticalNavbar({ topButtons, bottomButtons }) {
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
