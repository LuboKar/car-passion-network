import React, { useState, createContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGroupsByAdmin } from "../service/GroupService";
import { getParticipatingGroups } from "../service/GroupService";
import { getOtherGroups } from "../service/GroupService";

export const ProfileGroupsContext = createContext();

export const ProfileGroupsProvider = ({ children }) => {
  const { id } = useParams();
  const [userAdminGroups, setUserAdminGroups] = useState([]);
  const [loadingAdminGroups, setLoadingAdminGroups] = useState(true);
  const [participatingGroups, setParticipatingGroups] = useState([]);
  const [loadingParticipatingGroups, setLoadingParticipatingGroups] =
    useState(true);
  const [otherGroups, setOtherGroups] = useState([]);
  const [loadingOtherGroups, setLoadingOtherGroups] = useState(true);

  const fetchAdminGroups = async () => {
    const response = await getGroupsByAdmin(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const groupData = await response.json();
    setUserAdminGroups(groupData);
    setLoadingAdminGroups(false);
  };

  const fetchParticipatingGroups = async () => {
    const response = await getParticipatingGroups(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const groupData = await response.json();
    setParticipatingGroups(groupData);
    setLoadingParticipatingGroups(false);
  };

  const fetchOtherGroups = async () => {
    const response = await getOtherGroups(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const groupData = await response.json();
    setOtherGroups(groupData);
    setLoadingOtherGroups(false);
  };

  useEffect(() => {
    fetchAdminGroups();
    fetchParticipatingGroups();
    fetchOtherGroups();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <ProfileGroupsContext.Provider
      value={{
        userAdminGroups,
        setUserAdminGroups,
        loadingAdminGroups,
        participatingGroups,
        setParticipatingGroups,
        loadingParticipatingGroups,
        otherGroups,
        setOtherGroups,
        loadingOtherGroups,
      }}
    >
      {children}
    </ProfileGroupsContext.Provider>
  );
};
