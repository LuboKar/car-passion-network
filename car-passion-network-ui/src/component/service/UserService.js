import { getToken } from "./TokenService";
import { checkAuthentication } from "../Authentication/Authentication";

const getUser = async (id) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/users/${id}`, {
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

const uploadProfilePicture = async (formData) => {
  checkAuthentication();

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
    console.error("Error uploading profile picture:", error);
  }
};

const editUser = async (editValues) => {
  checkAuthentication();

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
    console.error("Error editing user:", error);
  }
};

const addFriend = async (userId) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8080/users/friends/${userId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error adding friend:", error);
  }
};

const removeFriend = async (userId) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8080/users/friends/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error removing friend:", error);
  }
};

const getFriends = async (userId) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8080/users/friends/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching friends:", error);
  }
};

const findUsersByFullNameStartsWith = async (term) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/users/findBy/${term}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error fetching user by full name starts with...:", error);
  }
};

const deleteUser = async (userId) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(`http://localhost:8080/users/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

const getAllGroupMembers = async (groupId) => {
  checkAuthentication();

  try {
    const token = getToken();
    const response = await fetch(
      `http://localhost:8080/users/group/${groupId}/members`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error fetching all group members:", error);
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
