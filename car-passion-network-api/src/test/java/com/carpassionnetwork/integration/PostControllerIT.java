package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserTwo;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroupOne;
import static com.carpassionnetwork.helper.PostTestHelper.*;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.carpassionnetwork.dto.request.PostCreateRequestDto;
import com.carpassionnetwork.dto.request.PostEditRequestDto;
import com.carpassionnetwork.exception.*;
import com.carpassionnetwork.model.Group;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.PostRepository;
import java.util.UUID;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;

public class PostControllerIT extends BaseIT {
  private PostCreateRequestDto postCreateRequestDto;
  private PostEditRequestDto postEditRequestDto;
  private Post post;
  private User owner;
  private Group group;
  @Autowired private PostRepository postRepository;

  @BeforeEach
  void setUp() {
    register();
    postCreateRequestDto = createNewPostCreateRequest();
    post = createNewPost();
    owner = createUserTwo();
    postEditRequestDto = createNewPostEditRequest();
    group = createNewGroupOne();
  }

  @Test
  void testCreatePostShouldThrowValidationExceptionWhenOwnerDoesNotExists() throws Exception {
    mockMvc
        .perform(
            post("/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postCreateRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testCreatePostShouldThrowValidationExceptionWhenGroupNotFound() throws Exception {
    User savedOwner = createUser(owner);
    postCreateRequestDto.setOwner(savedOwner.getId());
    postCreateRequestDto.setGroup(group.getId());

    mockMvc
        .perform(
            post("/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postCreateRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testCreatePostSuccessfully() throws Exception {
    User savedOwner = createUser(owner);
    postCreateRequestDto.setOwner(savedOwner.getId());

    mockMvc
        .perform(
            post("/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postCreateRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value(postCreateRequestDto.getTitle()))
        .andExpect(jsonPath("$.content").value(postCreateRequestDto.getContent()))
        .andExpect(jsonPath("$.currentUserLike").value(false));
  }

  @Test
  void testCreateGroupPostSuccessfully() throws Exception {
    postCreateRequestDto.setOwner(currentUser.getId());
    group.setAdmin(currentUser);
    Group savedGroup = createGroup(group);
    postCreateRequestDto.setGroup(savedGroup.getId());

    mockMvc
        .perform(
            post("/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postCreateRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value(postCreateRequestDto.getTitle()))
        .andExpect(jsonPath("$.content").value(postCreateRequestDto.getContent()))
        .andExpect(jsonPath("$.currentUserLike").value(false));
  }

  @Test
  void testLikeOrUnlikePostShouldThrowValidationExceptionWhenInvalidCredentials() throws Exception {
    mockMvc
        .perform(post("/post/like/" + post.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testLikeOrUnlikePostShouldThrowValidationExceptionWhenPostNotFound() throws Exception {
    mockMvc
        .perform(post("/post/like/" + post.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testLikeOrUnlikePostShouldLikePostSuccessfully() throws Exception {
    Post createdPost = createPost(post);

    mockMvc
        .perform(post("/post/like/" + createdPost.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value(createdPost.getTitle()))
        .andExpect(jsonPath("$.content").value(createdPost.getContent()))
        .andExpect(jsonPath("likes.length()").value(1))
        .andExpect(jsonPath("likes[0].firstName").value(currentUser.getFirstName()))
        .andExpect(jsonPath("likes[0].lastName").value(currentUser.getLastName()))
        .andExpect(jsonPath("likes[0].email").value(currentUser.getEmail()));
  }

  @Test
  void testLikeOrUnlikePostShouldUnLikePostSuccessfully() throws Exception {
    post.getLikes().add(currentUser);
    Post createdPost = createPost(post);

    mockMvc
        .perform(post("/post/like/" + createdPost.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value(createdPost.getTitle()))
        .andExpect(jsonPath("$.content").value(createdPost.getContent()))
        .andExpect(jsonPath("$.currentUserLike").value(false))
        .andExpect(jsonPath("likes.length()").value(0));
  }

  @Test
  void testGetAllPostsByUserIdSuccessfully() throws Exception {
    Post createdPost = createPost(post);
    currentUser.getLikedPosts().add(createdPost);

    mockMvc
        .perform(get("/post/user/" + currentUser.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray());
  }

  @Test
  void testGetAllPostsByGroupIdSuccessfully() throws Exception {
    group.setAdmin(currentUser);
    Group savedGroup = createGroup(group);
    Post createdPost = createPost(post);
    createdPost.setGroup(savedGroup);

    mockMvc
        .perform(get("/post/group/" + savedGroup.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray())
        .andExpect(jsonPath("$[0].id").value(createdPost.getId().toString()));
  }

  @Test
  void testGetPostShouldThrowValidationExceptionWhenPostNotFound() throws Exception {
    mockMvc
        .perform(get("/post/" + post.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testGetPostSuccessfully() throws Exception {
    Post createdPost = createPost(post);

    mockMvc
        .perform(get("/post/" + createdPost.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value(postCreateRequestDto.getTitle()))
        .andExpect(jsonPath("$.content").value(postCreateRequestDto.getContent()))
        .andExpect(jsonPath("$.currentUserLike").value(false));
  }

  @Test
  void testGetALLPostsReturnsEmptyListWhenThereAreNoPosts() throws Exception {
    mockMvc
        .perform(get("/post").with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(content().json("[]"));
  }

  @Test
  void testGetALLPostsSuccessfully() throws Exception {
    createPost(post);
    User savedUser = createUser(owner);
    post.setUser(savedUser);
    post.setAuthor(savedUser);
    createPost(post);

    mockMvc
        .perform(get("/post").with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$", hasSize(1)));
  }

  @Test
  void testDeletePostShouldThrowValidationExceptionWhenInvalidCredentials() throws Exception {
    mockMvc
        .perform(delete("/post/delete/" + post.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testDeletePostShouldThrowValidationExceptionWhenPostNotFound() throws Exception {
    mockMvc
        .perform(delete("/post/delete/" + post.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testDeletePostShouldThrowValidationExceptionWhenUserNotAuthor() throws Exception {
    User savedUser = createUser(owner);
    post.setAuthor(savedUser);
    post.setUser(savedUser);
    Post savedPost = createPost(post);

    mockMvc
        .perform(delete("/post/delete/" + savedPost.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testDeletePostSuccessfully() throws Exception {
    post.setAuthor(currentUser);
    Post savedPost = createPost(post);

    mockMvc
        .perform(delete("/post/delete/" + savedPost.getId()).with(user(currentUser)))
        .andExpect(status().isNoContent());
  }

  @Test
  void testEditPostShouldThrowValidationExceptionWhenInvalidCredentials() throws Exception {
    postEditRequestDto.setPostId(UUID.randomUUID());

    mockMvc
        .perform(
            put("/post/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postEditRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testEditPostShouldThrowValidationExceptionWhenPostNotFound() throws Exception {
    postEditRequestDto.setPostId(UUID.randomUUID());

    mockMvc
        .perform(
            put("/post/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postEditRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testEditPostShouldThrowValidationExceptionWhenUserNotAuthor() throws Exception {
    User savedUser = createUser(owner);
    post.setAuthor(savedUser);
    Post savedPost = createPost(post);
    postEditRequestDto.setPostId(savedPost.getId());

    mockMvc
        .perform(
            put("/post/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postEditRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testEditPostSuccessfully() throws Exception {
    post.setAuthor(currentUser);
    Post savedPost = createPost(post);
    postEditRequestDto.setPostId(savedPost.getId());

    mockMvc
        .perform(
            put("/post/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postEditRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value(postEditRequestDto.getTitle()))
        .andExpect(jsonPath("$.content").value(postEditRequestDto.getContent()));
  }
}
