package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.EMAIL;
import static com.carpassionnetwork.helper.PostTestHelper.*;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.carpassionnetwork.exception.FileNotUploadedException;
import com.carpassionnetwork.exception.UserNotFoundException;
import com.carpassionnetwork.model.Gender;
import com.carpassionnetwork.model.User;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;

public class UserControllerIT extends BaseIT {
  @TempDir Path tempDir;

  @BeforeEach
  void setUp() throws IOException {
    Path customTempDir = tempDir.resolve(currentUser.getEmail());
    Files.createDirectories(customTempDir);
  }

  @Test
  @WithMockUser(username = "user", roles = "USER")
  void getUserShouldThrowUserNotFoundException() throws Exception {
    mockMvc
        .perform(get("/users/" + currentUser.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(UserNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "user", roles = "USER")
  void getUserSuccessfully() throws Exception {
    register();
    User registeredUser = getRegisteredUser();

    mockMvc
        .perform(get("/users/" + registeredUser.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(registeredUser.getId().toString()))
        .andExpect(jsonPath("$.firstName").value(registeredUser.getFirstName()))
        .andExpect(jsonPath("$.lastName").value(registeredUser.getLastName()))
        .andExpect(jsonPath("$.dateOfBirth").value(registeredUser.getDateOfBirth().toString()))
        .andExpect(jsonPath("$.email").value(EMAIL))
        .andExpect(jsonPath("$.gender").value(Gender.MALE.toString()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void uploadProfilePictureShouldThrowFileNotUploadedExceptionWhenFileIsEmpty() throws Exception {
    register();
    MockMultipartFile file =
        new MockMultipartFile("file", "profile.png", MediaType.IMAGE_JPEG_VALUE, "".getBytes());

    mockMvc
        .perform(
            multipart("/users/upload")
                .file(file)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    }))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(FileNotUploadedException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void uploadProfilePictureShouldThrowFileNotUploadedExceptionWhenFileNameIsNull()
      throws Exception {
    register();
    MockMultipartFile file =
        new MockMultipartFile("file", null, MediaType.IMAGE_JPEG_VALUE, "file content".getBytes());

    mockMvc
        .perform(
            multipart("/users/upload")
                .file(file)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    }))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(FileNotUploadedException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void uploadProfilePictureShouldThrowFileNotUploadedExceptionWhenFileNameIsEmpty()
      throws Exception {
    register();
    MockMultipartFile file =
        new MockMultipartFile("file", "", MediaType.IMAGE_JPEG_VALUE, "file content".getBytes());

    mockMvc
        .perform(
            multipart("/users/upload")
                .file(file)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    }))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(FileNotUploadedException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "user", roles = "USER")
  void uploadProfilePictureShouldThrowFileNotUploadedExceptionWhenUserFolderDoesNotExists()
      throws Exception {
    register();
    MockMultipartFile file =
        new MockMultipartFile(
            "file", "profile.png", MediaType.IMAGE_JPEG_VALUE, "file content".getBytes());

    mockMvc
        .perform(
            multipart("/users/upload")
                .file(file)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    }))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(FileNotUploadedException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void uploadProfilePictureShouldThrowInvalidCredentialsException() throws Exception {
    MockMultipartFile file =
        new MockMultipartFile("file", "", MediaType.IMAGE_JPEG_VALUE, "file content".getBytes());

    mockMvc
        .perform(
            multipart("/users/upload")
                .file(file)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    }))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(FileNotUploadedException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void uploadProfilePictureSuccessfully() throws Exception {
    register();
    MockMultipartFile file =
        new MockMultipartFile(
            "file", "profile.png", MediaType.IMAGE_JPEG_VALUE, "file content".getBytes());

    mockMvc
        .perform(
            multipart("/users/upload")
                .file(file)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    }))
        .andExpect(status().isOk());
  }

  private User getRegisteredUser() {
    Optional<User> registeredUser = userRepository.findByEmail(EMAIL);
    return registeredUser.orElse(null);
  }
}
