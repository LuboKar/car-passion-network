package com.carpassionnetwork.helper;

import com.carpassionnetwork.model.Group;
import java.util.UUID;

public class GroupTestHelper {
  public static Group createNewGroupOne() {
    return Group.builder().id(UUID.randomUUID()).name("First Group Name").build();
  }

  public static Group createNewGroupTwo() {
    return Group.builder().id(UUID.randomUUID()).name("Second Group Name").build();
  }
}
