package com.carpassionnetwork.exception;

import java.util.UUID;

public class PostNotFoundException extends RuntimeException {
  public PostNotFoundException(UUID postId) {
    super("Post with " + postId + " does not exists!");
  }
}
