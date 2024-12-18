import { getToken } from "./TokenService";
import { checkAuthentication } from "../Authentication/Authentication";

const createGroup = async (groupName) => {
  checkAuthentication();

  try {
    const token = getToken();
    const encodedGroupName = encodeURIComponent(groupName);
    const response = await fetch(
      `http://localhost:8080/group/${encodedGroupName}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating group:", error);
  }
};

const getGroup = async (id) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/group/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching group:", error);
  }
};

const getGroupsByAdmin = async (id) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/group/admin/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching groups by admin:", error);
  }
};

const getOtherGroups = async (id) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/group/other/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching other groups:", error);
  }
};

const getParticipatingGroups = async (id) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/group/user/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching participating groups:", error);
  }
};

const deleteGroup = async (id) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/group/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error deleting group:", error);
  }
};

const joinGroup = async (groupId) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8080/group/join/${groupId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error joining group:", error);
  }
};

const leaveGroup = async (groupId) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8080/group/leave/${groupId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error leaving group:", error);
  }
};

const removeMember = async (groupId, memberId) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8080/group/remove/${groupId}/${memberId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error removing memeber:", error);
  }
};

const uploadGroupPicture = async (formData, groupId) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8080/group/upload/${groupId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    return response;
  } catch (error) {
    console.error("Error uploading group picture:", error);
  }
};

export {
  createGroup,
  getGroup,
  getGroupsByAdmin,
  deleteGroup,
  getOtherGroups,
  joinGroup,
  getParticipatingGroups,
  leaveGroup,
  removeMember,
  uploadGroupPicture,
};
