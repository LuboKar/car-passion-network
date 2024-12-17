import React, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getGroup } from "../service/GroupService";

export const GroupProfileContext = createContext();

export const GroupProfileProvider = ({ children }) => {
  const { id } = useParams();
  const [group, setGroup] = useState({});
  const [loadingGroup, setLoadingGroup] = useState(true);

  const fetchGroup = async () => {
    const response = await getGroup(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const groupData = await response.json();
    setGroup(groupData);
    setLoadingGroup(false);
  };

  useEffect(() => {
    fetchGroup();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <GroupProfileContext.Provider value={{ group, setGroup, loadingGroup }}>
      {children}
    </GroupProfileContext.Provider>
  );
};
