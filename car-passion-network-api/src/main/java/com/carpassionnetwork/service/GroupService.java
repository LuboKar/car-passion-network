package com.carpassionnetwork.service;

import com.carpassionnetwork.model.Group;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.GroupRepository;
import java.util.ArrayList;
import java.util.HashSet;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupService {
  private final GroupRepository groupRepository;
  private final UserService userService;

  public Group createGroup(String groupName) {
    User currentUser = userService.getCurrentUser();

    Group group = buildGroup(groupName, currentUser);

    return groupRepository.save(group);
  }

  private Group buildGroup(String name, User admin) {
    return Group.builder()
        .name(name)
        .admin(admin)
        .posts(new ArrayList<>())
        .members(new HashSet<>())
        .build();
  }
}
