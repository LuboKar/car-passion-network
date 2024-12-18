import { isExpired } from "../service/TokenService";

export const isAuthenticated = () => {
  return isExpired();
};

export const checkAuthentication = () => {
  if (!isAuthenticated()) {
    window.location.reload();
  }
};
