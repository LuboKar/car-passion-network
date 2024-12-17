import { getToken } from "./TokenService";

const getUser = async (id) => {
  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const uploadProfilePicture = async (formData) => {
  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/users/upload`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const editUser = async (editValues) => {
  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/users/edit`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editValues),
    });

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const addFriend = async (userId) => {
  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8080/users/friends/${userId}`,
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
    console.error("Error fetching user:", error);
  }
};

const removeFriend = async (userId) => {
  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8080/users/friends/${userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const getFriends = async (userId) => {
  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8080/users/friends/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const findUsersByFullNameStartsWith = async (term) => {
  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/users/findBy/${term}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const deleteUser = async (userId) => {
  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

const getAllGroupMembers = async (groupId) => {
  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8080/users/group/${groupId}/members`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export {
  getUser,
  uploadProfilePicture,
  editUser,
  addFriend,
  removeFriend,
  getFriends,
  findUsersByFullNameStartsWith,
  deleteUser,
  getAllGroupMembers,
};
