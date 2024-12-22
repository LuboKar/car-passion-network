import React, { useContext } from "react";
import Friends from "../pageUtils/friends/Friends";
import { ProfileFriendsContext } from "../context/ProfileFriendsProvider";

export default function ProfileFriendsPage() {
  const { loadingFriends } = useContext(ProfileFriendsContext);

  return (
    <div className="profile-friends-page-conteiner">
      {!loadingFriends && <Friends />}
    </div>
  );
}
