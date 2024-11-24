import { getToken } from "./TokenService";

const createGroup = async (groupName) => {
  try {
    const token = getToken();
    const response = await fetch("http://localhost:8080/group/" + groupName, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error sending data to backend:", error);
  }
};

export { createGroup };
