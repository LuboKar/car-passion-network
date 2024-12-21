import postIcon from "../../images/post.png";
import infoIcon from "../../images/info.png";
import friendIcon from "../../images/friendIcon.png";
import groupsIcon from "../../images/groups.png";
import useNavigation from "../service/NavigateService";

const useButtons = (id, currentPath) => {
  const postsUrl = `/${id}`;
  const informationUrl = `/${id}/information`;
  const friendsUrl = `/${id}/friends`;
  const groupsUrl = `/${id}/groups`;

  const {
    navigateToProfile,
    navigateToProfileFriendsPage,
    navigateToProfileInformationPage,
    navigateToProfileGroupPage,
  } = useNavigation();

  const togglePosts = () => {
    if (postsUrl !== currentPath) {
      navigateToProfile(id);
    }
  };

  const toggleInformation = () => {
    if (informationUrl !== currentPath) {
      navigateToProfileInformationPage(id);
    }
  };

  const toggleFriends = () => {
    if (friendsUrl !== currentPath) {
      navigateToProfileFriendsPage(id);
    }
  };

  const toggleGroups = () => {
    if (groupsUrl !== currentPath) {
      navigateToProfileGroupPage(id);
    }
  };

  const profileButtons = [
    {
      label: "Posts",
      icon: postIcon,
      onClick: togglePosts,
      isVisible: currentPath === postsUrl,
    },
    {
      label: "Information",
      icon: infoIcon,
      onClick: toggleInformation,
      isVisible: currentPath === informationUrl,
    },
    {
      label: "Friends",
      icon: friendIcon,
      onClick: toggleFriends,
      isVisible: currentPath === friendsUrl,
    },
    {
      label: "Groups",
      icon: groupsIcon,
      onClick: toggleGroups,
      isVisible: currentPath === groupsUrl,
    },
  ];
  return { profileButtons };
};

export default useButtons;
