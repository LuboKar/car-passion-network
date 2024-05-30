package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createNewUser;
import static com.carpassionnetwork.helper.PostTestHelper.createNewPost;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.exception.PostNotFoundException;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.CommentRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class CommentServiceTest {
  @InjectMocks private CommentService commentService;

  @Mock private UserService userService;
  @Mock private PostService postService;
  @Mock private CommentRepository commentRepository;

  private User user;
  private Post post;
  private String content;

  @BeforeEach
  void setUp() {
    user = createNewUser();
    post = createNewPost();
    content = "smth";
  }

  @Test
  void testCreateCommentShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(InvalidCredentialsException.class);

    assertThrows(
        InvalidCredentialsException.class,
        () -> commentService.createComment(post.getId(), content));
  }

  @Test
  void testCreateCommentShouldThrowPostNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenThrow(PostNotFoundException.class);

    assertThrows(
        PostNotFoundException.class, () -> commentService.createComment(post.getId(), content));
  }

  @Test
  void testCreateCommentSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenReturn(post);

    commentService.createComment(post.getId(), content);

    verify(userService, times(1)).getCurrentUser();
    verify(postService, times(1)).getPost(post.getId());
    verify(commentRepository, times(1)).save(any());
  }
}
