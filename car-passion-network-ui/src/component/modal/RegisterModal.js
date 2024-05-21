import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./RegisterModal.css";

export default function RegisterModal({ toggleModal }) {
  const [values, setValues] = useState({
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

  const registerUser = async (event) => {
    event.preventDefault();
    setErrors({});
    setSuccess("");
    try {
      const response = await fetch(
        "http://localhost:8080/authentication/register",
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

      const responseBody = await response.text();
      setSuccess(responseBody);
      console.log("Data sent successfully");
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

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (date) => {
    const formattedDate = formatDate(date);
    setValues((values) => ({
      ...values,
      dateOfBirth: formattedDate,
    }));
  };

  const handleGenderChange = (event) => {
    const { name, value } = event.target;
    setValues((values) => ({
      ...values,
      [name]: value,
    }));
  };

  return (
    <div className="form-container">
      <form className="register-form" onSubmit={registerUser}>
        <label className="form-success">{success}</label>
        <label className="error-label">{errors.firstName}</label>

        <input
          className="form-field"
          type="text"
          placeholder="First Name"
          name="firstName"
          value={values.firstName}
          onChange={handleInputChange}
        />
        <br />
        <label className="error-label">{errors.lastName}</label>
        <input
          className="form-field"
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={values.lastName}
          onChange={handleInputChange}
        />
        <br />
        <label className="error-label">{errors.email || errors.error}</label>
        <input
          className="form-field"
          type="email"
          placeholder="Email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
        />
        <br />
        <label className="error-label">{errors.password}</label>
        <input
          className="form-field"
          type="password"
          placeholder="Password"
          name="password"
          value={values.password}
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
            selected={values.dateOfBirth}
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
            onChange={handleGenderChange}
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
            onChange={handleGenderChange}
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
      <p>
        Already have an account?
        <span className="signIn-button" onClick={toggleModal}>
          {" "}
          Sign In
        </span>
      </p>
    </div>
  );
}
