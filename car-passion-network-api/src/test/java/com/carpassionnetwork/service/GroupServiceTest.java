package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroupOne;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroupTwo;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.exception.GroupNotFoundException;
import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.model.Group;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.GroupRepository;
import java.util.List;
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

  private Group groupOne;
  private Group groupTwo;
  private User currentUser;

  @BeforeEach
  void setUp() {
    groupOne = createNewGroupOne();
    groupTwo = createNewGroupTwo();
    currentUser = createUserOne();
  }

  @Test
  void createGroupShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(InvalidCredentialsException.class);

    assertThrows(
        InvalidCredentialsException.class, () -> groupService.createGroup(groupOne.getName()));
  }

  @Test
  void createGroupSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(currentUser);

    groupService.createGroup(groupOne.getName());

    verify(userService, times(1)).getCurrentUser();
    verify(groupRepository, times(1)).save(any(Group.class));
  }

  @Test
  void getGroupShouldThrowGroupNotFoundException() {
    when(groupRepository.findById(groupOne.getId())).thenThrow(GroupNotFoundException.class);

    assertThrows(GroupNotFoundException.class, () -> groupService.getGroup(groupOne.getId()));
  }

  @Test
  void getGroupSuccessfully() {
    when(groupRepository.findById(groupOne.getId())).thenReturn(Optional.ofNullable(groupOne));

    groupService.getGroup(groupOne.getId());

    verify(groupRepository, times(1)).findById(groupOne.getId());
  }

  @Test
  void getALlGroupsByAdminIdSuccessfully() {
    when(groupRepository.findAllByAdminId(currentUser.getId()))
        .thenReturn(List.of(groupOne, groupTwo));

    List<Group> groups = groupService.getAllGroupsByAdminId(currentUser.getId());

    assertNotNull(groups);
    assertEquals(groups.size(), 2);
    assertNotEquals(groups.get(0), groups.get(1));
    verify(groupRepository, times(1)).findAllByAdminId(currentUser.getId());
  }
}
