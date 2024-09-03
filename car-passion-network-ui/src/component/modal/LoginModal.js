import React, { useState } from "react";
import "./LoginModal.css";
import { loginUser } from "../service/AuthenticationService";
import { saveToken } from "../service/TokenService";
import useNavigation from "../service/NavigateService";

export default function LoginModal({ toggleModal }) {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const { navigateToDashboardPage } = useNavigation();

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

    navigateToDashboardPage();
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
    <div className="form-container-login">
      <form className="login-form" onSubmit={login}>
        <label className="error-label-login">
          {errors.email || errors.error}
        </label>
        <input
          className="form-field-login"
          type="email"
          placeholder="Email"
          name="email"
          value={inputValues.email}
          onChange={handleInputChange}
        />
        <br />
        <label className="error-label-login">{errors.password}</label>
        <input
          className="form-field-login"
          type="password"
          placeholder="Password"
          name="password"
          value={inputValues.password}
          onChange={handleInputChange}
        />
        <br />
        <button className="form-button-login" type="submit">
          Login
        </button>
        <br />
      </form>
      <label>Don't have an account? </label>
      <span className="signUp-button" onClick={toggleModal}>
        Sign Up
      </span>
    </div>
  );
}
