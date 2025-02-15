package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;
import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserTwo;
import static com.carpassionnetwork.helper.CommentTestHelper.createNewCommentOne;
import static com.carpassionnetwork.helper.CommentTestHelper.createNewCommentTwo;
import static com.carpassionnetwork.helper.PostTestHelper.createNewPost;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.exception.ValidationException;
import com.carpassionnetwork.model.Comment;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.CommentRepository;
import java.util.Optional;
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
  private User secondUser;
  private Post post;
  private String content;
  private String replyContent;
  private Comment commentOne;
  private Comment commentTwo;

  @BeforeEach
  void setUp() {
    user = createUserOne();
    secondUser = createUserTwo();
    post = createNewPost();
    content = "smth";
    replyContent = "reply";
    commentOne = createNewCommentOne();
    commentTwo = createNewCommentTwo();
    commentOne.getLikes().add(user);
    commentOne.setParent(commentTwo);
    post.setUser(user);
    post.setAuthor(user);
  }

  @Test
  void testCreateCommentShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class, () -> commentService.createComment(post.getId(), content));
  }

  @Test
  void testCreateCommentShouldThrowPostNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class, () -> commentService.createComment(post.getId(), content));
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

  @Test
  void testLikeOrUnlikeCommentShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class, () -> commentService.likeOrUnlikeComment(commentOne.getId()));
  }

  @Test
  void testLikeOrUnlikeCommentShouldThrowCommentNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(commentRepository.findById(commentOne.getId())).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class, () -> commentService.likeOrUnlikeComment(commentOne.getId()));
  }

  @Test
  void testLikeOrUnlikeCommentLikesSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(commentRepository.findById(commentOne.getId())).thenReturn(Optional.of(commentOne));
    when(commentRepository.save(commentOne)).thenReturn(commentOne);

    commentService.likeOrUnlikeComment(commentOne.getId());

    verify(userService, times(1)).getCurrentUser();
    verify(commentRepository, times(1)).findById(commentOne.getId());
    verify(commentRepository, times(1)).save(commentOne);
  }

  @Test
  void testLikeOrUnlikeCommentUnlikesSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(commentRepository.findById(commentOne.getId())).thenReturn(Optional.of(commentOne));
    when(commentRepository.save(commentOne)).thenReturn(commentOne);

    commentService.likeOrUnlikeComment(commentOne.getId());

    verify(userService, times(1)).getCurrentUser();
    verify(commentRepository, times(1)).findById(commentOne.getId());
    verify(commentRepository, times(1)).save(commentOne);
  }

  @Test
  void testReplyCommentShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class,
        () -> commentService.replyComment(commentOne.getId(), replyContent));
  }

  @Test
  void testReplyCommentShouldThrowCommentNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(commentRepository.findById(commentOne.getId())).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class,
        () -> commentService.replyComment(commentOne.getId(), replyContent));
  }

  @Test
  void testReplyCommentSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(commentRepository.findById(commentOne.getId())).thenReturn(Optional.of(commentOne));
    when(commentRepository.save(any(Comment.class))).thenReturn(commentOne);

    commentService.replyComment(commentOne.getId(), replyContent);

    verify(userService, times(1)).getCurrentUser();
    verify(commentRepository, times(1)).findById(commentOne.getId());
    verify(commentRepository, times(1)).save(any());
  }

  @Test
  void testDeleteCommentShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class,
        () -> commentService.deleteComment(post.getId(), commentOne.getId()));
  }

  @Test
  void testDeleteCommentShouldThrowPostNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class,
        () -> commentService.deleteComment(post.getId(), commentOne.getId()));
  }

  @Test
  void testDeleteCommentShouldThrowCommentNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenReturn(post);
    when(commentRepository.findById(commentOne.getId())).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class,
        () -> commentService.deleteComment(post.getId(), commentOne.getId()));
  }

  @Test
  void testDeleteCommentShouldThrowUserNotAuthorException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenReturn(post);
    when(commentRepository.findById(commentOne.getId())).thenReturn(Optional.of(commentOne));

    post.setUser(secondUser);
    post.setAuthor(secondUser);
    commentOne.setUser(secondUser);

    assertThrows(
        ValidationException.class,
        () -> commentService.deleteComment(post.getId(), commentOne.getId()));
  }

  @Test
  void testDeleteCommentSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenReturn(post);
    when(commentRepository.findById(commentOne.getId())).thenReturn(Optional.of(commentOne));

    commentService.deleteComment(post.getId(), commentOne.getId());

    verify(userService, times(1)).getCurrentUser();
    verify(postService, times(1)).getPost(post.getId());
    verify(commentRepository, times(1)).findById(commentOne.getId());
    verify(commentRepository, times(1)).delete(commentOne);
  }

  @Test
  void testEditCommentShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class,
        () -> commentService.editComment(post.getId(), commentOne.getId(), content));
  }

  @Test
  void testEditCommentShouldThrowPostNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class,
        () -> commentService.editComment(post.getId(), commentOne.getId(), content));
  }

  @Test
  void testEditCommentShouldThrowCommentNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenReturn(post);
    when(commentRepository.findById(commentOne.getId())).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class,
        () -> commentService.editComment(post.getId(), commentOne.getId(), content));
  }

  @Test
  void testEditCommentShouldThrowUserNotAuthorException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenReturn(post);
    when(commentRepository.findById(commentOne.getId())).thenReturn(Optional.of(commentOne));

    post.setUser(secondUser);
    post.setAuthor(secondUser);
    commentOne.setUser(secondUser);

    assertThrows(
        ValidationException.class,
        () -> commentService.editComment(post.getId(), commentOne.getId(), content));
  }

  @Test
  void testEditCommentSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenReturn(post);
    when(commentRepository.findById(commentOne.getId())).thenReturn(Optional.of(commentOne));

    commentService.editComment(post.getId(), commentOne.getId(), content);

    verify(userService, times(1)).getCurrentUser();
    verify(postService, times(1)).getPost(post.getId());
    verify(commentRepository, times(1)).findById(commentOne.getId());
    verify(commentRepository, times(1)).save(commentOne);
  }
}
