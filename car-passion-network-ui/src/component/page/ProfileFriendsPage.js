import React, { useState, useEffect, useContext } from "react";
import Navbar from "../pageUtils/navbar/Navbar";
import VerticalNavbar from "../pageUtils/navbar/VerticalNavbar";
import RightVerticalNabvar from "../pageUtils/navbar/RightVerticalNavbar";
import { useParams } from "react-router-dom";
import Profile from "../pageUtils/user/Profile";
import Friends from "../pageUtils/friends/Friends";
import FriendsHeader from "../pageUtils/friends/FriendsHeader";
import { getFriends } from "../service/UserService";
import useButtons from "../button/ProfileButtons";
import { ProfileContext } from "../context/ProfileProvider";

export default function ProfileFriendsPage() {
  const { id } = useParams();
  const { user, setUser, loadingUser } = useContext(ProfileContext);
  const [viewFriends] = useState(true);
  const [friends, setFriends] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);

  const { profileButtons } = useButtons(id);

  const fetchFriends = async () => {
    const response = await getFriends(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const friendsList = await response.json();
    setFriends(friendsList);
    setLoadingFriends(false);
  };

  useEffect(() => {
    fetchFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="profile-friends-page-conteiner">
      <Navbar />

      <VerticalNavbar topButtons={profileButtons} />
      <RightVerticalNabvar />

      {!loadingUser && <Profile user={user} setUser={setUser} />}

      {!loadingFriends && viewFriends && (
        <Friends friends={friends} setFriends={setFriends} userId={user.id} />
      )}
      {!loadingFriends && friends.length < 1 && viewFriends && (
        <FriendsHeader />
      )}
    </div>
  );
}
