package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.carpassionnetwork.dto.request.LoginRequest;
import com.carpassionnetwork.dto.request.RegistrationRequest;
import com.carpassionnetwork.exception.ValidationException;
import java.util.Objects;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

public class AuthenticationControllerIT extends BaseIT {

  private RegistrationRequest registrationRequest;
  private LoginRequest loginRequest;

  @BeforeEach
  void setUp() {
    registrationRequest = createRegistrationRequest();
    loginRequest = createLoginRequest();
  }

  @Test
  void testRegisterSuccessfully() throws Exception {
    mockMvc
        .perform(
            post("/authentication/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(registrationRequest)))
        .andExpect(status().isOk())
        .andExpect(content().string(String.format(USER_CREATED_SUCCESSFULLY, EMAIL)));
  }

  @Test
  void testRegisterShouldThrowAlreadyUsedEmailException() throws Exception {
    register();

    mockMvc
        .perform(
            post("/authentication/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(registrationRequest)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()))
        .andExpect(
            result ->
                assertEquals(
                    "This email is already used!",
                    Objects.requireNonNull(result.getResolvedException()).getMessage()));
  }

  @Test
  void testRegisterShouldVerifyNullFields() throws Exception {
    registrationRequest = new RegistrationRequest();
    mockMvc
        .perform(
            post("/authentication/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(registrationRequest)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.firstName").value("First name must not be empty or null!"))
        .andExpect(jsonPath("$.lastName").value("Last name must not be empty or null!"))
        .andExpect(jsonPath("$.password").value("Password must not be empty or null!"))
        .andExpect(jsonPath("$.gender").value("Gender must not be empty or null!"))
        .andExpect(jsonPath("$.dateOfBirth").value("Date of birth must not be empty or null!"))
        .andExpect(jsonPath("$.email").value("Email must not be empty or null!"));
  }

  @Test
  void testLoginSuccessfully() throws Exception {
    register();

    mockMvc
        .perform(
            post("/authentication/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(loginRequest)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.token").isString());
  }

  @Test
  void testLoginShouldThrowInvalidCredentialsException() throws Exception {
    mockMvc
        .perform(
            post("/authentication/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(loginRequest)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testLoginShouldValidateNullFields() throws Exception {
    loginRequest = new LoginRequest();
    mockMvc
        .perform(
            post("/authentication/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(loginRequest)))
        .andExpect(status().isBadRequest())
        .andExpect(jsonPath("$.email").value("Email is required!"))
        .andExpect(jsonPath("$.password").value("Password is required!"));
  }
}
