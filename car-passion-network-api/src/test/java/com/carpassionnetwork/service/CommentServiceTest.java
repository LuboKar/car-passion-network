package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;
import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserTwo;
import static com.carpassionnetwork.helper.CommentTestHelper.createNewComment;
import static com.carpassionnetwork.helper.PostTestHelper.createNewPost;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.exception.CommentNotFoundException;
import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.exception.PostNotFoundException;
import com.carpassionnetwork.exception.UserNotAuthorException;
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
  private Comment comment;

  @BeforeEach
  void setUp() {
    user = createUserOne();
    secondUser = createUserTwo();
    post = createNewPost();
    content = "smth";
    replyContent = "reply";
    comment = createNewComment();
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

  @Test
  void testLikeOrUnlikeCommentShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(InvalidCredentialsException.class);

    assertThrows(
        InvalidCredentialsException.class,
        () -> commentService.likeOrUnlikeComment(comment.getId()));
  }

  @Test
  void testLikeOrUnlikeCommentShouldThrowCommentNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(commentRepository.findById(comment.getId())).thenThrow(CommentNotFoundException.class);

    assertThrows(
        CommentNotFoundException.class, () -> commentService.likeOrUnlikeComment(comment.getId()));
  }

  @Test
  void testLikeOrUnlikeCommentLikesSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(commentRepository.findById(comment.getId())).thenReturn(Optional.of(comment));

    commentService.likeOrUnlikeComment(comment.getId());

    verify(userService, times(1)).getCurrentUser();
    verify(commentRepository, times(1)).findById(comment.getId());
    verify(commentRepository, times(1)).save(comment);
  }

  @Test
  void testLikeOrUnlikeCommentUnlikesSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(commentRepository.findById(comment.getId())).thenReturn(Optional.of(comment));
    comment.getLikes().add(user);

    commentService.likeOrUnlikeComment(comment.getId());

    verify(userService, times(1)).getCurrentUser();
    verify(commentRepository, times(1)).findById(comment.getId());
    verify(commentRepository, times(1)).save(comment);
  }

  @Test
  void testReplyCommentShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(InvalidCredentialsException.class);

    assertThrows(
        InvalidCredentialsException.class,
        () -> commentService.replyComment(comment.getId(), replyContent));
  }

  @Test
  void testReplyCommentShouldThrowCommentNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(commentRepository.findById(comment.getId())).thenThrow(CommentNotFoundException.class);

    assertThrows(
        CommentNotFoundException.class,
        () -> commentService.replyComment(comment.getId(), replyContent));
  }

  @Test
  void testReplyCommentSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(commentRepository.findById(comment.getId())).thenReturn(Optional.of(comment));
    when(commentRepository.save(any(Comment.class))).thenReturn(comment);

    commentService.replyComment(comment.getId(), replyContent);

    verify(userService, times(1)).getCurrentUser();
    verify(commentRepository, times(1)).findById(comment.getId());
    verify(commentRepository, times(1)).save(any());
  }

  @Test
  void testDeleteCommentShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(InvalidCredentialsException.class);

    assertThrows(
        InvalidCredentialsException.class,
        () -> commentService.deleteComment(post.getId(), comment.getId()));
  }

  @Test
  void testDeleteCommentShouldThrowPostNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenThrow(PostNotFoundException.class);

    assertThrows(
        PostNotFoundException.class,
        () -> commentService.deleteComment(post.getId(), comment.getId()));
  }

  @Test
  void testDeleteCommentShouldThrowCommentNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenReturn(post);
    when(commentRepository.findById(comment.getId())).thenThrow(CommentNotFoundException.class);

    assertThrows(
        CommentNotFoundException.class,
        () -> commentService.deleteComment(post.getId(), comment.getId()));
  }

  @Test
  void testDeleteCommentShouldThrowUserNotAuthorException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenReturn(post);
    when(commentRepository.findById(comment.getId())).thenReturn(Optional.of(comment));

    post.setUser(secondUser);
    post.setAuthor(secondUser);

    assertThrows(
        UserNotAuthorException.class,
        () -> commentService.deleteComment(post.getId(), comment.getId()));
  }

  @Test
  void testDeleteCommentSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenReturn(post);
    when(commentRepository.findById(comment.getId())).thenReturn(Optional.of(comment));

    post.setUser(user);
    post.setAuthor(user);

    commentService.deleteComment(post.getId(), comment.getId());

    verify(userService, times(1)).getCurrentUser();
    verify(postService, times(1)).getPost(post.getId());
    verify(commentRepository, times(1)).findById(comment.getId());
    verify(commentRepository, times(1)).delete(comment);
  }

  @Test
  void testEditCommentShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(InvalidCredentialsException.class);

    assertThrows(
        InvalidCredentialsException.class,
        () -> commentService.editComment(post.getId(), comment.getId(), content));
  }

  @Test
  void testEditCommentShouldThrowPostNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenThrow(PostNotFoundException.class);

    assertThrows(
        PostNotFoundException.class,
        () -> commentService.editComment(post.getId(), comment.getId(), content));
  }

  @Test
  void testEditCommentShouldThrowCommentNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenReturn(post);
    when(commentRepository.findById(comment.getId())).thenThrow(CommentNotFoundException.class);

    assertThrows(
        CommentNotFoundException.class,
        () -> commentService.editComment(post.getId(), comment.getId(), content));
  }

  @Test
  void testEditCommentShouldThrowUserNotAuthorException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenReturn(post);
    when(commentRepository.findById(comment.getId())).thenReturn(Optional.of(comment));

    post.setUser(secondUser);
    post.setAuthor(secondUser);

    assertThrows(
        UserNotAuthorException.class,
        () -> commentService.editComment(post.getId(), comment.getId(), content));
  }

  @Test
  void testEditCommentSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postService.getPost(post.getId())).thenReturn(post);
    when(commentRepository.findById(comment.getId())).thenReturn(Optional.of(comment));

    post.setUser(user);
    post.setAuthor(user);

    commentService.editComment(post.getId(), comment.getId(), content);

    verify(userService, times(1)).getCurrentUser();
    verify(postService, times(1)).getPost(post.getId());
    verify(commentRepository, times(1)).findById(comment.getId());
    verify(commentRepository, times(1)).save(comment);
  }
}
