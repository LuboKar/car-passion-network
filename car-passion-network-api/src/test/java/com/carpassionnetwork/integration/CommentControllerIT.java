package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;
import static com.carpassionnetwork.helper.CommentTestHelper.createNewComment;
import static com.carpassionnetwork.helper.CommentTestHelper.createNewCommentRequestDto;
import static com.carpassionnetwork.helper.PostTestHelper.createNewPost;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.carpassionnetwork.dto.request.CommentRequestDto;
import com.carpassionnetwork.exception.CommentNotFoundException;
import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.exception.PostNotFoundException;
import com.carpassionnetwork.model.Comment;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.CommentRepository;
import com.carpassionnetwork.repository.PostRepository;
import java.util.Set;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

public class CommentControllerIT extends BaseIT {
  private CommentRequestDto commentRequestDto;
  private Post post;
  private Comment comment;
  private User user;

  @Autowired private PostRepository postRepository;
  @Autowired private CommentRepository commentRepository;

  @BeforeEach
  void setUp() {
    commentRequestDto = createNewCommentRequestDto();
    post = createNewPost();
    comment = createNewComment();
    user = createUserOne();
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

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testLikeOrUnlikeCommentShouldThrowInvalidCredentialsException() throws Exception {
    mockMvc
        .perform(post("/comment/like/" + comment.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(InvalidCredentialsException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testLikeOrUnlikeCommentShouldThrowCommentNotFoundException() throws Exception {
    register();

    mockMvc
        .perform(post("/comment/like/" + comment.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(CommentNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testLikeOrUnlikeCommentShouldLikeSuccessfully() throws Exception {
    Post createdPost = createPost();
    comment.setPost(createdPost);
    User createdUser = createUser();
    comment.setUser(createdUser);
    Comment createdComment = creteComment();

    mockMvc
        .perform(post("/comment/like/" + createdComment.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value(createdComment.getContent()))
        .andExpect(jsonPath("likes.length()").value(1));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testLikeOrUnlikeCommentShouldUnlikeSuccessfully() throws Exception {
    Post createdPost = createPost();
    comment.setPost(createdPost);
    User createdUser = createUser();
    comment.setUser(createdUser);
    comment.setLikes(Set.of(createdUser));
    Comment createdComment = creteComment();

    mockMvc
        .perform(post("/comment/like/" + createdComment.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value(createdComment.getContent()))
        .andExpect(jsonPath("likes.length()").value(0));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testReplyCommentShouldThrowInvalidCredentialsException() throws Exception {
    mockMvc
        .perform(
            post("/comment/reply")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(InvalidCredentialsException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testReplyCommentShouldThrowCommentNotFoundException() throws Exception {
    register();
    commentRequestDto.setParentCommentId(comment.getId());

    mockMvc
        .perform(
            post("/comment/reply")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(CommentNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testReplyCommentSuccessfully() throws Exception {
    User createdUser = createUser();
    Post createdPost = createPost();
    comment.setPost(createdPost);
    comment.setUser(createdUser);
    Comment createdComment = creteComment();
    commentRequestDto.setParentCommentId(createdComment.getId());

    mockMvc
        .perform(
            post("/comment/reply")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(commentRequestDto)))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.content").value(commentRequestDto.getContent()));
  }

  private Post createPost() {
    return postRepository.save(post);
  }

  private Comment creteComment() {
    return commentRepository.save(comment);
  }

  private User createUser() {
    return userRepository.save(user);
  }
}
