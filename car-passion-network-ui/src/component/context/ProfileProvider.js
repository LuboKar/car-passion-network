import React, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../service/UserService";
import { addFriend } from "../service/UserService";
import { removeFriend } from "../service/UserService";

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { id } = useParams();
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

  const handleAddFriend = async () => {
    const response = await addFriend(user.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const friendUser = await response.json();

    setUser(friendUser);
  };

  const handleRemoveFriend = async () => {
    const response = await removeFriend(user.id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const friendUser = await response.json();

    setUser(friendUser);
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <ProfileContext.Provider
      value={{
        user,
        setUser,
        loadingUser,
        handleAddFriend,
        handleRemoveFriend,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
