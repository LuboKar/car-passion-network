import { getToken } from "./TokenService";

const createGroup = async (groupName) => {
  try {
    const token = getToken();
    const encodedGroupName = encodeURIComponent(groupName);
    const response = await fetch(
      `http://localhost:8080/group/${encodedGroupName}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error sending data to backend:", error);
  }
};

const getGroup = async (id) => {
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
    console.error("Error fetching user:", error);
  }
};

const getGroupsByAdmin = async (id) => {
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
    console.error("Error fetching user:", error);
  }
};

const getOtherGroups = async (id) => {
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
    console.error("Error fetching user:", error);
  }
};

const deleteGroup = async (id) => {
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
    console.error("Error fetching user:", error);
  }
};

const joinGroup = async (groupId) => {
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
    console.error("Error sending data to backend:", error);
  }
};

export {
  createGroup,
  getGroup,
  getGroupsByAdmin,
  deleteGroup,
  getOtherGroups,
  joinGroup,
};
