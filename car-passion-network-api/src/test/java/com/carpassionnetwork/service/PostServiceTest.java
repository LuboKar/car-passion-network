package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createNewUser;
import static com.carpassionnetwork.helper.PostTestHelper.createNewPost;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.exception.PostNotFoundException;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.PostRepository;
import com.carpassionnetwork.repository.UserRepository;
import java.util.HashSet;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {
  @InjectMocks private PostService postService;

  @Mock private UserService userService;
  @Mock private PostRepository postRepository;
  @Mock private UserRepository userRepository;

  private User user;
  private Post post;

  @BeforeEach
  void setUp() {
    user = createNewUser();
    post = createNewPost();
  }

  @Test
  void createPostShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(InvalidCredentialsException.class);

    assertThrows(InvalidCredentialsException.class, () -> postService.createPost(post));
  }

  @Test
  void createPostSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postRepository.save(post)).thenReturn(post);

    Post savedPost = postService.createPost(post);

    assertNotNull(savedPost);
    assertEquals(savedPost.getTitle(), "PostTitle");
    assertEquals(savedPost.getContent(), "PostContent");
    verify(userService, times(1)).getCurrentUser();
    verify(postRepository, times(1)).save(post);
  }

  @Test
  void likeOrUnlikePostShouldThrowInvalidCredentialsException() {
    when(userService.getCurrentUser()).thenThrow(InvalidCredentialsException.class);

    assertThrows(
        InvalidCredentialsException.class, () -> postService.likeOrUnlikePost(post.getId()));
  }

  @Test
  void likeOrUnlikePostShouldThrowPostNotFoundException() {
    when(userService.getCurrentUser()).thenReturn(user);
    when(postRepository.findById(post.getId())).thenThrow(PostNotFoundException.class);

    assertThrows(PostNotFoundException.class, () -> postService.likeOrUnlikePost(post.getId()));
  }

  @Test
  void likeOrUnlikePostShouldLikePostSuccessfully() {
    user.setLikedPosts(new HashSet<>());
    when(userService.getCurrentUser()).thenReturn(user);
    when(postRepository.findById(post.getId())).thenReturn(Optional.of(post));

    String message = postService.likeOrUnlikePost(post.getId());

    assertNotNull(message);
    assertEquals(message, "Post liked successfully!");
    verify(userService, times(1)).getCurrentUser();
    verify(postRepository, times(1)).findById(post.getId());
    verify(userRepository, times(1)).save(user);
  }

  @Test
  void likeOrUnlikePostShouldUnLikePostSuccessfully() {
    user.setLikedPosts(new HashSet<>());
    user.getLikedPosts().add(post);
    when(userService.getCurrentUser()).thenReturn(user);
    when(postRepository.findById(post.getId())).thenReturn(Optional.of(post));

    String message = postService.likeOrUnlikePost(post.getId());

    assertNotNull(message);
    assertEquals(message, "Post unliked successfully!");
    verify(userService, times(1)).getCurrentUser();
    verify(postRepository, times(1)).findById(post.getId());
    verify(userRepository, times(1)).save(user);
  }
}
