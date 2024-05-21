import React from "react";
import { useState } from "react";
import "./LoginModal.css";
import { useNavigate } from "react-router-dom";

export default function LoginModal({ toggleModal }) {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const loginUser = async (event) => {
    event.preventDefault();
    setErrors({});
    try {
      const response = await fetch(
        "http://localhost:8080/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        const responseBody = await response.json();
        setErrors((prevErrors) => ({
          ...prevErrors,
          ...responseBody,
        }));
        return;
      }

      const data = await response.json();
      const token = data.token;

      localStorage.setItem("jwtToken", token);

      console.log("Data sent successfully");

      navigate("/dashboard");
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  const handleInputChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };
  return (
    <div className="form-container-login">
      <form className="login-form" onSubmit={loginUser}>
        <label className="error-label-login">
          {errors.email || errors.error}
        </label>
        <input
          className="form-field-login"
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
        />
        <br />
        <label className="error-label-login">{errors.password}</label>
        <input
          className="form-field-login"
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
        />
        <br />
        <button className="form-button-login" type="submit">
          Login
        </button>
        <br />
      </form>
      <p>
        Don't have an account?
        <span className="signUp-button" onClick={toggleModal}>
          {" "}
          Sign Up
        </span>
      </p>
    </div>
  );
}
