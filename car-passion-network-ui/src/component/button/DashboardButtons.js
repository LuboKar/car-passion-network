import { useState } from "react";
import feedIcon from "../../images/feed.png";
import groupIcon from "../../images/groups.png";

const useDashboardButtons = () => {
  const [viewFeed, setViewFeed] = useState(true);
  const [viewGroups, setViewGroups] = useState(false);

  const disbleAllButtons = () => {
    setViewFeed(false);
    setViewGroups(false);
  };

  const toggleFeed = () => {
    disbleAllButtons();
    setViewFeed(true);
  };

  const toggleGroups = () => {
    disbleAllButtons();
    setViewGroups(true);
  };

  const dashboardButtons = [
    {
      label: "Feed",
      icon: feedIcon,
      onClick: toggleFeed,
      isVisible: viewFeed,
    },
    {
      label: "Groups",
      icon: groupIcon,
      onClick: toggleGroups,
      isVisible: viewGroups,
    },
  ];
  return { dashboardButtons, viewFeed, viewGroups };
};

export default useDashboardButtons;
