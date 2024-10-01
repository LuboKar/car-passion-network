package com.carpassionnetwork.dto.request;

import com.carpassionnetwork.model.Gender;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserEditRequest {
  private String firstName;
  private String lastName;
  private String oldPassword;
  private String newPassword;
  private LocalDate dateOfBirth;
  private Gender gender;
}
