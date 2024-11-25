import React from "react";
import "./Group.css";
import GroupProfilePicture from "./GroupProfilePicture";
import useNavigation from "../service/NavigateService";

export default function Group({ key, group }) {
  const { navigateToGroupPage } = useNavigation();
  return (
    <div className="group-container" key={key}>
      <div
        className="group-profile-picture"
        onClick={() => navigateToGroupPage(group.id)}
      >
        <GroupProfilePicture />
      </div>

      <label
        className="group-name-label"
        onClick={() => navigateToGroupPage(group.id)}
      >
        {group.name}
      </label>
    </div>
  );
}
