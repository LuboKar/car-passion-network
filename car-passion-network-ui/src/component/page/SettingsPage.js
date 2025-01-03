import React, { useState, useEffect } from "react";
import EditProfile from "../pageUtils/user/EditProfile";
import { getUser } from "../service/UserService";
import { getId } from "../service/TokenService";

export default function SettingsPage() {
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = async () => {
    const response = await getUser(getId());

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const userData = await response.json();
    setUser(userData);
    setLoadingUser(false);
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="settings-page-container">
      {!loadingUser && <EditProfile user={user} setUser={setUser} />}
    </div>
  );
}
