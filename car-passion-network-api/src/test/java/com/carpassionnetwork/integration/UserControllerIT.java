package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.*;
import static com.carpassionnetwork.helper.CommentTestHelper.createNewCommentOne;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroupOne;
import static com.carpassionnetwork.helper.PostTestHelper.*;
import static com.carpassionnetwork.helper.UserTestHelper.createUserEditRequest;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.carpassionnetwork.dto.request.UserEditRequest;
import com.carpassionnetwork.exception.ValidationException;
import com.carpassionnetwork.model.*;
import com.carpassionnetwork.repository.CommentRepository;
import com.carpassionnetwork.repository.PostRepository;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Comparator;
import java.util.Set;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserControllerIT extends BaseIT {
  private static final String PARENT_DIRECTORY = "ProfilePictures";
  private UserEditRequest userEditRequest;
  private User secondUser;
  private Post post;
  private Comment comment;
  private Group group;
  private String path;

  @Autowired private PostRepository postRepository;
  @Autowired private CommentRepository commentRepository;
  @Autowired private PasswordEncoder passwordEncoder;

  @BeforeEach
  void setUp() throws IOException {
    register();
    path = PARENT_DIRECTORY + "/" + currentUser.getEmail();
    Files.createDirectories(Path.of(path));
    userEditRequest = createUserEditRequest();
    secondUser = createUserTwo();
    post = createNewPost();
    comment = createNewCommentOne();
    group = createNewGroupOne();
  }

  @Test
  void getUserShouldThrowValidationExceptionWhenUserNotFound() throws Exception {
    mockMvc
        .perform(get("/users/" + secondUser.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void getUserSuccessfully() throws Exception {
    mockMvc
        .perform(get("/users/" + currentUser.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(currentUser.getId().toString()))
        .andExpect(jsonPath("$.firstName").value(currentUser.getFirstName()))
        .andExpect(jsonPath("$.lastName").value(currentUser.getLastName()))
        .andExpect(jsonPath("$.dateOfBirth").value(currentUser.getDateOfBirth().toString()))
        .andExpect(jsonPath("$.email").value(EMAIL))
        .andExpect(jsonPath("$.gender").value(Gender.MALE.toString()));
  }

  @Test
  void uploadProfilePictureShouldThrowValidationExceptionWhenFileIsEmpty() throws Exception {
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
                    })
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void uploadProfilePictureShouldThrowValidationExceptionWhenFileNameIsNull() throws Exception {
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
                    })
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void uploadProfilePictureShouldThrowValidationExceptionWhenFileNameIsEmpty() throws Exception {
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
                    })
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void uploadProfilePictureShouldThrowValidationExceptionWhenUserFolderDoesNotExists()
      throws Exception {
    currentUser.setEmail("smth");

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
                    })
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
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
                    })
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void uploadProfilePictureSuccessfully() throws Exception {
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
                    })
                .with(user(currentUser)))
        .andExpect(status().isOk());
  }

  @Test
  void editUserShouldThrowValidationExceptionWhenInvalidPassword() throws Exception {
    userEditRequest.setOldPassword("pass");
    userEditRequest.setNewPassword("password");

    mockMvc
        .perform(
            patch("/users/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(userEditRequest))
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void editUserSuccessfully() throws Exception {
    mockMvc
        .perform(
            patch("/users/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(userEditRequest))
                .with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.firstName").value(userEditRequest.getFirstName()))
        .andExpect(jsonPath("$.lastName").value(userEditRequest.getLastName()))
        .andExpect(jsonPath("$.dateOfBirth").value(currentUser.getDateOfBirth().toString()))
        .andExpect(jsonPath("$.email").value(currentUser.getEmail()))
        .andExpect(jsonPath("$.gender").value(currentUser.getGender().toString()));
  }

  @Test
  void addFriendSuccessfully() throws Exception {
    User savedSecondUser = createUser(secondUser);

    mockMvc
        .perform(post("/users/friends/" + savedSecondUser.getId()).with(user(currentUser)))
        .andExpect(status().isOk());
  }

  @Test
  void removeFriendSuccessfully() throws Exception {
    User savedSecondUser = createUser(secondUser);
    userRepository.addFriend(currentUser.getId(), savedSecondUser.getId());

    mockMvc
        .perform(delete("/users/friends/" + savedSecondUser.getId()).with(user(currentUser)))
        .andExpect(status().isNoContent());
  }

  @Test
  void getFriendShouldReturnEmptyList() throws Exception {
    mockMvc
        .perform(get("/users/friends/" + currentUser.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(content().json("[]"));
  }

  @Test
  void getFriendSuccessfully() throws Exception {
    User savedSecondUser = createUser(secondUser);
    currentUser.getFriends().add(savedSecondUser);
    savedSecondUser.getFriends().add(currentUser);
    createUser(currentUser);

    mockMvc
        .perform(get("/users/friends/" + currentUser.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(1))
        .andExpect(jsonPath("$[0].id").value(savedSecondUser.getId().toString()));
  }

  @Test
  void findUsersByFullNameStartsWithShouldReturnEmptyArray() throws Exception {
    String term = "aa";

    mockMvc
        .perform(get("/users/findBy/" + term).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(content().json("[]"));
  }

  @Test
  void findUsersByFullNameStartsWithSuccessfully() throws Exception {
    String term = "j";
    User savedSecondUser = createUser(secondUser);

    mockMvc
        .perform(get("/users/findBy/" + term).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(2))
        .andExpect(jsonPath("$[0].id").value(currentUser.getId().toString()))
        .andExpect(jsonPath("$[1].id").value(savedSecondUser.getId().toString()));
  }

  @Test
  void deleteUserShouldThrowValidationExceptionWhenUserNotFound() throws Exception {
    mockMvc
        .perform(delete("/users/" + secondUser.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void deleteUserSuccessfully() throws Exception {
    User savedSecondUser = createUser(secondUser);
    Post savedPost = createPost(post);
    Comment savedComment = creteComment(comment);
    currentUser.setLikedPosts(Set.of(savedPost));
    currentUser.setLikedComments(Set.of(savedComment));
    currentUser.setFriends(Set.of(savedSecondUser));

    mockMvc
        .perform(delete("/users/" + currentUser.getId()).with(user(currentUser)))
        .andExpect(status().isNoContent());
  }

  @Test
  void getAllGroupMembersShouldReturnEmptyList() throws Exception {
    group.setAdmin(currentUser);
    Group savedGroup = createGroup(group);

    mockMvc
        .perform(get("/users/group/" + savedGroup.getId() + "/members").with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(content().json("[]"));
  }

  @Test
  void getGroupMembersSuccessfully() throws Exception {
    User savedSecondUser = createUser(secondUser);
    group.setAdmin(currentUser);
    group.getMembers().add(savedSecondUser);
    Group savedGroup = createGroup(group);

    mockMvc
        .perform(get("/users/group/" + savedGroup.getId() + "/members").with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.length()").value(1))
        .andExpect(jsonPath("$[0].id").value(savedSecondUser.getId().toString()));
  }

  @Test
  void areFriendsShouldReturnTrueWhenUsersAreFriends() throws Exception {
    User savedSecondUser = createUser(secondUser);
    userRepository.addFriend(currentUser.getId(), savedSecondUser.getId());

    mockMvc
        .perform(
            get("/users/" + currentUser.getId() + "/friends/" + savedSecondUser.getId())
                .with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(content().string("true"));
  }

  @Test
  void areFriendsShouldReturnFalseWhenUsersAreNotFriends() throws Exception {
    User savedSecondUser = createUser(secondUser);

    mockMvc
        .perform(
            get("/users/" + currentUser.getId() + "/friends/" + savedSecondUser.getId())
                .with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(content().string("false"));
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
