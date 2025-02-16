package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.EMAIL;
import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserTwo;
import static com.carpassionnetwork.helper.CommentTestHelper.createNewCommentOne;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroupOne;
import static com.carpassionnetwork.helper.PostTestHelper.*;
import static com.carpassionnetwork.helper.UserTestHelper.createUserEditRequest;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.carpassionnetwork.dto.request.UserEditRequest;
import com.carpassionnetwork.exception.ValidationException;
import com.carpassionnetwork.model.*;
import com.carpassionnetwork.repository.CommentRepository;
import com.carpassionnetwork.repository.PostRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Set;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.io.TempDir;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.test.context.support.WithMockUser;

public class UserControllerIT extends BaseIT {
  @TempDir Path tempDir;
  private UserEditRequest userEditRequest;
  private User secondUser;
  private Post post;
  private Comment comment;
  private Group group;

  @Autowired private PostRepository postRepository;
  @Autowired private CommentRepository commentRepository;

  @BeforeEach
  void setUp() throws IOException {
    Path customTempDir = tempDir.resolve(currentUser.getEmail());
    Files.createDirectories(customTempDir);
    userEditRequest = createUserEditRequest();
    secondUser = createUserTwo();
    post = createNewPost();
    comment = createNewCommentOne();
    group = createNewGroupOne();
  }

  @Test
  @WithMockUser(username = "user", roles = "USER")
  void getUserShouldThrowValidationExceptionWhenUserNotFound() throws Exception {
    mockMvc
        .perform(get("/users/" + currentUser.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void getUserSuccessfully() throws Exception {
    User registeredUser = createUser(currentUser);

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
  void uploadProfilePictureShouldThrowValidationExceptionWhenFileIsEmpty() throws Exception {
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
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void uploadProfilePictureShouldThrowValidationExceptionWhenFileNameIsNull() throws Exception {
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
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void uploadProfilePictureShouldThrowValidationExceptionWhenFileNameIsEmpty() throws Exception {
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
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "user", roles = "USER")
  void uploadProfilePictureShouldThrowValidationExceptionWhenUserFolderDoesNotExists()
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
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void uploadProfilePictureShouldThrowValidationExceptionWhenInvalidCredentials() throws Exception {
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
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
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

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void editUserShouldThrowValidationExceptionWhenInvalidCredentials() throws Exception {
    mockMvc
        .perform(
            patch("/users/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(userEditRequest)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void editUserShouldThrowValidationExceptionWhenInvalidPassword() throws Exception {
    register();
    userEditRequest.setOldPassword("pass");
    userEditRequest.setNewPassword("password");

    mockMvc
        .perform(
            patch("/users/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(userEditRequest)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void editUserSuccessfully() throws Exception {
    register();

    mockMvc
        .perform(
            patch("/users/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(userEditRequest)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.firstName").value(userEditRequest.getFirstName()))
        .andExpect(jsonPath("$.lastName").value(userEditRequest.getLastName()))
        .andExpect(jsonPath("$.dateOfBirth").value(currentUser.getDateOfBirth().toString()))
        .andExpect(jsonPath("$.email").value(currentUser.getEmail()))
        .andExpect(jsonPath("$.gender").value(currentUser.getGender().toString()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void addFriendShouldThrowValidationExceptionWhenInvalidCredentials() throws Exception {
    mockMvc
        .perform(post("/users/friends/" + secondUser.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void addFriendShouldThrowValidationExceptionWhenUserNotFound() throws Exception {
    register();

    mockMvc
        .perform(post("/users/friends/" + secondUser.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void addFriendSuccessfully() throws Exception {
    register();
    User savedSecondUser = createUser(secondUser);

    mockMvc.perform(post("/users/friends/" + savedSecondUser.getId())).andExpect(status().isOk());
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void removeFriendShouldThrowValidationExceptionWhenInvalidCredentials() throws Exception {
    mockMvc
        .perform(delete("/users/friends/" + secondUser.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void removeFriendShouldThrowValidationExceptionWhenUserNotFound() throws Exception {
    register();

    mockMvc
        .perform(delete("/users/friends/" + secondUser.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void removeFriendSuccessfully() throws Exception {
    register();
    User savedSecondUser = createUser(secondUser);

    mockMvc.perform(delete("/users/friends/" + savedSecondUser.getId())).andExpect(status().isOk());
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void getFriendShouldReturnEmptyList() throws Exception {
    User savedCurrentUser = createUser(currentUser);

    mockMvc
        .perform(get("/users/friends/" + savedCurrentUser.getId()))
        .andExpect(status().isOk())
        .andExpect(content().json("[]"));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void getFriendSuccessfully() throws Exception {
    User savedCurrentUser = createUser(currentUser);
    User savedSecondUser = createUser(secondUser);
    savedCurrentUser.getFriends().add(savedSecondUser);
    savedSecondUser.getFriends().add(savedCurrentUser);
    createUser(savedCurrentUser);

    mockMvc
        .perform(get("/users/friends/" + savedCurrentUser.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(1))
        .andExpect(jsonPath("$[0].id").value(savedSecondUser.getId().toString()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void findUsersByFullNameStartsWithShouldReturnEmptyArray() throws Exception {
    String term = "aa";

    mockMvc
        .perform(get("/users/findBy/" + term))
        .andExpect(status().isOk())
        .andExpect(content().json("[]"));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void findUsersByFullNameStartsWithSuccessfully() throws Exception {
    String term = "j";
    User savedCurrentUser = createUser(currentUser);
    User savedSecondUser = createUser(secondUser);

    mockMvc
        .perform(get("/users/findBy/" + term))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(2))
        .andExpect(jsonPath("$[0].id").value(savedCurrentUser.getId().toString()))
        .andExpect(jsonPath("$[1].id").value(savedSecondUser.getId().toString()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void deleteUserShouldThrowValidationExceptionWhenUserNotFound() throws Exception {
    mockMvc
        .perform(delete("/users/" + currentUser.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void deleteUserSuccessfully() throws Exception {
    User savedSecondUser = createUser(secondUser);
    Post savedPost = createPost(post);
    Comment savedComment = creteComment(comment);
    User savedCurrentUser = createUser(currentUser);
    savedCurrentUser.setLikedPosts(Set.of(savedPost));
    savedCurrentUser.setLikedComments(Set.of(savedComment));
    savedCurrentUser.setFriends(Set.of(savedSecondUser));

    mockMvc.perform(delete("/users/" + savedCurrentUser.getId())).andExpect(status().isNoContent());
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void getAllGroupMembersShouldReturnEmptyList() throws Exception {
    User savedCurrentUser = createUser(currentUser);
    group.setAdmin(savedCurrentUser);
    Group savedGroup = createGroup(group);

    mockMvc
        .perform(get("/users/group/" + savedGroup.getId() + "/members"))
        .andExpect(status().isOk())
        .andExpect(content().json("[]"));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void getGroupMembersSuccessfully() throws Exception {
    User savedCurrentUser = createUser(currentUser);
    User savedSecondUser = createUser(secondUser);
    group.setAdmin(savedCurrentUser);
    group.getMembers().add(savedSecondUser);
    Group savedGroup = createGroup(group);

    mockMvc
        .perform(get("/users/group/" + savedGroup.getId() + "/members"))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(1))
        .andExpect(jsonPath("$[0].id").value(savedSecondUser.getId().toString()));
  }
}
