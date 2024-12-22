import React, { useState, useEffect } from "react";
import "./Profile.css";
import { getId } from "../../service/TokenService";
import { getUser } from "../../service/UserService";
import { useParams } from "react-router-dom";
import UserProfilePicture from "./UserProfilePicture";
import UserName from "./UserName";
import ProfileMenu from "./ProfileMenu";

export default function Profile() {
  const { id } = useParams();
  const currentUserId = getId();
  const [user, setUser] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = async () => {
    const response = await getUser(id);

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
  }, [id]);

  return (
    <div className="profile-container">
      {!loadingUser && <UserProfilePicture user={user} />}

      {!loadingUser && <UserName user={user} />}

      {currentUserId !== user.id && !loadingUser && (
        <ProfileMenu user={user} setUser={setUser} />
      )}
    </div>
  );
}
