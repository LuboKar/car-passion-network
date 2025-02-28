package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;
import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserTwo;
import static com.carpassionnetwork.helper.CommentTestHelper.*;
import static com.carpassionnetwork.helper.PostTestHelper.createNewPost;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
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

public class CommentControllerIT extends BaseIT {
  private CommentRequestDto commentRequestDto;
  private CommentEditRequestDto commentEditRequestDto;
  private Post post;
  private Comment comment;
  private User secondUser;

  @BeforeEach
  void setUp() {
    register();
    commentRequestDto = createNewCommentRequestDto();
    post = createNewPost();
    comment = createNewCommentOne();
    secondUser = createUserTwo();
    commentEditRequestDto = createNewCommentEditRequestDto();
  }

  @Test
  void testCreateCommentShouldThrowValidationExceptionWhenInvalidCredentials() throws Exception {
    mockMvc
        .perform(
            post("/comment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testCreateCommentShouldThrowValidationExceptionWhenPostNotFound() throws Exception {
    mockMvc
        .perform(
            post("/comment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testCreateCommentSuccessfully() throws Exception {
    Post createdPost = createPost(post);
    commentRequestDto.setPostId(createdPost.getId());

    mockMvc
        .perform(
            post("/comment")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value(commentRequestDto.getContent()));
  }

  @Test
  void testLikeOrUnlikeCommentShouldThrowValidationExceptionWhenInvalidCredentials()
      throws Exception {
    mockMvc
        .perform(post("/comment/like/" + comment.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testLikeOrUnlikeCommentShouldThrowValidationExceptionWhenCommentNotFound() throws Exception {
    mockMvc
        .perform(post("/comment/like/" + comment.getId()).with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testLikeOrUnlikeCommentShouldLikeSuccessfully() throws Exception {
    Post createdPost = createPost(post);
    comment.setPost(createdPost);
    comment.setUser(currentUser);
    Comment createdComment = creteComment(comment);

    mockMvc
        .perform(post("/comment/like/" + createdComment.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value(createdComment.getContent()))
        .andExpect(jsonPath("likes.length()").value(1));
  }

  @Test
  void testLikeOrUnlikeCommentShouldUnlikeSuccessfully() throws Exception {
    Post createdPost = createPost(post);
    comment.setPost(createdPost);
    comment.setUser(currentUser);
    comment.setLikes(Set.of(currentUser));
    Comment createdComment = creteComment(comment);

    mockMvc
        .perform(post("/comment/like/" + createdComment.getId()).with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value(createdComment.getContent()))
        .andExpect(jsonPath("likes.length()").value(0));
  }

  @Test
  void testReplyCommentShouldThrowValidationExceptionWhenCommentNotFound() throws Exception {
    commentRequestDto.setParentCommentId(comment.getId());

    mockMvc
        .perform(
            post("/comment/reply")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testReplyCommentSuccessfully() throws Exception {
    Post createdPost = createPost(post);
    comment.setPost(createdPost);
    comment.setUser(currentUser);
    Comment createdComment = creteComment(comment);
    commentRequestDto.setParentCommentId(createdComment.getId());

    mockMvc
        .perform(
            post("/comment/reply")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value(commentRequestDto.getContent()));
  }

  @Test
  void testDeleteCommentShouldThrowValidationExceptionWhenInvalidCredentials() throws Exception {
    mockMvc
        .perform(
            delete("/comment/delete/" + post.getId() + "/" + comment.getId())
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testDeleteCommentShouldThrowValidationExceptionWhenPostNotFound() throws Exception {
    mockMvc
        .perform(
            delete("/comment/delete/" + post.getId() + "/" + comment.getId())
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testDeleteCommentShouldThrowValidationExceptionWhenCommentNotFound() throws Exception {
    Post savedPost = createPost(post);

    mockMvc
        .perform(
            delete("/comment/delete/" + savedPost.getId() + "/" + comment.getId())
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testDeleteCommentShouldThrowValidationExceptionWhenUserNotAuthor() throws Exception {
    User savedSecondUser = createSecondUser(secondUser);
    post.setAuthor(savedSecondUser);
    post.setUser(savedSecondUser);
    Post savedPost = createPost(post);
    comment.setUser(savedSecondUser);
    comment.setPost(savedPost);
    Comment savedComment = creteComment(comment);

    mockMvc
        .perform(
            delete("/comment/delete/" + savedPost.getId() + "/" + savedComment.getId())
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testDeleteCommentSuccessfully() throws Exception {
    post.setAuthor(currentUser);
    post.setUser(currentUser);
    Post savedPost = createPost(post);
    comment.setUser(currentUser);
    comment.setPost(savedPost);
    Comment savedComment = creteComment(comment);

    mockMvc
        .perform(
            delete("/comment/delete/" + savedPost.getId() + "/" + savedComment.getId())
                .with(user(currentUser)))
        .andExpect(status().isNoContent());
  }

  @Test
  void testEditCommentShouldThrowValidationExceptionWhenInvalidCredentials() throws Exception {
    mockMvc
        .perform(
            put("/comment/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentEditRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testEditCommentShouldThrowValidationExceptionWhenPostNotFound() throws Exception {
    mockMvc
        .perform(
            put("/comment/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentEditRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testEditCommentShouldThrowValidationExceptionWhenCommentNotFound() throws Exception {
    Post createdPost = createPost(post);
    commentEditRequestDto.setPostId(createdPost.getId());

    mockMvc
        .perform(
            put("/comment/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentEditRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testEditCommentShouldThrowValidationExceptionWhenUserNotAuthor() throws Exception {
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
                .content(gson.toJson(commentEditRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(ValidationException.class, result.getResolvedException()));
  }

  @Test
  void testEditCommentSuccessfully() throws Exception {
    post.setAuthor(currentUser);
    post.setUser(currentUser);
    Post savedPost = createPost(post);
    comment.setUser(currentUser);
    comment.setPost(savedPost);
    Comment savedComment = creteComment(comment);
    commentEditRequestDto.setPostId(savedPost.getId());
    commentEditRequestDto.setCommentId(savedComment.getId());

    mockMvc
        .perform(
            put("/comment/edit")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentEditRequestDto))
                .with(user(currentUser)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value(commentEditRequestDto.getContent()));
  }
}
