package com.carpassionnetwork.exception;

public class AlreadyUsedGroupNameException extends RuntimeException {
  public AlreadyUsedGroupNameException() {
    super("This group name is already used!");
  }
}
