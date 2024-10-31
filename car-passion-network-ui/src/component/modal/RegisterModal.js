import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RegisterModal.css";
import { registerUser } from "../service/AuthenticationService.js";

export default function RegisterModal({ toggleModal }) {
  const [inputValues, setInputValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: null,
    error: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  const register = async (event) => {
    event.preventDefault();
    setErrors({});
    setSuccess("");

    const response = await registerUser(inputValues);

    if (!response.ok) {
      const responseBody = await response.json();

      setErrors((prevErrors) => ({
        ...prevErrors,
        ...responseBody,
      }));
      return;
    }

    const responseBody = await response.text();
    setSuccess(responseBody);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValues((inputValues) => ({
      ...inputValues,
      [name]: value,
    }));
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    setInputValues((inputValues) => ({
      ...inputValues,
      dateOfBirth: formattedDate,
    }));
  };

  return (
    <div className="register-modal-container">
      <form className="register-modal-form" onSubmit={register}>
        <label className="register-modal-success-label">{success}</label>

        <label className="register-modal-error-label">{errors.firstName}</label>
        <input
          className="register-modal-input"
          type="text"
          placeholder="First Name"
          name="firstName"
          value={inputValues.firstName}
          onChange={handleInputChange}
        />

        <label className="register-modal-error-label">{errors.lastName}</label>
        <input
          className="register-modal-input"
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={inputValues.lastName}
          onChange={handleInputChange}
        />

        <label className="register-modal-error-label">
          {errors.email || errors.error}
        </label>
        <input
          className="register-modal-input"
          type="email"
          placeholder="Email"
          name="email"
          value={inputValues.email}
          onChange={handleInputChange}
        />

        <label className="register-modal-error-label">{errors.password}</label>
        <input
          className="register-modal-input"
          type="password"
          placeholder="Password"
          name="password"
          value={inputValues.password}
          onChange={handleInputChange}
        />

        <label className="register-modal-error-label">
          {errors.dateOfBirth}
        </label>
        <div className="register-modal-date-container">
          <label className="register-modal-date-label">Date of Birth:</label>
          <DatePicker
            className="register-modal-date-input"
            id="dateOfBirth"
            selected={inputValues.dateOfBirth}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
          />
        </div>

        <label className="register-modal-error-label">{errors.gender}</label>
        <div className="register-modal-gender-container">
          <label className="register-modal-gender-label">Gender:</label>
          <input
            className="register-modal-radio"
            type="radio"
            id="male"
            name="gender"
            value="MALE"
            onChange={handleInputChange}
          />
          <label className="register-modal-radio" htmlFor="male">
            Male
          </label>

          <input
            className="register-modal-radio"
            type="radio"
            id="female"
            name="gender"
            value="FEMALE"
            onChange={handleInputChange}
          />
          <label className="register-modal-radio" htmlFor="female">
            Female
          </label>
        </div>

        <button className="register-modal-button" type="submit">
          Register
        </button>
      </form>

      <label className="register-modal-signIn-label">
        Already have an account?
      </label>
      <span className="register-modal-signIn-button" onClick={toggleModal}>
        Sign In
      </span>
    </div>
  );
}
