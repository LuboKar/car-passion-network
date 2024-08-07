package com.carpassionnetwork.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentRequestDto {

  @NotNull(message = "Post id must not be null!")
  private UUID postId;

  private UUID parentCommentId;

  @NotBlank(message = "Content must not be empty or null!")
  private String content;
}
