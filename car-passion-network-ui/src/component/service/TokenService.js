import { jwtDecode } from "jwt-decode";

const getId = () => {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    const decodedToken = jwtDecode(token);
    const id = decodedToken.userId;
    return id;
  }
  return null;
};

export { getId };
