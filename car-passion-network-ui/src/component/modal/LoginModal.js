import React, { useState } from "react";
import "./LoginModal.css";
import { loginUser } from "../service/AuthenticationService";
import { saveToken } from "../service/TokenService";
import useNavigation from "../service/NavigateService";
import { saveProfilePictureUrl } from "../service/profilePictureService";

export default function LoginModal({ toggleModal }) {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { navigateToFeedPage } = useNavigation();

  const login = async (event) => {
    event.preventDefault();
    setErrors({});

    const response = await loginUser(inputValues);

    if (!response.ok) {
      const responseBody = await response.json();

      setErrors((prevErrors) => ({
        ...prevErrors,
        ...responseBody,
      }));

      return;
    }

    const data = await response.json();
    saveToken(data.token);
    saveProfilePictureUrl(data.profilePicture);

    navigateToFeedPage();
  };

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setInputValues((inputValues) => ({
      ...inputValues,
      [name]: value,
    }));
  };

  return (
    <div className="login-modal-container">
      <form className="login-modal-form" onSubmit={login}>
        <label className="login-modal-error-label">
          {errors.email || errors.error}
        </label>
        <input
          className="login-modal-input"
          type="email"
          placeholder="Email"
          name="email"
          value={inputValues.email}
          onChange={handleInputChange}
        />

        <label className="login-modal-error-label">{errors.password}</label>
        <input
          className="login-modal-input"
          type="password"
          placeholder="Password"
          name="password"
          value={inputValues.password}
          onChange={handleInputChange}
        />

        <button className="login-modal-button" type="submit">
          Login
        </button>
      </form>

      <label>Don't have an account? </label>
      <span className="login-modal-signUp-button" onClick={toggleModal}>
        Sign Up
      </span>
    </div>
  );
}
