import React from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import useSettingsButtons from "../button/SettingsButtons";
import DeleteAccount from "../pageUtils/user/DeleteAccount";
import { getId } from "../service/TokenService";

export default function SettingsDeletePage() {
  const { currentUserId } = getId();
  const { topSettingsButtons, bottomSettingsButtons } = useSettingsButtons();
  bottomSettingsButtons[0].isVisible = true;

  return (
    <div className="settings-delete-page-container">
      <Navbar />

      <VerticalNavbar
        topButtons={topSettingsButtons}
        bottomButtons={bottomSettingsButtons}
      />
      <RightVerticalNabvar />

      <DeleteAccount userId={currentUserId} />
    </div>
  );
}
