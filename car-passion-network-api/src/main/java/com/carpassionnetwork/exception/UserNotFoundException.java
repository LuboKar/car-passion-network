package com.carpassionnetwork.exception;


public class UserNotFoundException extends RuntimeException {
  public UserNotFoundException(String email) {
    super("User with email:" + email + " does not exists!");
  }
}
