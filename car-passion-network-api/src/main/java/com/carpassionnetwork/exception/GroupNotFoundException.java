package com.carpassionnetwork.exception;

import java.util.UUID;

public class GroupNotFoundException extends RuntimeException {
  public GroupNotFoundException(UUID groupId) {
    super("Group with id: " + groupId + " does not exists!");
  }
}
