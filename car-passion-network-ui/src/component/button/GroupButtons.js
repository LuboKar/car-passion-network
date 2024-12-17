import useNavigation from "../service/NavigateService";
import postIcon from "../../images/post.png";
import membersIcon from "../../images/friendIcon.png";

const useGroupButtons = (id) => {
  const { navigateToGroupPage, navigateToGroupMembersPage } = useNavigation();

  const toggleFeed = () => {
    navigateToGroupPage(id);
  };

  const toggleMembers = () => {
    navigateToGroupMembersPage(id);
  };

  const groupButtons = [
    {
      label: "Posts",
      icon: postIcon,
      onClick: toggleFeed,
      isVisible: false,
    },

    {
      label: "Members",
      icon: membersIcon,
      onClick: toggleMembers,
      isVisible: false,
    },
  ];
  return { groupButtons };
};

export default useGroupButtons;
