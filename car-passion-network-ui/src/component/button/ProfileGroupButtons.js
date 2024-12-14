import { useState } from "react";

const useProfileGroupButtons = (id) => {
  const [viewCreated, setViewCreated] = useState(true);
  const [viewParticipating, setViewParticipating] = useState(false);
  const [viewOthers, setViewOthers] = useState(false);

  const disableAllButtons = () => {
    setViewCreated(false);
    setViewParticipating(false);
    setViewOthers(false);
  };

  const toggleCreated = () => {
    disableAllButtons();
    setViewCreated(true);
  };

  const toggleParticipating = () => {
    disableAllButtons();
    setViewParticipating(true);
  };

  const toggleOthers = () => {
    disableAllButtons();
    setViewOthers(true);
  };

  const profileGroupButtons = [
    {
      label: "Created",
      onClick: toggleCreated,
      isVisible: viewCreated,
    },
    {
      label: "Participating",
      onClick: toggleParticipating,
      isVisible: viewParticipating,
    },
    {
      label: "Other",
      onClick: toggleOthers,
      isVisible: viewOthers,
    },
  ];
  return { profileGroupButtons, viewCreated, viewParticipating, viewOthers };
};

export default useProfileGroupButtons;
