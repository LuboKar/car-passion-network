import useNavigation from "../service/NavigateService";
import postIcon from "../../images/post.png";
import membersIcon from "../../images/friendIcon.png";

const useGroupButtons = (id, currentPath) => {
  const groupUrl = `/group/${id}`;
  const groupMembersUrl = `/group/${id}/members`;

  const { navigateToGroupPage, navigateToGroupMembersPage } = useNavigation();

  const toggleFeed = () => {
    if (currentPath !== groupUrl) {
      navigateToGroupPage(id);
    }
  };

  const toggleMembers = () => {
    if (currentPath !== groupMembersUrl) {
      navigateToGroupMembersPage(id);
    }
  };

  const groupButtons = [
    {
      label: "Posts",
      icon: postIcon,
      onClick: toggleFeed,
      isVisible: currentPath === groupUrl,
    },

    {
      label: "Members",
      icon: membersIcon,
      onClick: toggleMembers,
      isVisible: currentPath === groupMembersUrl,
    },
  ];
  return { groupButtons };
};

export default useGroupButtons;
