package com.carpassionnetwork.helper;

import com.carpassionnetwork.dto.request.RegistrationRequest;
import com.carpassionnetwork.model.Gender;
import com.carpassionnetwork.model.User;
import java.time.LocalDate;
import java.util.UUID;

public class AuthenticationTestHelper {
  public static final String EMAIL = "john.doe@gmail.com";
  public static final String USER_CREATED_SUCCESSFULLY =
      "User with email %s was created successfully!";

  public static User createNewUser() {
    return User.builder()
        .id(UUID.randomUUID())
        .firstName("John")
        .lastName("Doe")
        .dateOfBirth(LocalDate.of(1990, 1, 1))
        .email(EMAIL)
        .password("password")
        .gender(Gender.MALE)
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
}
