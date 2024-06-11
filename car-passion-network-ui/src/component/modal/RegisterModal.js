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
    <div className="form-container">
      <form className="register-form" onSubmit={register}>
        <label className="form-success">{success}</label>
        <label className="error-label">{errors.firstName}</label>

        <input
          className="form-field"
          type="text"
          placeholder="First Name"
          name="firstName"
          value={inputValues.firstName}
          onChange={handleInputChange}
        />
        <br />
        <label className="error-label">{errors.lastName}</label>
        <input
          className="form-field"
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={inputValues.lastName}
          onChange={handleInputChange}
        />
        <br />
        <label className="error-label">{errors.email || errors.error}</label>
        <input
          className="form-field"
          type="email"
          placeholder="Email"
          name="email"
          value={inputValues.email}
          onChange={handleInputChange}
        />
        <br />
        <label className="error-label">{errors.password}</label>
        <input
          className="form-field"
          type="password"
          placeholder="Password"
          name="password"
          value={inputValues.password}
          onChange={handleInputChange}
        />
        <br />
        <label className="error-label">{errors.dateOfBirth}</label>
        <div>
          <label className="form-date-label" htmlFor="dateOfBirth">
            Date of Birth:
          </label>
          <br />
          <DatePicker
            className="form-date"
            id="dateOfBirth"
            selected={inputValues.dateOfBirth}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
          />
        </div>
        <br />
        <label className="error-label">{errors.gender}</label>
        <div className="form-gender">
          <label className="form-gender-text">Gender:</label>
          <input
            className="form-radio"
            type="radio"
            id="male"
            name="gender"
            value="MALE"
            onChange={handleInputChange}
          />
          <label className="form-radio" htmlFor="male">
            Male
          </label>
          <input
            className="form-radio"
            type="radio"
            id="female"
            name="gender"
            value="FEMALE"
            onChange={handleInputChange}
          />
          <label className="form-radio" htmlFor="female">
            Female
          </label>
        </div>
        <button className="form-button" type="submit">
          Register
        </button>
        <br />
      </form>
      <label>Already have an account? </label>
      <span className="signIn-button" onClick={toggleModal}>
        Sign In
      </span>
    </div>
  );
}
