import React, { createContext, useState, useEffect } from "react";
import { getAllGroupMembers } from "../service/UserService";
import { removeMember } from "../service/GroupService";
import { useParams } from "react-router-dom";

export const GroupMembersContext = createContext();

export const GroupMembersProvider = ({ children }) => {
  const { id } = useParams();
  const [groupMembers, setGroupMembers] = useState([]);
  const [loadingGroupMembers, setLoadingGroupMembers] = useState(true);

  const fetchGroupMembers = async () => {
    const response = await getAllGroupMembers(id);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const membersData = await response.json();
    setGroupMembers(membersData);
    setLoadingGroupMembers(false);
  };

  const handleRemoveMember = async (groupId, memberId, index) => {
    const response = await removeMember(groupId, memberId);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    setGroupMembers((prevGroupMembers) => [
      ...prevGroupMembers.slice(0, index),
      ...prevGroupMembers.slice(index + 1),
    ]);
  };

  useEffect(() => {
    fetchGroupMembers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <GroupMembersContext.Provider
      value={{
        groupMembers,
        setGroupMembers,
        loadingGroupMembers,
        handleRemoveMember,
      }}
    >
      {children}
    </GroupMembersContext.Provider>
  );
};
