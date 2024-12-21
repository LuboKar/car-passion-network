import feedIcon from "../../images/feed.png";
import groupIcon from "../../images/groups.png";
import useNavigation from "../service/NavigateService";

const useDashboardButtons = (currentPath) => {
  const feedUrl = "/feed";
  const feedGroupsUrl = "/feed/groups";

  const { navigateToFeedPage, navigateToGroupsFeedPage } = useNavigation();

  const toggleFeed = () => {
    if (currentPath !== feedUrl) {
      navigateToFeedPage();
    }
  };

  const toggleGroups = () => {
    if (currentPath !== feedGroupsUrl) {
      navigateToGroupsFeedPage();
    }
  };

  const dashboardButtons = [
    {
      label: "Feed",
      icon: feedIcon,
      onClick: toggleFeed,
      isVisible: currentPath === feedUrl,
    },
    {
      label: "Groups",
      icon: groupIcon,
      onClick: toggleGroups,
      isVisible: currentPath === feedGroupsUrl,
    },
  ];
  return { dashboardButtons };
};

export default useDashboardButtons;
