package com.carpassionnetwork.helper;

import com.carpassionnetwork.dto.request.CommentRequestDto;
import com.carpassionnetwork.model.Comment;
import java.util.HashSet;
import java.util.UUID;

public class CommentTestHelper {
  private static String CONTENT = "Test comment content!";

  public static CommentRequestDto createNewCommentRequestDto() {
    return CommentRequestDto.builder().postId(UUID.randomUUID()).content(CONTENT).build();
  }

  public static Comment createNewComment() {
    return Comment.builder().id(UUID.randomUUID()).content("Test comment content!").likes(new HashSet<>()).build();
  }
}
