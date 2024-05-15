package com.carpassionnetwork.dto.request;

import com.carpassionnetwork.model.Gender;
import jakarta.validation.constraints.*;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegistrationRequest {
  @NotBlank(message = "First name must not be empty or null!")
  private String firstName;

  @NotBlank(message = "Last name must not be empty or null!")
  private String lastName;

  @Email(message = "Email is not well formatted!")
  @NotBlank(message = "Email must not be empty or null!")
  private String email;

  @Size(min = 8, message = "Password must be minimum 8 characters!")
  @NotBlank(message = "Password must not be empty or null!")
  private String password;

  @NotNull(message = "Date of birth must not be empty or null!")
  @Past(message = "Date of birth must be in the past!")
  private LocalDate dateOfBirth;

  @NotNull(message = "Gender must not be empty or null!")
  private Gender gender;
}
