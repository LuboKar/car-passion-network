package com.carpassionnetwork.service;

import com.carpassionnetwork.exception.AlreadyUsedGroupNameException;
import com.carpassionnetwork.exception.GroupNotFoundException;
import com.carpassionnetwork.model.Group;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.GroupRepository;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GroupService {
  private final GroupRepository groupRepository;
  private final UserService userService;

  public Group createGroup(String groupName) {
    validateGroupName(groupName);

    User currentUser = userService.getCurrentUser();
    Group group = buildGroup(groupName, currentUser);

    return groupRepository.save(group);
  }

  public Group getGroup(UUID groupId) {
    return groupRepository.findById(groupId).orElseThrow(() -> new GroupNotFoundException(groupId));
  }

  private Group buildGroup(String name, User admin) {
    return Group.builder()
        .name(name)
        .admin(admin)
        .posts(new ArrayList<>())
        .members(new HashSet<>())
        .build();
  }

  private void validateGroupName(String groupName) {
    Optional<Group> savedGroup = groupRepository.findByName(groupName);
    if (savedGroup.isPresent()) throw new AlreadyUsedGroupNameException();
  }
}
