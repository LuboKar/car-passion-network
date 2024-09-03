import { jwtDecode } from "jwt-decode";

const getToken = () => {
  return localStorage.getItem("jwtToken");
};

const getId = () => {
  const token = getToken();

  if (token) {
    const decodedToken = jwtDecode(token);
    const id = decodedToken.userId;
    return id;
  }

  return null;
};

const isExpired = () => {
  const token = getToken();

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  }

  return false;
};

export { getId, isExpired, getToken };
