import useButtons from "../button/ProfileButtons";
import { useLocation, useParams } from "react-router-dom";
import useDashboardButtons from "../button/DashboardButtons";
import useGroupButtons from "../button/GroupButtons";
import useSettingsButtons from "../button/SettingsButtons";

const useNavbarButtons = () => {
  const { id } = useParams();
  const location = useLocation();
  const currentPath = location.pathname;
  const { profileButtons } = useButtons(id, currentPath);
  const { dashboardButtons } = useDashboardButtons(currentPath);
  const { groupButtons } = useGroupButtons(id, currentPath);
  const { topSettingsButtons, bottomSettingsButtons } =
    useSettingsButtons(currentPath);
  let topButtons = null;
  let bottomButtons = null;

  if (currentPath.startsWith(`/${id}`)) {
    topButtons = profileButtons;
  } else if (currentPath.startsWith(`/feed`)) {
    topButtons = dashboardButtons;
  } else if (currentPath.startsWith(`/group`)) {
    topButtons = groupButtons;
  } else if (currentPath.startsWith(`/settings`)) {
    topButtons = topSettingsButtons;
    bottomButtons = bottomSettingsButtons;
  }

  return { topButtons, bottomButtons };
};

export default useNavbarButtons;
