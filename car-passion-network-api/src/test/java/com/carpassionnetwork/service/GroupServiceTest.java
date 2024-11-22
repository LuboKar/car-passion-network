package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.model.Group;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.GroupRepository;
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

  private String groupName;
  private User currentUser;

  @BeforeEach
  void setUp() {
    groupName = "Some group name.";
    currentUser = createUserOne();
  }

  @Test
  void createGroupShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(InvalidCredentialsException.class);

    assertThrows(InvalidCredentialsException.class, () -> groupService.createGroup(groupName));
  }

  @Test
  void createGroupSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(currentUser);

    groupService.createGroup(groupName);

    verify(userService, times(1)).getCurrentUser();
    verify(groupRepository, times(1)).save(any(Group.class));
  }
}
