package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;
import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserTwo;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroupOne;
import static com.carpassionnetwork.helper.UserTestHelper.createUserEditRequest;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.dto.request.UserEditRequest;
import com.carpassionnetwork.exception.ValidationException;
import com.carpassionnetwork.model.Group;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.UserRepository;
import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.multipart.MultipartFile;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
  @InjectMocks private UserService userService;

  @Mock private UserRepository userRepository;
  @Mock private MultipartFile file;
  @Mock private Authentication authentication;
  @Mock private SecurityContext securityContext;
  @Mock private PasswordEncoder passwordEncoder;

  private User user;
  private User secondUser;
  private UserEditRequest userEditRequest;
  private Group group;

  @BeforeEach
  void setUp() {
    user = createUserOne();
    userEditRequest = createUserEditRequest();
    secondUser = createUserTwo();
    user.setLikedComments(new HashSet<>());
    group = createNewGroupOne();
  }

  @Test
  void getUserShouldThrowValidationExceptionWhenUserNotFound() {
    when(userRepository.findById(any())).thenReturn(Optional.empty());

    assertThrows(ValidationException.class, () -> userService.getUser(user.getId()));
  }

  @Test
  void getUserSuccessfully() {
    when(userRepository.findById(any())).thenReturn(Optional.of(user));

    User actualUser = userService.getUser(user.getId());

    assertNotNull(actualUser);
    assertEquals(actualUser, user);
    verify(userRepository, times(1)).findById(user.getId());
  }

  @Test
  void uploadProfilePictureShouldThrowValidationExceptionWhenFileIsNull() {
    assertThrows(ValidationException.class, () -> userService.uploadProfilePicture(null));
  }

  @Test
  void uploadProfilePictureShouldThrowValidationExceptionWhenFileIsEmpty() {
    when(file.isEmpty()).thenReturn(true);

    assertThrows(ValidationException.class, () -> userService.uploadProfilePicture(file));
  }

  @Test
  void uploadProfilePictureShouldThrowValidationExceptionWhenFileNameIsNull() {
    when(file.getOriginalFilename()).thenReturn(null);

    assertThrows(ValidationException.class, () -> userService.uploadProfilePicture(file));
  }

  @Test
  void uploadProfilePictureShouldThrowValidationExceptionWhenFileNameIsEmpty() {
    when(file.getOriginalFilename()).thenReturn("");

    assertThrows(ValidationException.class, () -> userService.uploadProfilePicture(file));
  }

  @Test
  void uploadProfilePictureShouldThrowValidationExceptionWhenInvalidCredentials()
      throws IOException {
    String fileName = "test.png";
    byte[] fileContent = "file content".getBytes();
    when(file.isEmpty()).thenReturn(false);
    when(file.getOriginalFilename()).thenReturn(fileName);
    SecurityContextHolder.setContext(securityContext);
    when(authentication.getName()).thenReturn(user.getEmail());
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(userRepository.findByEmail(user.getEmail())).thenThrow(ValidationException.class);
    when(file.getBytes()).thenReturn(fileContent);

    assertThrows(ValidationException.class, () -> userService.uploadProfilePicture(file));
  }

  @Test
  void uploadProfilePictureSuccessfully() throws IOException {
    String fileName = "test.png";
    byte[] fileContent = "file content".getBytes();
    when(file.isEmpty()).thenReturn(false);
    when(file.getOriginalFilename()).thenReturn(fileName);
    SecurityContextHolder.setContext(securityContext);
    when(authentication.getName()).thenReturn(user.getEmail());
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.ofNullable(user));
    when(file.getBytes()).thenReturn(fileContent);

    userService.uploadProfilePicture(file);

    verify(userRepository, times(1)).findByEmail(user.getEmail());
    verify(userRepository, times(1)).save(user);
  }

  @Test
  void editUserShouldThrowValidationExceptionWhenInvalidCredentials() {
    SecurityContextHolder.setContext(securityContext);
    when(authentication.getName()).thenReturn(user.getEmail());
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(userRepository.findByEmail(user.getEmail())).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> userService.editUser(userEditRequest));
  }

  @Test
  void editUserShouldThrowValidationExceptionWhenInvalidPassword() {
    SecurityContextHolder.setContext(securityContext);
    when(authentication.getName()).thenReturn(user.getEmail());
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.ofNullable(user));
    user.setPassword("passs");
    userEditRequest.setOldPassword("pass");
    userEditRequest.setNewPassword("password");

    assertThrows(ValidationException.class, () -> userService.editUser(userEditRequest));
  }

  @Test
  void editUserSuccessfully() {
    SecurityContextHolder.setContext(securityContext);
    when(authentication.getName()).thenReturn(user.getEmail());
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.ofNullable(user));

    userService.editUser(userEditRequest);

    verify(authentication, times(1)).getName();
    verify(securityContext, times(1)).getAuthentication();
    verify(userRepository, times(1)).findByEmail(user.getEmail());
    verify(userRepository, times(1)).save(user);
  }

  @Test
  void addFriendShouldThrowValidationExceptionWhenInvalidCredentials() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.getName()).thenReturn(user.getEmail());
    when(userRepository.findByEmail(user.getEmail())).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> userService.addFriend(secondUser.getId()));
  }

  @Test
  void addFriendShouldThrowValidationExceptionWhenUserNotFound() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.getName()).thenReturn(user.getEmail());
    when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
    when(userRepository.findById(secondUser.getId())).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> userService.addFriend(secondUser.getId()));
  }

  @Test
  void addFriendSuccessfully() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.getName()).thenReturn(user.getEmail());
    when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
    when(userRepository.findById(secondUser.getId())).thenReturn(Optional.of(secondUser));

    userService.addFriend(secondUser.getId());

    verify(authentication, times(1)).getName();
    verify(securityContext, times(1)).getAuthentication();
    verify(userRepository, times(1)).findByEmail(user.getEmail());
    verify(userRepository, times(1)).findById(secondUser.getId());
    verify(userRepository, times(1)).save(secondUser);
  }

  @Test
  void removeFriendShouldThrowValidationExceptionWhenInvalidCredentials() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.getName()).thenReturn(user.getEmail());
    when(userRepository.findByEmail(user.getEmail())).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> userService.removeFriend(secondUser.getId()));
  }

  @Test
  void removeFriendShouldThrowValidationExceptionWhenUserNotFound() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.getName()).thenReturn(user.getEmail());
    when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
    when(userRepository.findById(secondUser.getId())).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> userService.removeFriend(secondUser.getId()));
  }

  @Test
  void removeFriendSuccessfully() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.getName()).thenReturn(user.getEmail());
    when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));
    when(userRepository.findById(secondUser.getId())).thenReturn(Optional.of(secondUser));

    userService.addFriend(secondUser.getId());

    verify(authentication, times(1)).getName();
    verify(securityContext, times(1)).getAuthentication();
    verify(userRepository, times(1)).findByEmail(user.getEmail());
    verify(userRepository, times(1)).findById(secondUser.getId());
    verify(userRepository, times(1)).save(secondUser);
  }

  @Test
  void getFriendsShouldReturnEmptyList() {
    when(userRepository.findAllFriendsByUserId(user.getId())).thenReturn(Collections.emptyList());

    List<User> friends = userService.getAllFriendsByUserId(user.getId());

    assertEquals(friends.size(), 0);
    verify(userRepository, times(1)).findAllFriendsByUserId(user.getId());
  }

  @Test
  void getFriendsSuccessfully() {
    when(userRepository.findAllFriendsByUserId(user.getId())).thenReturn(List.of(secondUser));

    List<User> friends = userService.getAllFriendsByUserId(user.getId());

    assertEquals(friends.size(), 1);
    verify(userRepository, times(1)).findAllFriendsByUserId(user.getId());
  }

  @Test
  void findUsersByFullNameStartsWithShouldReturnEmptyArray() {
    String term = "Test";
    when(userRepository.findByFullNameStartingWith(eq(term), any(Pageable.class)))
        .thenReturn(Collections.emptyList());

    List<User> users = userService.findUsersByFullNameStartsWith(term);

    assertTrue(users.isEmpty());
    verify(userRepository, times(1)).findByFullNameStartingWith(eq(term), any(Pageable.class));
  }

  @Test
  void findUsersByFullNameStartsWithSuccessfully() {
    String term = "J";
    when(userRepository.findByFullNameStartingWith(eq(term), any(Pageable.class)))
        .thenReturn(List.of(user, secondUser));

    List<User> users = userService.findUsersByFullNameStartsWith(term);

    assertEquals(users.size(), 2);
    verify(userRepository, times(1)).findByFullNameStartingWith(eq(term), any(Pageable.class));
  }

  @Test
  void deleteUserShouldThrowValidationExceptionWhenUserNotFound() {
    when(userRepository.findById(user.getId())).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> userService.deleteUser(user.getId()));
  }

  @Test
  void deleteUserSuccessfully() {
    when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));

    userService.deleteUser(user.getId());

    verify(userRepository, times(1)).findById(user.getId());
    verify(userRepository, times(1)).delete(user);
  }

  @Test
  void getAllGroupMembersShouldReturnEmptyList() {
    when(userRepository.findAllByGroupId(group.getId())).thenReturn(Collections.emptyList());

    List<User> members = userService.getAllGroupMembers(group.getId());

    assertEquals(members.size(), 0);
    verify(userRepository, times(1)).findAllByGroupId(group.getId());
  }

  @Test
  void getAllGroupMembersSuccessfully() {
    when(userRepository.findAllByGroupId(group.getId())).thenReturn(List.of(secondUser));

    List<User> members = userService.getAllGroupMembers(group.getId());

    assertEquals(members.size(), 1);
    verify(userRepository, times(1)).findAllByGroupId(group.getId());
  }
}
