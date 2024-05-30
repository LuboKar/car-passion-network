package com.carpassionnetwork.helper;

import com.carpassionnetwork.dto.request.CommentRequestDto;
import java.util.UUID;

public class CommentTestHelper {
  private static String CONTENT = "Test comment content!";

  public static CommentRequestDto createNewCommentRequestDto() {
    return CommentRequestDto.builder().postId(UUID.randomUUID()).content(CONTENT).build();
  }
}
