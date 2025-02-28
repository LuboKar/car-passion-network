package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserTwo;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroupOne;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroupTwo;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.carpassionnetwork.exception.ValidationException;
import com.carpassionnetwork.model.Group;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.service.GroupService;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;

public class GroupControllerIT extends BaseIT {
  private static final String PARENT_DIRECTORY = "GroupPictures";
  private Group groupOne;
  private Group groupTwo;
  private User user;
  private String path;
  @Autowired private GroupService groupService;

  @BeforeEach
  void setUp() throws IOException {
    register();
    groupOne = createNewGroupOne();
    groupOne.setAdmin(currentUser);
    groupOne = createGroup(groupOne);
    path = PARENT_DIRECTORY + "/" + groupOne.getId();
    Files.createDirectories(Path.of(path));
    groupTwo = createNewGroupTwo();
    user = createUserTwo();
  }

  @Test
  void createGroupSuccessfully() throws Exception {
    mockMvc
        .perform(post("/group/" + groupTwo.getName()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value(groupTwo.getName()));
  }

  @Test
  void getGroupShouldThrowValidationExceptionWhenGroupNotFound() throws Exception {
    mockMvc
        .perform(get("/group/" + groupTwo.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void getGroupSuccessfully() throws Exception {
    mockMvc
        .perform(get("/group/" + groupOne.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value(groupOne.getName()));
  }

  @Test
  void getAllGroupsByAdminIdShouldReturnEmptyArray() throws Exception {
    User savedUser = createUser(user);

    mockMvc
        .perform(get("/group/admin/" + savedUser.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(0));
  }

  @Test
  void getAllGroupsByAdminIdSuccessfully() throws Exception {
    groupOne.setAdmin(currentUser);
    groupTwo.setAdmin(currentUser);
    createGroup(groupOne);
    createGroup(groupTwo);

    mockMvc
        .perform(get("/group/admin/" + currentUser.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(2));
  }

  @Test
  void getAllOtherGroupsSuccessfully() throws Exception {
    User savedUser = createUser(user);
    groupOne.setAdmin(savedUser);
    groupTwo.setAdmin(savedUser);
    createGroup(groupOne);
    createGroup(groupTwo);

    mockMvc
        .perform(get("/group/other/" + currentUser.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(2));
  }

  @Test
  void getUserParticipatingGroupsSuccessfully() throws Exception {
    groupOne.setAdmin(currentUser);
    groupTwo.setAdmin(currentUser);
    groupOne.getMembers().add(currentUser);
    groupTwo.getMembers().add(currentUser);
    createGroup(groupOne);
    createGroup(groupTwo);

    mockMvc
        .perform(get("/group/user/" + currentUser.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(2));
  }

  @Test
  void joinGroupShouldThrowValidationExceptionWhenGroupNotFound() throws Exception {
    mockMvc
        .perform(post("/group/join/" + groupTwo.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void joinGroupSuccessfully() throws Exception {
    mockMvc
        .perform(post("/group/join/" + groupOne.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(groupOne.getId().toString()));
  }

  @Test
  void leaveGroupShouldThrowValidationExceptionWhenGroupNotFound() throws Exception {
    mockMvc
        .perform(post("/group/leave/" + groupTwo.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void leaveGroupSuccessfully() throws Exception {
    groupOne.getMembers().add(currentUser);
    Group savedGroup = createGroup(groupOne);

    mockMvc
        .perform(post("/group/leave/" + savedGroup.getId()).with(user(currentUser)))
        .andExpect(status().isOk());
  }

  @Test
  void removeMemberShouldThrowValidationExceptionWhenGroupNotFound() throws Exception {
    mockMvc
        .perform(
            post("/group/remove/" + groupOne.getId() + "/" + user.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void removeMemberShouldThrowValidationExceptionWhenUserNotFound() throws Exception {
    mockMvc
        .perform(
            post("/group/remove/" + groupOne.getId() + "/" + user.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void removeMemberSuccessfully() throws Exception {
    groupOne.getMembers().add(currentUser);
    Group savedGroup = createGroup(groupOne);

    mockMvc
        .perform(
            post("/group/remove/" + savedGroup.getId() + "/" + currentUser.getId())
                .with(user(currentUser)))
        .andExpect(status().isOk());
  }

  @Test
  void uploadGroupPictureShouldThrowValidationExceptionWhenFileIsEmpty() throws Exception {
    MockMultipartFile file =
        new MockMultipartFile(
            "file", "groupPicture.png", MediaType.IMAGE_JPEG_VALUE, "".getBytes());

    mockMvc
        .perform(
            multipart("/group/upload/" + groupOne.getId())
                .file(file)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    })
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void uploadGroupPictureShouldThrowValidationExceptionWhenFileNameIsNull() throws Exception {
    MockMultipartFile file =
        new MockMultipartFile("file", null, MediaType.IMAGE_JPEG_VALUE, "file content".getBytes());

    mockMvc
        .perform(
            multipart("/group/upload/" + groupOne.getId())
                .file(file)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    })
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void uploadGroupPictureShouldThrowValidationExceptionWhenFileNameIsEmpty() throws Exception {
    MockMultipartFile file =
        new MockMultipartFile("file", "", MediaType.IMAGE_JPEG_VALUE, "file content".getBytes());

    mockMvc
        .perform(
            multipart("/group/upload/" + groupOne.getId())
                .file(file)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    })
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void uploadGroupPictureShouldThrowValidationExceptionWhenGroupNotFound() throws Exception {
    MockMultipartFile file =
        new MockMultipartFile(
            "file", "groupPicture.png", MediaType.IMAGE_JPEG_VALUE, "file content".getBytes());

    mockMvc
        .perform(
            multipart("/group/upload/" + groupTwo.getId())
                .file(file)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    })
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void uploadGroupPictureShouldThrowValidationExceptionWhenUserFolderDoesNotExists()
      throws Exception {
    File directory = new File(path);
    directory.delete();
    MockMultipartFile file =
        new MockMultipartFile(
            "file", "groupPicture.png", MediaType.IMAGE_JPEG_VALUE, "file content".getBytes());

    mockMvc
        .perform(
            multipart("/group/upload/" + groupOne.getId())
                .file(file)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    })
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void uploadGroupPictureSuccessfully() throws Exception {
    MockMultipartFile file =
        new MockMultipartFile(
            "file", "groupPicture.png", MediaType.IMAGE_PNG_VALUE, "file content".getBytes());

    mockMvc
        .perform(
            multipart("/group/upload/" + groupOne.getId())
                .file(file)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    })
                .with(user(currentUser)))
        .andExpect(status().isOk());
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
