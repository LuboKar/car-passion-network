package com.carpassionnetwork.dto.response;

import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CommentResponseDto {
  private UUID id;

  private String content;

  private UserResponseDto user;

  private LocalDateTime cratedAt;
}
