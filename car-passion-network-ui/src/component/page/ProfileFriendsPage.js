import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import Profile from "../pageUtils/user/Profile";
import Friends from "../pageUtils/friends/Friends";
import useButtons from "../button/ProfileButtons";
import { ProfileContext } from "../context/ProfileProvider";
import { ProfileFriendsContext } from "../context/ProfileFriendsProvider";

export default function ProfileFriendsPage() {
  const { id } = useParams();
  const { loadingUser } = useContext(ProfileContext);
  const { loadingFriends } = useContext(ProfileFriendsContext);

  const { profileButtons } = useButtons(id);
  profileButtons[2].isVisible = true;

  return (
    <div className="profile-friends-page-conteiner">
      {!loadingUser && <Profile />}

      {!loadingFriends && <Friends />}
    </div>
  );
}
