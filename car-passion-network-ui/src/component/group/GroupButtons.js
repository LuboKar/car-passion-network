import React from "react";
import "./GroupButtons.css";
import GroupButton from "./GroupButton";

export default function GroupButtons({ groupButtons }) {
  return (
    <div className="group-buttons-container">
      {groupButtons.map((button, index) => (
        <div className="group-buttons-button" key={index}>
          <GroupButton button={button} />
        </div>
      ))}
    </div>
  );
}
