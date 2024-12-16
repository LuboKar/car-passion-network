import feedIcon from "../../images/feed.png";
import groupIcon from "../../images/groups.png";
import useNavigation from "../service/NavigateService";

const useDashboardButtons = () => {
  const { navigateToDashboardPage, navigateToGroupsFeedPage } = useNavigation();

  const toggleFeed = () => {
    navigateToDashboardPage();
  };

  const toggleGroups = () => {
    navigateToGroupsFeedPage();
  };

  const dashboardButtons = [
    {
      label: "Feed",
      icon: feedIcon,
      onClick: toggleFeed,
      isVisible: false,
    },
    {
      label: "Groups",
      icon: groupIcon,
      onClick: toggleGroups,
      isVisible: false,
    },
  ];
  return { dashboardButtons };
};

export default useDashboardButtons;
