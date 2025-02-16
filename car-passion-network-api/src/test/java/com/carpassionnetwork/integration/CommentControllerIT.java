package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;
import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserTwo;
import static com.carpassionnetwork.helper.CommentTestHelper.*;
import static com.carpassionnetwork.helper.PostTestHelper.createNewPost;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.carpassionnetwork.dto.request.CommentEditRequestDto;
import com.carpassionnetwork.dto.request.CommentRequestDto;
import com.carpassionnetwork.exception.ValidationException;
import com.carpassionnetwork.model.Comment;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import java.util.Set;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

public class CommentControllerIT extends BaseIT {
  private CommentRequestDto commentRequestDto;
  private CommentEditRequestDto commentEditRequestDto;
  private Post post;
  private Comment comment;
  private User user;
  private User secondUser;

  @BeforeEach
  void setUp() {
    commentRequestDto = createNewCommentRequestDto();
    post = createNewPost();
    comment = createNewCommentOne();
    user = createUserOne();
    secondUser = createUserTwo();
    commentEditRequestDto = createNewCommentEditRequestDto();
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreateCommentShouldThrowValidationExceptionWhenInvalidCredentials() throws Exception {
    mockMvc
        .perform(
            post("/comment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreateCommentShouldThrowValidationExceptionWhenPostNotFound() throws Exception {
    register();
    mockMvc
        .perform(
            post("/comment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreateCommentSuccessfully() throws Exception {
    register();
    Post createdPost = createPost(post);
    commentRequestDto.setPostId(createdPost.getId());

    mockMvc
        .perform(
            post("/comment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value(commentRequestDto.getContent()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testLikeOrUnlikeCommentShouldThrowValidationExceptionWhenInvalidCredentials()
      throws Exception {
    mockMvc
        .perform(post("/comment/like/" + comment.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testLikeOrUnlikeCommentShouldThrowValidationExceptionWhenCommentNotFound() throws Exception {
    register();

    mockMvc
        .perform(post("/comment/like/" + comment.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testLikeOrUnlikeCommentShouldLikeSuccessfully() throws Exception {
    Post createdPost = createPost(post);
    comment.setPost(createdPost);
    User createdUser = createUser(user);
    comment.setUser(createdUser);
    Comment createdComment = creteComment(comment);

    mockMvc
        .perform(post("/comment/like/" + createdComment.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value(createdComment.getContent()))
        .andExpect(jsonPath("likes.length()").value(1));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testLikeOrUnlikeCommentShouldUnlikeSuccessfully() throws Exception {
    Post createdPost = createPost(post);
    comment.setPost(createdPost);
    User createdUser = createUser(user);
    comment.setUser(createdUser);
    comment.setLikes(Set.of(createdUser));
    Comment createdComment = creteComment(comment);

    mockMvc
        .perform(post("/comment/like/" + createdComment.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value(createdComment.getContent()))
        .andExpect(jsonPath("likes.length()").value(0));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testReplyCommentShouldThrowValidationExceptionWhenInvalidCredentials() throws Exception {
    mockMvc
        .perform(
            post("/comment/reply")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testReplyCommentShouldThrowValidationExceptionWhenCommentNotFound() throws Exception {
    register();
    commentRequestDto.setParentCommentId(comment.getId());

    mockMvc
        .perform(
            post("/comment/reply")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testReplyCommentSuccessfully() throws Exception {
    User createdUser = createUser(user);
    Post createdPost = createPost(post);
    comment.setPost(createdPost);
    comment.setUser(createdUser);
    Comment createdComment = creteComment(comment);
    commentRequestDto.setParentCommentId(createdComment.getId());

    mockMvc
        .perform(
            post("/comment/reply")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value(commentRequestDto.getContent()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testDeleteCommentShouldThrowValidationExceptionWhenInvalidCredentials() throws Exception {
    mockMvc
        .perform(delete("/comment/delete/" + post.getId() + "/" + comment.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testDeleteCommentShouldThrowValidationExceptionWhenPostNotFound() throws Exception {
    register();

    mockMvc
        .perform(delete("/comment/delete/" + post.getId() + "/" + comment.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testDeleteCommentShouldThrowValidationExceptionWhenCommentNotFound() throws Exception {
    register();
    Post savedPost = createPost(post);

    mockMvc
        .perform(delete("/comment/delete/" + savedPost.getId() + "/" + comment.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testDeleteCommentShouldThrowValidationExceptionWhenUserNotAuthor() throws Exception {
    register();
    User savedSecondUser = createSecondUser(secondUser);
    post.setAuthor(savedSecondUser);
    post.setUser(savedSecondUser);
    Post savedPost = createPost(post);
    comment.setUser(savedSecondUser);
    comment.setPost(savedPost);
    Comment savedComment = creteComment(comment);

    mockMvc
        .perform(delete("/comment/delete/" + savedPost.getId() + "/" + savedComment.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testDeleteCommentSuccessfully() throws Exception {
    User savedUser = createUser(user);
    post.setAuthor(savedUser);
    post.setUser(savedUser);
    Post savedPost = createPost(post);
    comment.setUser(savedUser);
    comment.setPost(savedPost);
    Comment savedComment = creteComment(comment);

    mockMvc
        .perform(delete("/comment/delete/" + savedPost.getId() + "/" + savedComment.getId()))
        .andExpect(status().isNoContent());
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testEditCommentShouldThrowValidationExceptionWhenInvalidCredentials() throws Exception {
    mockMvc
        .perform(
            put("/comment/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentEditRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testEditCommentShouldThrowValidationExceptionWhenPostNotFound() throws Exception {
    register();

    mockMvc
        .perform(
            put("/comment/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentEditRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testEditCommentShouldThrowValidationExceptionWhenCommentNotFound() throws Exception {
    register();
    Post createdPost = createPost(post);
    commentEditRequestDto.setPostId(createdPost.getId());

    mockMvc
        .perform(
            put("/comment/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentEditRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testEditCommentShouldThrowValidationExceptionWhenUserNotAuthor() throws Exception {
    register();
    User savedSecondUser = createSecondUser(secondUser);
    post.setAuthor(savedSecondUser);
    post.setUser(savedSecondUser);
    Post savedPost = createPost(post);
    comment.setUser(savedSecondUser);
    comment.setPost(savedPost);
    Comment savedComment = creteComment(comment);
    commentEditRequestDto.setPostId(savedPost.getId());
    commentEditRequestDto.setCommentId(savedComment.getId());

    mockMvc
        .perform(
            put("/comment/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentEditRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testEditCommentSuccessfully() throws Exception {
    User savedUser = createUser(user);
    post.setAuthor(savedUser);
    post.setUser(savedUser);
    Post savedPost = createPost(post);
    comment.setUser(savedUser);
    comment.setPost(savedPost);
    Comment savedComment = creteComment(comment);
    commentEditRequestDto.setPostId(savedPost.getId());
    commentEditRequestDto.setCommentId(savedComment.getId());

    mockMvc
        .perform(
            put("/comment/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentEditRequestDto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value(commentEditRequestDto.getContent()));
  }
}
