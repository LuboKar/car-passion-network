package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserTwo;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroupOne;
import static com.carpassionnetwork.helper.PostTestHelper.*;
import static org.hamcrest.Matchers.hasSize;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
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
import org.springframework.security.test.context.support.WithMockUser;

public class PostControllerIT extends BaseIT {
  private PostCreateRequestDto postCreateRequestDto;
  private PostEditRequestDto postEditRequestDto;
  private Post post;
  private User owner;
  private Group group;
  @Autowired private PostRepository postRepository;

  @BeforeEach
  void setUp() {
    postCreateRequestDto = createNewPostCreateRequest();
    post = createNewPost();
    owner = createUserTwo();
    postEditRequestDto = createNewPostEditRequest();
    group = createNewGroupOne();
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreatePostShouldThrowUserNotFoundExceptionWhenOwnerDoesNotExists() throws Exception {
    mockMvc
        .perform(
            post("/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postCreateRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(UserNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreatePostShouldThrowInvalidCredentialsExceptionWhenAuthorDoesNotExists()
      throws Exception {
    User savedOwner = createUser(owner);
    postCreateRequestDto.setOwner(savedOwner.getId());

    mockMvc
        .perform(
            post("/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postCreateRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(InvalidCredentialsException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreatePostShouldThrowGroupNotFoundException() throws Exception {
    register();
    User savedOwner = createUser(owner);
    postCreateRequestDto.setOwner(savedOwner.getId());
    postCreateRequestDto.setGroup(group.getId());

    mockMvc
        .perform(
            post("/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postCreateRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(GroupNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreatePostSuccessfully() throws Exception {
    User savedOwner = createUser(owner);
    postCreateRequestDto.setOwner(savedOwner.getId());
    register();

    mockMvc
        .perform(
            post("/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postCreateRequestDto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value(postCreateRequestDto.getTitle()))
        .andExpect(jsonPath("$.content").value(postCreateRequestDto.getContent()))
        .andExpect(jsonPath("$.currentUserLike").value(false));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreateGroupPostSuccessfully() throws Exception {
    User savedCurrentUser = createUser(currentUser);
    postCreateRequestDto.setOwner(savedCurrentUser.getId());
    group.setAdmin(savedCurrentUser);
    Group savedGroup = createGroup(group);
    postCreateRequestDto.setGroup(savedGroup.getId());

    mockMvc
        .perform(
            post("/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postCreateRequestDto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value(postCreateRequestDto.getTitle()))
        .andExpect(jsonPath("$.content").value(postCreateRequestDto.getContent()))
        .andExpect(jsonPath("$.currentUserLike").value(false));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testLikeOrUnlikePostShouldThrowInvalidCredentialsException() throws Exception {
    mockMvc
        .perform(post("/post/like/" + post.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(InvalidCredentialsException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testLikeOrUnlikePostShouldThrowPostNotFoundException() throws Exception {
    register();
    mockMvc
        .perform(post("/post/like/" + post.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(PostNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testLikeOrUnlikePostShouldLikePostSuccessfully() throws Exception {
    register();
    Post createdPost = createPost(post);

    mockMvc
        .perform(post("/post/like/" + createdPost.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value(createdPost.getTitle()))
        .andExpect(jsonPath("$.content").value(createdPost.getContent()))
        .andExpect(jsonPath("likes.length()").value(1))
        .andExpect(jsonPath("likes[0].firstName").value(currentUser.getFirstName()))
        .andExpect(jsonPath("likes[0].lastName").value(currentUser.getLastName()))
        .andExpect(jsonPath("likes[0].email").value(currentUser.getEmail()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testLikeOrUnlikePostShouldUnLikePostSuccessfully() throws Exception {
    User savedUser = createUser(currentUser);
    post.getLikes().add(savedUser);
    Post createdPost = createPost(post);

    mockMvc
        .perform(post("/post/like/" + createdPost.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value(createdPost.getTitle()))
        .andExpect(jsonPath("$.content").value(createdPost.getContent()))
        .andExpect(jsonPath("$.currentUserLike").value(false))
        .andExpect(jsonPath("likes.length()").value(0));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testGetAllPostsByUserIdSuccessfully() throws Exception {
    Post createdPost = createPost(post);
    currentUser.getLikedPosts().add(createdPost);
    register();

    mockMvc
        .perform(get("/post/user/" + currentUser.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray());
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testGetPostShouldThrowPostNotFoundException() throws Exception {
    mockMvc
        .perform(get("/post/" + post.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(PostNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testGetPostSuccessfully() throws Exception {
    Post createdPost = createPost(post);
    mockMvc
        .perform(get("/post/" + createdPost.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value(postCreateRequestDto.getTitle()))
        .andExpect(jsonPath("$.content").value(postCreateRequestDto.getContent()))
        .andExpect(jsonPath("$.currentUserLike").value(false));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testGetALLPostsReturnsEmptyListWhenThereAreNoPosts() throws Exception {
    mockMvc.perform(get("/post")).andExpect(status().isOk()).andExpect(content().json("[]"));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testGetALLPostsSuccessfully() throws Exception {
    createPost(post);
    User savedUser = createUser(owner);
    post.setUser(savedUser);
    post.setAuthor(savedUser);
    createPost(post);

    mockMvc.perform(get("/post")).andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testDeletePostShouldThrowInvalidCredentialsException() throws Exception {
    mockMvc
        .perform(delete("/post/delete/" + post.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(InvalidCredentialsException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testDeletePostShouldThrowPostNotFoundException() throws Exception {
    register();

    mockMvc
        .perform(delete("/post/delete/" + post.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(PostNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testDeletePostShouldThrowUserNotAuthorException() throws Exception {
    register();
    User savedUser = createUser(owner);
    post.setAuthor(savedUser);
    post.setUser(savedUser);
    Post savedPost = createPost(post);

    mockMvc
        .perform(delete("/post/delete/" + savedPost.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(UserNotAuthorException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testDeletePostSuccessfully() throws Exception {
    User savedUser = createUser(currentUser);
    post.setAuthor(savedUser);
    Post savedPost = createPost(post);

    mockMvc.perform(delete("/post/delete/" + savedPost.getId())).andExpect(status().isNoContent());
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testEditPostShouldThrowInvalidCredentialsException() throws Exception {
    postEditRequestDto.setPostId(UUID.randomUUID());

    mockMvc
        .perform(
            put("/post/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postEditRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(InvalidCredentialsException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testEditPostShouldThrowPostNotFoundException() throws Exception {
    register();
    postEditRequestDto.setPostId(UUID.randomUUID());

    mockMvc
        .perform(
            put("/post/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postEditRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(PostNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testEditPostShouldThrowUserNotAuthorException() throws Exception {
    register();
    User savedUser = createUser(owner);
    post.setAuthor(savedUser);
    Post savedPost = createPost(post);
    postEditRequestDto.setPostId(savedPost.getId());

    mockMvc
        .perform(
            put("/post/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postEditRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(UserNotAuthorException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testEditPostSuccessfully() throws Exception {
    User savedUser = createUser(currentUser);
    post.setAuthor(savedUser);
    Post savedPost = createPost(post);
    postEditRequestDto.setPostId(savedPost.getId());

    mockMvc
        .perform(
            put("/post/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postEditRequestDto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value(postEditRequestDto.getTitle()))
        .andExpect(jsonPath("$.content").value(postEditRequestDto.getContent()));
  }
}
