package com.carpassionnetwork.exception;

import java.util.UUID;

public class CommentNotFoundException extends RuntimeException {
  public CommentNotFoundException(UUID id) {
    super("Comment with " + id + " does not exists!");
  }
}
