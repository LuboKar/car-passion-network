import { isExpired } from "../service/TokenService";

export const isAuthenticated = () => {
  return isExpired();
};
