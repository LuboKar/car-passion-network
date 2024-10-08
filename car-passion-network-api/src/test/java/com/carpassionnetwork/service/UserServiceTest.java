package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;
import static com.carpassionnetwork.helper.UserTestHelper.createUserEditRequest;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.dto.request.UserEditRequest;
import com.carpassionnetwork.exception.FileNotUploadedException;
import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.exception.InvalidPasswordException;
import com.carpassionnetwork.exception.UserNotFoundException;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.UserRepository;
import java.io.IOException;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
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
  private UserEditRequest userEditRequest;

  @BeforeEach
  void setUp() {
    user = createUserOne();
    userEditRequest = createUserEditRequest();
  }

  @Test
  void getUserShouldThrowUserNotFoundException() {
    when(userRepository.findById(any())).thenReturn(Optional.empty());

    assertThrows(UserNotFoundException.class, () -> userService.getUser(user.getId()));
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
  void uploadProfilePictureShouldThrowFileNotUploadedExceptionWhenFileIsNull() {
    assertThrows(FileNotUploadedException.class, () -> userService.uploadProfilePicture(null));
  }

  @Test
  void uploadProfilePictureShouldThrowFileNotUploadedExceptionWhenFileIsEmpty() {
    when(file.isEmpty()).thenReturn(true);

    assertThrows(FileNotUploadedException.class, () -> userService.uploadProfilePicture(file));
  }

  @Test
  void uploadProfilePictureShouldThrowFileNotUploadedExceptionWhenFileNameIsNull() {
    when(file.getOriginalFilename()).thenReturn(null);

    assertThrows(FileNotUploadedException.class, () -> userService.uploadProfilePicture(file));
  }

  @Test
  void uploadProfilePictureShouldThrowFileNotUploadedExceptionWhenFileNameIsEmpty() {
    when(file.getOriginalFilename()).thenReturn("");

    assertThrows(FileNotUploadedException.class, () -> userService.uploadProfilePicture(file));
  }

  @Test
  void uploadProfilePictureShouldThrowInvalidCredentialsException() throws IOException {
    String fileName = "test.png";
    byte[] fileContent = "file content".getBytes();

    when(file.isEmpty()).thenReturn(false);
    when(file.getOriginalFilename()).thenReturn(fileName);
    SecurityContextHolder.setContext(securityContext);
    when(authentication.getName()).thenReturn(user.getEmail());
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(userRepository.findByEmail(user.getEmail())).thenThrow(InvalidCredentialsException.class);
    when(file.getBytes()).thenReturn(fileContent);

    assertThrows(InvalidCredentialsException.class, () -> userService.uploadProfilePicture(file));
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
  void editUserShouldThrowInvalidCredentialsException() {
    SecurityContextHolder.setContext(securityContext);
    when(authentication.getName()).thenReturn(user.getEmail());
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(userRepository.findByEmail(user.getEmail())).thenThrow(InvalidCredentialsException.class);

    assertThrows(InvalidCredentialsException.class, () -> userService.editUser(userEditRequest));
  }

  @Test
  void editUserShouldThrowInvalidPasswordException() {
    SecurityContextHolder.setContext(securityContext);
    when(authentication.getName()).thenReturn(user.getEmail());
    when(securityContext.getAuthentication()).thenReturn(authentication);
    when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.ofNullable(user));

    user.setPassword("passs");
    userEditRequest.setOldPassword("pass");
    userEditRequest.setNewPassword("password");

    assertThrows(InvalidPasswordException.class, () -> userService.editUser(userEditRequest));
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
}
