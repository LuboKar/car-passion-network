package com.carpassionnetwork.exception;

import java.util.UUID;

public class UserNotAuthorException extends RuntimeException {
  public UserNotAuthorException(UUID userId, UUID postId) {
    super("User with " + userId + " is not author of post with " + postId + "!");
  }
}
