package com.carpassionnetwork.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostRequestDto {
  @NotBlank(message = "Title must not be empty or null!")
  private String title;

  private String content;
}
