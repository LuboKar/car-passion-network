package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserTwo;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroupOne;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroupTwo;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.carpassionnetwork.exception.FileNotUploadedException;
import com.carpassionnetwork.exception.GroupNotFoundException;
import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.exception.UserNotFoundException;
import com.carpassionnetwork.model.Group;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.service.GroupService;
import java.io.IOException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;

public class GroupControllerIT extends BaseIT {

  private Group groupOne;
  private Group groupTwo;
  private User user;
  @Autowired private GroupService groupService;

  @BeforeEach
  void setUp() throws IOException {
    groupOne = createNewGroupOne();
    groupTwo = createNewGroupTwo();
    user = createUserTwo();
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void createGroupShouldThrowInvalidCredentialsException() throws Exception {
    mockMvc
        .perform(post("/group/" + groupOne.getName()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(InvalidCredentialsException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void createGroupSuccessfully() throws Exception {
    register();

    mockMvc
        .perform(post("/group/" + groupOne.getName()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value(groupOne.getName()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void getGroupShouldThrowGroupNotFoundException() throws Exception {
    register();

    mockMvc
        .perform(get("/group/" + groupOne.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(GroupNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void getGroupSuccessfully() throws Exception {
    register();
    Group savedGroup = createGroup(groupOne);

    mockMvc
        .perform(get("/group/" + savedGroup.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value(savedGroup.getName()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void getAllGroupsByAdminIdShouldReturnEmptyArray() throws Exception {
    User savedUser = createUser(currentUser);

    mockMvc
        .perform(get("/group/admin/" + savedUser.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(0));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void getAllGroupsByAdminIdSuccessfully() throws Exception {
    User savedUser = createUser(currentUser);
    groupOne.setAdmin(savedUser);
    groupTwo.setAdmin(savedUser);
    createGroup(groupOne);
    createGroup(groupTwo);

    mockMvc
        .perform(get("/group/admin/" + savedUser.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(2));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void getAllOtherGroupsSuccessfully() throws Exception {
    User savedCurrentUser = createUser(currentUser);
    User savedUser = createUser(user);
    groupOne.setAdmin(savedUser);
    groupTwo.setAdmin(savedUser);
    createGroup(groupOne);
    createGroup(groupTwo);

    mockMvc
        .perform(get("/group/other/" + savedCurrentUser.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(2));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void getUserParticipatingGroupsSuccessfully() throws Exception {
    User savedCurrentUser = createUser(currentUser);
    User savedUser = createUser(user);
    groupOne.setAdmin(savedUser);
    groupTwo.setAdmin(savedUser);
    groupOne.getMembers().add(savedCurrentUser);
    groupTwo.getMembers().add(savedCurrentUser);
    createGroup(groupOne);
    createGroup(groupTwo);

    mockMvc
        .perform(get("/group/user/" + savedCurrentUser.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$.length()").value(2));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void joinGroupShouldThrowInvalidCredentialsException() throws Exception {
    mockMvc
        .perform(post("/group/join/" + groupOne.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(InvalidCredentialsException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void joinGroupShouldThrowGroupNotFoundException() throws Exception {
    register();

    mockMvc
        .perform(post("/group/join/" + groupOne.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(GroupNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void joinGroupSuccessfully() throws Exception {
    User savedCurrentUser = createUser(currentUser);
    groupOne.setAdmin(savedCurrentUser);
    Group savedGroup = createGroup(groupOne);

    mockMvc
        .perform(post("/group/join/" + savedGroup.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(savedGroup.getId().toString()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void leaveGroupShouldThrowInvalidCredentialsException() throws Exception {
    mockMvc
        .perform(post("/group/leave/" + groupOne.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(InvalidCredentialsException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void leaveGroupShouldThrowGroupNotFoundException() throws Exception {
    register();

    mockMvc
        .perform(post("/group/leave/" + groupOne.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(GroupNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void leaveGroupSuccessfully() throws Exception {
    User savedCurrentUser = createUser(currentUser);
    groupOne.setAdmin(savedCurrentUser);
    groupOne.getMembers().add(savedCurrentUser);
    Group savedGroup = createGroup(groupOne);

    mockMvc.perform(post("/group/leave/" + savedGroup.getId())).andExpect(status().isOk());
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void removeMemberShouldThrowGroupNotFoundException() throws Exception {
    mockMvc
        .perform(post("/group/remove/" + groupOne.getId() + "/" + user.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(GroupNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void removeMemberShouldThrowUserNotFoundException() throws Exception {
    Group savedGroup = createGroup(groupOne);

    mockMvc
        .perform(post("/group/remove/" + savedGroup.getId() + "/" + user.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(UserNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void removeMemberSuccessfully() throws Exception {
    User savedUser = createUser(user);
    groupOne.getMembers().add(savedUser);
    Group savedGroup = createGroup(groupOne);

    mockMvc
        .perform(post("/group/remove/" + savedGroup.getId() + "/" + savedUser.getId()))
        .andExpect(status().isOk());
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void uploadGroupPictureShouldThrowFileNotUploadedExceptionWhenFileIsFileIsEmpty()
      throws Exception {
    register();
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
                    }))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(FileNotUploadedException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void uploadGroupPictureShouldThrowFileNotUploadedExceptionWhenFileNameIsNull() throws Exception {
    register();
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
                    }))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(FileNotUploadedException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void uploadGroupPictureShouldThrowFileNotUploadedExceptionWhenFileNameIsEmpty() throws Exception {
    register();
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
                    }))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(FileNotUploadedException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "user", roles = "USER")
  void uploadGroupPictureShouldThrowGroupNotFoundException() throws Exception {
    register();
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
                    }))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(GroupNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "user", roles = "USER")
  void uploadGroupPictureShouldThrowFileNotUploadedExceptionWhenUserFolderDoesNotExists()
      throws Exception {
    register();
    Group savedGroup = createGroup(groupOne);
    MockMultipartFile file =
        new MockMultipartFile(
            "file", "groupPicture.png", MediaType.IMAGE_JPEG_VALUE, "file content".getBytes());

    mockMvc
        .perform(
            multipart("/group/upload/" + savedGroup.getId())
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
  void uploadGroupPictureSuccessfully() throws Exception {
    register();
    Group savedGroup = groupService.createGroup("Group Name");
    MockMultipartFile file =
        new MockMultipartFile(
            "file", "groupPicture.png", MediaType.IMAGE_PNG_VALUE, "file content".getBytes());

    mockMvc
        .perform(
            multipart("/group/upload/" + savedGroup.getId())
                .file(file)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .with(
                    request -> {
                      request.setMethod("PUT");
                      return request;
                    }))
        .andExpect(status().isOk());
  }
}
