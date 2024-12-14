import React, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../service/UserService";

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

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <ProfileContext.Provider value={{ user, loadingUser }}>
      {children}
    </ProfileContext.Provider>
  );
};
