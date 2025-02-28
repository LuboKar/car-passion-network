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
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.*;
import org.junit.jupiter.api.AfterEach;
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

  private static final String PARENT_DIRECTORY = "ProfilePictures";

  private User user;
  private User secondUser;
  private UserEditRequest userEditRequest;
  private Group group;
  private String path;

  @BeforeEach
  void setUp() throws IOException {
    user = createUserOne();
    userEditRequest = createUserEditRequest();
    secondUser = createUserTwo();
    user.setLikedComments(new HashSet<>());
    group = createNewGroupOne();
    path = PARENT_DIRECTORY + "/" + user.getEmail();
    Files.createDirectories(Path.of(path));
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
  void getCurrentUserShouldThrowValidationExceptionWhenAuthenticationIsNull() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(null);

    assertThrows(ValidationException.class, () -> userService.getCurrentUser());
  }

  @Test
  void getCurrentUserShouldThrowValidationExceptionWhenNotAuthenticated() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.isAuthenticated()).thenReturn(false);

    assertThrows(ValidationException.class, () -> userService.getCurrentUser());
  }

  @Test
  void getCurrentUserSuccessfully() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.isAuthenticated()).thenReturn(true);
    when(authentication.getPrincipal()).thenReturn(user);

    User authenticatedUser = userService.getCurrentUser();

    assertNotNull(authenticatedUser);
    assertEquals(authenticatedUser, user);
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
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.getName()).thenReturn(user.getEmail());
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
    when(authentication.isAuthenticated()).thenReturn(true);
    when(authentication.getPrincipal()).thenReturn(user);
    when(file.getBytes()).thenReturn(fileContent);

    userService.uploadProfilePicture(file);

    verify(authentication, times(1)).getName();
    verify(securityContext, times(2)).getAuthentication();
    verify(authentication, times(1)).isAuthenticated();
    verify(authentication, times(1)).getPrincipal();
    verify(userRepository, times(1)).save(user);
  }

  @Test
  void editUserShouldThrowValidationExceptionWhenInvalidCredentials() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.isAuthenticated()).thenReturn(false);

    assertThrows(ValidationException.class, () -> userService.editUser(userEditRequest));
  }

  @Test
  void editUserShouldThrowValidationExceptionWhenInvalidPassword() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.isAuthenticated()).thenReturn(true);
    when(authentication.getPrincipal()).thenReturn(user);
    user.setPassword("passs");
    userEditRequest.setOldPassword("pass");
    userEditRequest.setNewPassword("password");

    assertThrows(ValidationException.class, () -> userService.editUser(userEditRequest));
  }

  @Test
  void editUserSuccessfully() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.isAuthenticated()).thenReturn(true);
    when(authentication.getPrincipal()).thenReturn(user);

    userService.editUser(userEditRequest);

    verify(securityContext, times(1)).getAuthentication();
    verify(authentication, times(1)).isAuthenticated();
    verify(authentication, times(1)).getPrincipal();
    verify(userRepository, times(1)).save(user);
  }

  @Test
  void addFriendShouldThrowValidationExceptionWhenInvalidCredentials() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.isAuthenticated()).thenReturn(false);

    assertThrows(ValidationException.class, () -> userService.addFriend(secondUser.getId()));
  }

  @Test
  void addFriendSuccessfully() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.isAuthenticated()).thenReturn(true);
    when(authentication.getPrincipal()).thenReturn(user);

    userService.addFriend(secondUser.getId());

    verify(securityContext, times(1)).getAuthentication();
    verify(authentication, times(1)).isAuthenticated();
    verify(authentication, times(1)).getPrincipal();
  }

  @Test
  void removeFriendShouldThrowValidationExceptionWhenInvalidCredentials() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.isAuthenticated()).thenReturn(false);

    assertThrows(ValidationException.class, () -> userService.removeFriend(secondUser.getId()));
  }

  @Test
  void removeFriendSuccessfully() {
    SecurityContextHolder.setContext(securityContext);
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(authentication.isAuthenticated()).thenReturn(true);
    when(authentication.getPrincipal()).thenReturn(user);

    userService.addFriend(secondUser.getId());

    verify(securityContext, times(1)).getAuthentication();
    verify(authentication, times(1)).isAuthenticated();
    verify(authentication, times(1)).getPrincipal();
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

  @Test
  void areFriendsShouldReturnTrueWhenUsersAreFriends() {
    when(userRepository.areFriends(user.getId(), secondUser.getId())).thenReturn(true);

    boolean areFriend = userService.areFriends(user.getId(), secondUser.getId());

    assertTrue(areFriend);
    verify(userRepository, times(1)).areFriends(user.getId(), secondUser.getId());
  }

  @Test
  void areFriendsShouldReturnFalseWhenUsersAreNotFriends() {
    when(userRepository.areFriends(user.getId(), secondUser.getId())).thenReturn(false);

    boolean areFriend = userService.areFriends(user.getId(), secondUser.getId());

    assertFalse(areFriend);
    verify(userRepository, times(1)).areFriends(user.getId(), secondUser.getId());
  }

  @AfterEach
  void cleanup() throws IOException {
    Path directory = Path.of(path);
    if (Files.exists(directory)) {
      Files.walk(directory)
          .sorted(Comparator.reverseOrder())
          .map(Path::toFile)
          .forEach(File::delete);
    }
  }
}
