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

  return { navigateToProfile, navigateToPostPage };
};

export default useNavigation;
