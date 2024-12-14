import postIcon from "../../images/post.png";
import infoIcon from "../../images/info.png";
import friendIcon from "../../images/friendIcon.png";
import groupsIcon from "../../images/groups.png";
import useNavigation from "../service/NavigateService";

const useButtons = (id) => {
  const {
    navigateToProfile,
    navigateToProfileFriendsPage,
    navigateToProfileInformationPage,
    navigateToProfileGroupPage,
  } = useNavigation();

  const togglePosts = () => {
    navigateToProfile(id);
  };

  const toggleInformation = () => {
    navigateToProfileInformationPage(id);
  };

  const toggleFriends = () => {
    navigateToProfileFriendsPage(id);
  };

  const toggleGroups = () => {
    navigateToProfileGroupPage(id);
  };

  const profileButtons = [
    {
      label: "Posts",
      icon: postIcon,
      onClick: togglePosts,
    },
    {
      label: "Information",
      icon: infoIcon,
      onClick: toggleInformation,
    },
    {
      label: "Friends",
      icon: friendIcon,
      onClick: toggleFriends,
    },
    {
      label: "Groups",
      icon: groupsIcon,
      onClick: toggleGroups,
    },
  ];
  return { profileButtons };
};

export default useButtons;
