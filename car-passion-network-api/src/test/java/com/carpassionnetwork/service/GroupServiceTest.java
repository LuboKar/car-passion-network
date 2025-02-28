package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;
import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserTwo;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroupOne;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroupTwo;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.exception.ValidationException;
import com.carpassionnetwork.model.Group;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.GroupRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.multipart.MultipartFile;

@ExtendWith(MockitoExtension.class)
public class GroupServiceTest {
  @InjectMocks private GroupService groupService;

  @Mock private UserService userService;
  @Mock private GroupRepository groupRepository;
  @Mock private MultipartFile file;

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
  void createGroupShouldThrowValidationExceptionWhenInvalidCredentials() {
    when(userService.getCurrentUser()).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> groupService.createGroup(groupOne.getName()));
  }

  @Test
  void createGroupSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(groupRepository.save(any(Group.class))).thenReturn(groupOne);

    groupService.createGroup(groupOne.getName());

    verify(userService, times(1)).getCurrentUser();
    verify(groupRepository, times(1)).save(any(Group.class));
  }

  @Test
  void getGroupShouldThrowValidationExceptionWhenGroupNotFound() {
    when(groupRepository.findById(groupOne.getId())).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> groupService.getGroup(groupOne.getId()));
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
  void joinGroupShouldThrowValidationExceptionWhenInvalidCredentials() {
    when(userService.getCurrentUser()).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> groupService.joinGroup(groupOne.getId()));
  }

  @Test
  void joinGroupShouldThrowValidationExceptionWhenGroupNotFound() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(groupRepository.findById(groupOne.getId())).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> groupService.joinGroup(groupOne.getId()));
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
  void leaveGroupShouldThrowValidationExceptionWhenInvalidCredentials() {
    when(userService.getCurrentUser()).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> groupService.leaveGroup(groupOne.getId()));
  }

  @Test
  void leaveGroupShouldThrowValidationExceptionWhenGroupNotFound() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(groupRepository.findById(groupOne.getId())).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> groupService.leaveGroup(groupOne.getId()));
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

  @Test
  void removeMemberShouldThrowValidationExceptionWhenGroupNotFound() {
    when(groupRepository.findById(groupOne.getId())).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class,
        () -> groupService.removeMember(groupOne.getId(), secondUser.getId()));
  }

  @Test
  void removeMemberShouldThrowValidationExceptionWhenUserNotFound() {
    when(groupRepository.findById(groupOne.getId())).thenReturn(Optional.of(groupOne));
    when(userService.getUser(secondUser.getId())).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class,
        () -> groupService.removeMember(groupOne.getId(), secondUser.getId()));
  }

  @Test
  void removeMemberSuccessfully() {
    when(groupRepository.findById(groupOne.getId())).thenReturn(Optional.of(groupOne));
    when(userService.getUser(secondUser.getId())).thenReturn(secondUser);
    when(groupRepository.save(groupOne)).thenReturn(groupOne);
    groupOne.getMembers().add(secondUser);

    Group savedGroup = groupService.removeMember(groupOne.getId(), secondUser.getId());

    assertNotNull(savedGroup);
    assertEquals(savedGroup.getMembers().size(), 0);
    verify(groupRepository, times(1)).findById(groupOne.getId());
    verify(userService, times(1)).getUser(secondUser.getId());
    verify(groupRepository, times(1)).save(groupOne);
  }

  @Test
  void uploadGroupPictureShouldThrowValidationExceptionWhenFileNotUploaded() {
    assertThrows(
        ValidationException.class, () -> groupService.uploadGroupPicture(null, groupOne.getId()));
  }

  @Test
  void uploadGroupPictureShouldThrowValidationExceptionWhenFileIsEmpty() {
    when(file.isEmpty()).thenReturn(true);

    assertThrows(
        ValidationException.class, () -> groupService.uploadGroupPicture(file, groupOne.getId()));
  }

  @Test
  void uploadGroupPictureShouldThrowValidationExceptionWhenFileNameIsNull() {
    when(file.getOriginalFilename()).thenReturn(null);

    assertThrows(
        ValidationException.class, () -> groupService.uploadGroupPicture(file, groupOne.getId()));
  }

  @Test
  void uploadGroupPictureShouldThrowValidationExceptionWhenFileNameIsEmpty() {
    when(file.getOriginalFilename()).thenReturn("");

    assertThrows(
        ValidationException.class, () -> groupService.uploadGroupPicture(file, groupOne.getId()));
  }

  @Test
  void uploadGroupPictureShouldThrowGroupNotFoundException() throws IOException {
    String fileName = "test.png";
    when(file.isEmpty()).thenReturn(false);
    when(file.getOriginalFilename()).thenReturn(fileName);

    assertThrows(
        ValidationException.class, () -> groupService.uploadGroupPicture(file, groupOne.getId()));
  }

  @Test
  void uploadGroupPictureSuccessfully() throws IOException {
    Path path = Paths.get("GroupPictures", groupOne.getId().toString());
    Files.createDirectory(path);
    String fileName = "test.png";
    byte[] fileContent = "file content".getBytes();
    when(groupRepository.findById(groupOne.getId())).thenReturn(Optional.of(groupOne));
    when(file.isEmpty()).thenReturn(false);
    when(file.getOriginalFilename()).thenReturn(fileName);
    when(file.getBytes()).thenReturn(fileContent);
    when(groupRepository.save(groupOne)).thenReturn(groupOne);

    Group savedGroup = groupService.uploadGroupPicture(file, groupOne.getId());

    assertNotNull(savedGroup);
    verify(groupRepository, times(1)).findById(groupOne.getId());
    verify(groupRepository, times(1)).save(groupOne);
  }
}
