package com.carpassionnetwork.exception;

public class AlreadyUsedEmailException extends RuntimeException {
  public AlreadyUsedEmailException() {
    super("This email is already used!");
  }
}
