import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../Authentication/Authentication";

const useNavigation = () => {
  const navigate = useNavigate();

  const navigateToProfile = (id) => {
    if (isAuthenticated()) {
      navigate(`/${id}`);
    } else navigate("/");
  };

  const navigateToPostPage = (id) => {
    if (isAuthenticated()) {
      navigate(`/post/${id}`);
    } else navigate("/");
  };

  const navigateToFeedPage = () => {
    if (isAuthenticated()) {
      navigate(`/feed`);
    } else navigate("/");
  };

  const navigateToSettingsPage = () => {
    if (isAuthenticated()) {
      navigate(`/settings`);
    } else navigate("/");
  };

  const navigateToGroupPage = (id) => {
    if (isAuthenticated()) {
      navigate(`/group/${id}`);
    } else navigate("/");
  };

  const navigateToProfileGroupPage = (id) => {
    if (isAuthenticated()) {
      navigate(`/${id}/groups`);
    } else navigate("/");
  };

  const navigateToProfileFriendsPage = (id) => {
    if (isAuthenticated()) {
      navigate(`/${id}/friends`);
    } else navigate("/");
  };

  const navigateToProfileInformationPage = (id) => {
    if (isAuthenticated()) {
      navigate(`/${id}/information`);
    } else navigate("/");
  };

  const navigateToGroupsFeedPage = () => {
    if (isAuthenticated()) {
      navigate(`/groups/feed`);
    } else navigate("/");
  };

  return {
    navigateToProfile,
    navigateToPostPage,
    navigateToFeedPage,
    navigateToSettingsPage,
    navigateToGroupPage,
    navigateToProfileGroupPage,
    navigateToProfileFriendsPage,
    navigateToProfileInformationPage,
    navigateToGroupsFeedPage,
  };
};

export default useNavigation;
