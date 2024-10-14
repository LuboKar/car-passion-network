package com.carpassionnetwork.helper;

import com.carpassionnetwork.dto.request.LoginRequest;
import com.carpassionnetwork.dto.request.RegistrationRequest;
import com.carpassionnetwork.model.Gender;
import com.carpassionnetwork.model.User;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.UUID;

public class AuthenticationTestHelper {
  public static final String EMAIL = "john.doe@gmail.com";
  public static final String USER_CREATED_SUCCESSFULLY =
      "User with email %s was created successfully!";

  public static User createUserOne() {
    return User.builder()
        .id(UUID.randomUUID())
        .firstName("John")
        .lastName("Doe")
        .dateOfBirth(LocalDate.of(1990, 1, 1))
        .email(EMAIL)
        .password("password")
        .gender(Gender.MALE)
        .likedPosts(new HashSet<>())
        .friends(new HashSet<>())
        .build();
  }

  public static User createUserTwo() {
    return User.builder()
        .id(UUID.randomUUID())
        .firstName("Jane")
        .lastName("Doe")
        .dateOfBirth(LocalDate.of(1990, 1, 1))
        .email("jane.doe@gmail.com")
        .password("password")
        .gender(Gender.MALE)
        .friends(new HashSet<>())
        .build();
  }

  public static RegistrationRequest createRegistrationRequest() {
    return RegistrationRequest.builder()
        .firstName("John")
        .lastName("Doe")
        .email(EMAIL)
        .password("password")
        .dateOfBirth(LocalDate.of(1990, 1, 1))
        .gender(Gender.MALE)
        .build();
  }

  public static LoginRequest createLoginRequest() {
    return LoginRequest.builder().email(EMAIL).password("password").build();
  }
}
