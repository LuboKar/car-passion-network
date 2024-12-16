import React, { useState } from "react";
import "./DeleteAccount.css";
import { deleteUser } from "../../service/UserService";
import useNavigation from "../../service/NavigateService";
import { deleteToken } from "../../service/TokenService";
import { deleteProfilePictureUrl } from "../../service/profilePictureService";

export default function DeleteAccount({ userId }) {
  const [option, setOption] = useState("");

  const { navigateToFeedPage, navigateToProfile } = useNavigation();

  const handleInputChange = (event) => {
    const { value } = event.target;
    setOption(value);
  };

  const handleDeleteAccount = async (event) => {
    event.preventDefault();

    if (option === "No") {
      navigateToProfile(userId);
      return;
    }

    const response = await deleteUser(userId);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    deleteToken();
    deleteProfilePictureUrl();
    navigateToFeedPage();
  };

  return (
    <div className="delete-account-container">
      <label className="delete-account-label">Are you sure?</label>

      <form className="delete-account-form" onSubmit={handleDeleteAccount}>
        <div className="dalete-account-option">
          <input
            className="delete-account-radio-yes"
            type="radio"
            id="yes"
            name="option"
            value="Yes"
            onChange={handleInputChange}
          />
          <label className="delete-account-option-label" htmlFor="yes">
            Yes
          </label>

          <input
            className="delete-account-radio-no"
            type="radio"
            id="no"
            name="option"
            value="No"
            onChange={handleInputChange}
          />
          <label className="delete-account-option-label" htmlFor="no">
            No
          </label>
        </div>

        <button className="delete-account-button" type="submit">
          Delete Account
        </button>
      </form>
    </div>
  );
}
