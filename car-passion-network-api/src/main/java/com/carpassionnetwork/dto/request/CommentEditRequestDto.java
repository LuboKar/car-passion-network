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
public class CommentEditRequestDto {
  @NotNull(message = "Post id must not be empty or null!")
  private UUID postId;

  @NotNull(message = "Comment id must not be empty or null!")
  private UUID commentId;

  @NotBlank(message = "Content must not be empty or null!")
  private String content;
}
