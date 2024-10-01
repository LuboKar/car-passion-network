package com.carpassionnetwork.exception;

public class InvalidPasswordException extends RuntimeException {
  public InvalidPasswordException() {
    super("The old password is incorrect.");
  }
}
