const saveProfilePictureUrl = (picture) => {
  localStorage.setItem("profilePicture", picture);
};

const getProfilePictureUrl = () => {
  const profilePicture = localStorage.getItem("profilePicture");
  return profilePicture === "null" ? null : profilePicture;
};

const deleteProfilePictureUrl = () => {
  localStorage.removeItem("profilePicture");
};

export { saveProfilePictureUrl, getProfilePictureUrl, deleteProfilePictureUrl };
