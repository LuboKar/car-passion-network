import React from "react";
import "./InformationData.css";

export default function InformationData({ icon, header, content }) {
  return (
    <div className="information-data-container">
      <div>
        <img src={icon} alt="icon" className="information-data-icon" />
        <label className="information-data-header">{header}</label>
      </div>
      <label className="information-data-content">{content}</label>
    </div>
  );
}
