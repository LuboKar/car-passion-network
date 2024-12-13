package com.carpassionnetwork.dto.response;

import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserGroupResponseDto {
  private UUID id;
  private String name;
  private UserResponseDto admin;

  private String groupPicture;

  private boolean isCurrentUserMember;
}
