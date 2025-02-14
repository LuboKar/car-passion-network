import React, { useState } from "react";
import DeleteAccount from "../pageUtils/user/DeleteAccount";
import { getId } from "../service/TokenService";

export default function SettingsDeletePage() {
  const [currentUserId] = useState(getId());

  return (
    <div className="settings-delete-page-container">
      <DeleteAccount userId={currentUserId} />
    </div>
  );
}
