package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;
import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserTwo;
import static com.carpassionnetwork.helper.PostTestHelper.createNewPost;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.exception.PostNotFoundException;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.PostRepository;
import java.util.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.parameters.P;

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {
  @InjectMocks private PostService postService;

  @Mock private UserService userService;
  @Mock private PostRepository postRepository;

  private User currentUser;
  private User owner;
  private Post post;

  @BeforeEach
  void setUp() {
    currentUser = createUserOne();
    owner = createUserTwo();
    post = createNewPost();
  }

  @Test
  void createPostShouldThrowInvalidCredentialsExceptionWhenOwnerDoesNotExists() {
    when(userService.getUser(owner.getId())).thenThrow(InvalidCredentialsException.class);

    assertThrows(
        InvalidCredentialsException.class, () -> postService.createPost(post, owner.getId()));
  }

  @Test
  void createPostShouldThrowInvalidCredentialsExceptionWhenAuthorDoesNotExists() {
    when(userService.getUser(owner.getId())).thenReturn(owner);
    when(userService.getCurrentUser()).thenThrow(InvalidCredentialsException.class);

    assertThrows(
        InvalidCredentialsException.class, () -> postService.createPost(post, owner.getId()));
  }

  @Test
  void createPostSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(userService.getUser(owner.getId())).thenReturn(currentUser);
    when(postRepository.save(post)).thenReturn(post);

    Post savedPost = postService.createPost(post, owner.getId());

    assertNotNull(savedPost);
    assertEquals(savedPost.getTitle(), "PostTitle");
    assertEquals(savedPost.getContent(), "PostContent");
    verify(userService, times(1)).getCurrentUser();
    verify(userService, times(1)).getUser(owner.getId());
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
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(postRepository.findById(post.getId())).thenThrow(PostNotFoundException.class);

    assertThrows(PostNotFoundException.class, () -> postService.likeOrUnlikePost(post.getId()));
  }

  @Test
  void likeOrUnlikePostShouldLikePostSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(postRepository.findById(post.getId())).thenReturn(Optional.of(post));

    Post savedPost = postService.likeOrUnlikePost(post.getId());

    verify(userService, times(1)).getCurrentUser();
    verify(postRepository, times(1)).findById(post.getId());
    verify(postRepository, times(1)).save(post);
  }

  @Test
  void likeOrUnlikePostShouldUnLikePostSuccessfully() {
    post.getLikes().add(currentUser);
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(postRepository.findById(post.getId())).thenReturn(Optional.of(post));

    postService.likeOrUnlikePost(post.getId());

    verify(userService, times(1)).getCurrentUser();
    verify(postRepository, times(1)).findById(post.getId());
    verify(postRepository, times(1)).save(post);
  }

  @Test
  void getAllPostsByUserIdSuccessfully() {
    currentUser.setPosts(new ArrayList<>());
    currentUser.getPosts().add(post);
    currentUser.getPosts().add(post);
    when(postRepository.findAllByUserIdOrderByCreatedAtDesc(currentUser.getId()))
        .thenReturn(currentUser.getPosts());

    List<Post> responseList = postService.getAllPostsByUserId(currentUser.getId());

    assertNotNull(responseList);
    assertEquals(responseList.size(), 2);
    assertEquals(responseList.get(0), responseList.get(1));
    verify(postRepository, times(1)).findAllByUserIdOrderByCreatedAtDesc(currentUser.getId());
  }

  @Test
  void getPostShouldThrowPostNotFoundException() {
    when(postRepository.findById(post.getId())).thenThrow(PostNotFoundException.class);

    assertThrows(PostNotFoundException.class, () -> postService.getPost(post.getId()));
  }

  @Test
  void getPostSuccessfully() {
    when(postRepository.findById(post.getId())).thenReturn(Optional.of(post));

    postService.getPost(post.getId());

    verify(postRepository, times(1)).findById(post.getId());
  }

  @Test
  void getAllPostsShouldReturnEmptyListIfThereIsNoPost(){
    List<Post> posts = postService.getAllPosts();

    assertEquals(posts.size(), 0);
    verify(postRepository, times(1)).findAllWhereUserIdEqualsAuthorIdOrderByCreatedAtDesc();
  }
}
