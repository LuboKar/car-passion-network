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

export { getUser, uploadProfilePicture };
