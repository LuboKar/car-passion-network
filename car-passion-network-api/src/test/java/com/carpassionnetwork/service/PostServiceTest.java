package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createNewUser;
import static com.carpassionnetwork.helper.PostTestHelper.createNewPost;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.PostRepository;
import java.util.NoSuchElementException;
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

    String message = postService.createPost(post);

    assertNotNull(message);
    assertEquals(message, "Post created successfully!");
    verify(userService, times(1)).getCurrentUser();
    verify(postRepository, times(1)).save(post);
  }
}
