package com.carpassionnetwork.exception;

import java.util.UUID;

public class UserNotFoundException extends RuntimeException {
  public UserNotFoundException(String email) {
    super("User with email:" + email + " does not exists!");
  }

  public UserNotFoundException(UUID id) {
    super("User with Id:" + id + " does not exists!");
  }
}
