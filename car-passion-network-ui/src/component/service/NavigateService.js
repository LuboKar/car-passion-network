import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Authentication/Authentication";

const useNavigation = () => {
  const navigate = useNavigate();

  const navigateToProfile = (id) => {
    if (isAuthenticated()) {
      navigate(`/profile/${id}`);
    } else navigate("/");
  };

  const navigateToPostPage = (id) => {
    if (isAuthenticated()) {
      navigate(`/post/${id}`);
    } else navigate("/");
  };

  const navigateToDashboardPage = () => {
    if (isAuthenticated()) {
      navigate(`/dashboard`);
    } else navigate("/");
  };

  return { navigateToProfile, navigateToPostPage, navigateToDashboardPage };
};

export default useNavigation;
