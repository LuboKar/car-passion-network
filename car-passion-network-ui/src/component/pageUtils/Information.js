import React from "react";
import "./Information.css";
import nameIcon from "../../images/name.png";
import dateOfBirth from "../../images/dateOfBirth.png";
import email from "../../images/email.png";
import gender from "../../images/gender.png";
import creationDate from "../../images/creationDate.png";

export default function Information({ user }) {
  return (
    <div className="information-container">
      <div className="header-container">
        <div>
          <img src={nameIcon} alt="icon" className="information-icons" />
          <label className="information-header">Full name:</label>
        </div>
        <label className="information-content">
          {user.firstName} {user.lastName}
        </label>
      </div>
      <div className="header-container">
        <div>
          <img src={dateOfBirth} alt="icon" className="information-icons" />
          <label className="information-header">Date of birth:</label>
        </div>
        <label className="information-content">{user.dateOfBirth}</label>
      </div>
      <div className="header-container">
        <div>
          <img src={email} alt="icon" className="information-icons" />
          <label className="information-header">Email:</label>
        </div>
        <label className="information-content">{user.email}</label>
      </div>
      <div className="header-container">
        <div>
          <img src={gender} alt="icon" className="information-icons" />
          <label className="information-header">Gender:</label>
        </div>
        <label className="information-content">{user.gender}</label>
      </div>
      <div className="header-container">
        <div>
          <img src={creationDate} alt="icon" className="information-icons" />
          <label className="information-header">Created at:</label>
        </div>
        <label className="information-content">{user.createdDate}</label>
      </div>
    </div>
  );
}
