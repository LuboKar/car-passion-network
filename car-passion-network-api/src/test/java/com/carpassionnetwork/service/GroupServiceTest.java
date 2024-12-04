package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;
import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserTwo;
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
  private User secondUser;

  @BeforeEach
  void setUp() {
    groupOne = createNewGroupOne();
    groupTwo = createNewGroupTwo();
    currentUser = createUserOne();
    secondUser = createUserTwo();
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

  @Test
  void getALlGroupsGroupsSuccessfully() {
    when(groupRepository.findAllOtherGroups(currentUser.getId()))
        .thenReturn(List.of(groupOne, groupTwo));

    List<Group> groups = groupService.getAllOtherGroups(currentUser.getId());

    assertNotNull(groups);
    assertEquals(groups.size(), 2);
    assertNotEquals(groups.get(0), groups.get(1));
    verify(groupRepository, times(1)).findAllOtherGroups(currentUser.getId());
  }

  @Test
  void getUserParticipatingGroupsSuccessfully() {
    when(groupRepository.findByMembersId(currentUser.getId()))
        .thenReturn(List.of(groupOne, groupTwo));

    List<Group> groups = groupService.getUserParticipatingGroups(currentUser.getId());

    assertNotNull(groups);
    assertEquals(groups.size(), 2);
    assertNotEquals(groups.get(0), groups.get(1));
    verify(groupRepository, times(1)).findByMembersId(currentUser.getId());
  }

  @Test
  void joinGroupShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(InvalidCredentialsException.class);

    assertThrows(InvalidCredentialsException.class, () -> groupService.joinGroup(groupOne.getId()));
  }

  @Test
  void joinGroupShouldThrowGroupNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(groupRepository.findById(groupOne.getId())).thenThrow(GroupNotFoundException.class);

    assertThrows(GroupNotFoundException.class, () -> groupService.joinGroup(groupOne.getId()));
  }

  @Test
  void joinGroupSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(groupRepository.findById(groupOne.getId())).thenReturn(Optional.of(groupOne));
    when(groupRepository.save(groupOne)).thenReturn(groupOne);

    Group savedGroup = groupService.joinGroup(groupOne.getId());

    assertNotNull(savedGroup);
    assertEquals(savedGroup.getMembers().size(), 1);
    assertTrue(savedGroup.getMembers().contains(currentUser));
    verify(userService, times(1)).getCurrentUser();
    verify(groupRepository, times(1)).save(groupOne);
  }

  @Test
  void leaveGroupShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(InvalidCredentialsException.class);

    assertThrows(
        InvalidCredentialsException.class, () -> groupService.leaveGroup(groupOne.getId()));
  }

  @Test
  void leaveGroupShouldThrowGroupNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(groupRepository.findById(groupOne.getId())).thenThrow(GroupNotFoundException.class);

    assertThrows(GroupNotFoundException.class, () -> groupService.leaveGroup(groupOne.getId()));
  }

  @Test
  void leaveGroupSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    groupOne.getMembers().add(currentUser);
    groupOne.getMembers().add(secondUser);
    when(groupRepository.findById(groupOne.getId())).thenReturn(Optional.of(groupOne));
    when(groupRepository.save(groupOne)).thenReturn(groupOne);

    Group savedGroup = groupService.leaveGroup(groupOne.getId());

    assertNotNull(savedGroup);
    assertEquals(savedGroup.getMembers().size(), 1);
    assertFalse(savedGroup.getMembers().contains(currentUser));
    verify(userService, times(1)).getCurrentUser();
    verify(groupRepository, times(1)).save(groupOne);
  }
}
