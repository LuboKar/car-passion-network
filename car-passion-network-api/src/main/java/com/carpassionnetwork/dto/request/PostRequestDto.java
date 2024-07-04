package com.carpassionnetwork.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostRequestDto {
  @NotNull(message = "Owner id must not be empty or null!")
  private UUID ownerId;

  @NotBlank(message = "Title must not be empty or null!")
  private String title;

  private String content;
}
