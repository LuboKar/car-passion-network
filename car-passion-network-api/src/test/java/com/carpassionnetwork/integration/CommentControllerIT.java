package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.CommentTestHelper.createNewCommentRequestDto;
import static com.carpassionnetwork.helper.PostTestHelper.createNewPost;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.carpassionnetwork.dto.request.CommentRequestDto;
import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.exception.PostNotFoundException;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.repository.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

public class CommentControllerIT extends BaseIT {
  private CommentRequestDto commentRequestDto;
  private Post post;

  @Autowired private PostRepository postRepository;

  @BeforeEach
  void setUp() {
    commentRequestDto = createNewCommentRequestDto();
    post = createNewPost();
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreateCommentShouldThrowInvalidCredentialsException() throws Exception {
    mockMvc
        .perform(
            post("/comment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(InvalidCredentialsException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreateCommentShouldThrowPostNotFoundException() throws Exception {
    register();
    mockMvc
        .perform(
            post("/comment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(PostNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreateCommentSuccessfully() throws Exception {
    register();
    Post createdPost = createPost();
    commentRequestDto.setPostId(createdPost.getId());

    mockMvc
        .perform(
            post("/comment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value(commentRequestDto.getContent()));
  }

  private Post createPost() {
    return postRepository.save(post);
  }
}
