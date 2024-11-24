package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroup;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.exception.GroupNotFoundException;
import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.model.Group;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.GroupRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class GroupServiceTest {
  @InjectMocks private GroupService groupService;

  @Mock private UserService userService;
  @Mock private GroupRepository groupRepository;

  private Group group;
  private User currentUser;

  @BeforeEach
  void setUp() {
    group = createNewGroup();
    currentUser = createUserOne();
  }

  @Test
  void createGroupShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(InvalidCredentialsException.class);

    assertThrows(
        InvalidCredentialsException.class, () -> groupService.createGroup(group.getName()));
  }

  @Test
  void createGroupSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(currentUser);

    groupService.createGroup(group.getName());

    verify(userService, times(1)).getCurrentUser();
    verify(groupRepository, times(1)).save(any(Group.class));
  }

  @Test
  void getGroupShouldThrowGroupNotFoundException() {
    when(groupRepository.findById(group.getId())).thenThrow(GroupNotFoundException.class);

    assertThrows(GroupNotFoundException.class, () -> groupService.getGroup(group.getId()));
  }

  @Test
  void getGroupSuccessfully() {
    when(groupRepository.findById(group.getId())).thenReturn(Optional.ofNullable(group));

    groupService.getGroup(group.getId());

    verify(groupRepository, times(1)).findById(group.getId());
  }
}
