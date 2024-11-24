package com.carpassionnetwork.helper;

import com.carpassionnetwork.model.Group;
import java.util.UUID;

public class GroupTestHelper {
  public static Group createNewGroup() {
    return Group.builder().id(UUID.randomUUID()).name("Group Name").build();
  }
}
