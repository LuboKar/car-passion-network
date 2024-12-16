import React, { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFriends } from "../service/UserService";

export const ProfileFriendsContext = createContext();

export const ProfileFriendsProvider = ({ children }) => {
  const { id } = useParams();
  const [friends, setFriends] = useState([]);
  const [loadingFriends, setLoadingFriends] = useState(true);

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
    <ProfileFriendsContext.Provider
      value={{ friends, setFriends, loadingFriends }}
    >
      {children}
    </ProfileFriendsContext.Provider>
  );
};
