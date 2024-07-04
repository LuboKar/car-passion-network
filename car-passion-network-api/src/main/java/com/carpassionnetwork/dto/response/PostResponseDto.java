package com.carpassionnetwork.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostResponseDto {
  private UUID id;
  private String title;
  private String content;

  @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss")
  private LocalDateTime createdAt;

  private boolean currentUserLike;

  private UserResponseDto user;

  private UserResponseDto author;

  private Set<UserResponseDto> likes;

  private List<CommentResponseDto> comments;
}
