package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.PostTestHelper.createNewPost;
import static com.carpassionnetwork.helper.PostTestHelper.createNewPostRequest;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.carpassionnetwork.dto.request.PostRequestDto;
import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.exception.PostNotFoundException;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.repository.PostRepository;
import java.util.HashSet;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

public class PostControllerIT extends BaseIT {
  private PostRequestDto postRequestDto;
  private Post post;
  @Autowired private PostRepository postRepository;

  @BeforeEach
  void setUp() {
    postRequestDto = createNewPostRequest();
    post = createNewPost();
    currentUser.setLikedPosts(new HashSet<>());
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreatePostShouldThrowInvalidCredentialsException() throws Exception {
    mockMvc
        .perform(
            post("/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(InvalidCredentialsException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreatePostSuccessfully() throws Exception {
    register();

    mockMvc
        .perform(
            post("/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postRequestDto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.title").value(postRequestDto.getTitle()))
        .andExpect(jsonPath("$.content").value(postRequestDto.getContent()))
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
    Post createdPost = createPost();

    mockMvc
        .perform(post("/post/like/" + createdPost.getId()))
        .andExpect(status().isOk())
        .andExpect(content().string("Post liked successfully!"));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testLikeOrUnlikePostShouldUnLikePostSuccessfully() throws Exception {
    Post createdPost = createPost();
    currentUser.getLikedPosts().add(createdPost);
    register();

    mockMvc
        .perform(post("/post/like/" + createdPost.getId()))
        .andExpect(status().isOk())
        .andExpect(content().string("Post unliked successfully!"));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testGetAllPostsByUserIdSuccessfully() throws Exception {
    Post createdPost = createPost();
    currentUser.getLikedPosts().add(createdPost);
    register();

    mockMvc
        .perform(get("/post/user/" + currentUser.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$").isArray());
  }

  private Post createPost() {
    return postRepository.save(post);
  }
}
