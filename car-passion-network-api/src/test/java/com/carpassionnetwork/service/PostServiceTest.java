package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;
import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserTwo;
import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroupOne;
import static com.carpassionnetwork.helper.PostTestHelper.createNewPost;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.exception.ValidationException;
import com.carpassionnetwork.model.Group;
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

@ExtendWith(MockitoExtension.class)
public class PostServiceTest {
  @InjectMocks private PostService postService;

  @Mock private UserService userService;
  @Mock private PostRepository postRepository;
  @Mock private GroupService groupService;

  private static final String TITLE = "New title";

  private User currentUser;
  private User owner;
  private Post post;
  private Group group;

  @BeforeEach
  void setUp() {
    currentUser = createUserOne();
    owner = createUserTwo();
    post = createNewPost();
    post.getLikes().add(currentUser);
    currentUser.setPosts(new ArrayList<>());
    post.setUser(owner);
    post.setAuthor(currentUser);
    group = createNewGroupOne();
  }

  @Test
  void createPostShouldThrowValidationExceptionWhenOwnerDoesNotExists() {
    when(userService.getUser(owner.getId())).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class, () -> postService.createPost(post, owner.getId(), null));
  }

  @Test
  void createPostShouldThrowValidationExceptionWhenAuthorDoesNotExists() {
    when(userService.getUser(owner.getId())).thenReturn(owner);
    when(userService.getCurrentUser()).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class, () -> postService.createPost(post, owner.getId(), null));
  }

  @Test
  void createPostShouldThrowValidationExceptionWhenGroupNotFound() {
    when(userService.getUser(owner.getId())).thenReturn(owner);
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(groupService.getGroup(group.getId())).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class,
        () -> postService.createPost(post, owner.getId(), group.getId()));
  }

  @Test
  void createPostSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(userService.getUser(owner.getId())).thenReturn(currentUser);
    when(postRepository.save(post)).thenReturn(post);

    Post savedPost = postService.createPost(post, owner.getId(), null);

    assertNotNull(savedPost);
    assertEquals(savedPost.getTitle(), "PostTitle");
    assertEquals(savedPost.getContent(), "PostContent");
    verify(userService, times(1)).getCurrentUser();
    verify(userService, times(1)).getUser(owner.getId());
    verify(postRepository, times(1)).save(post);
  }

  @Test
  void createGroupPostSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(userService.getUser(owner.getId())).thenReturn(currentUser);
    post.setGroup(group);
    when(postRepository.save(post)).thenReturn(post);
    when(groupService.getGroup(group.getId())).thenReturn(group);

    Post savedPost = postService.createPost(post, owner.getId(), group.getId());

    assertNotNull(savedPost);
    assertEquals(savedPost.getTitle(), "PostTitle");
    assertEquals(savedPost.getContent(), "PostContent");
    assertEquals(savedPost.getGroup(), group);
    verify(userService, times(1)).getCurrentUser();
    verify(userService, times(1)).getUser(owner.getId());
    verify(groupService, times(1)).getGroup(group.getId());
    verify(postRepository, times(1)).save(post);
  }

  @Test
  void likeOrUnlikePostShouldThrowValidationExceptionWhenInvalidCredentials() {
    when(userService.getCurrentUser()).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> postService.likeOrUnlikePost(post.getId()));
  }

  @Test
  void likeOrUnlikePostShouldThrowValidationExceptionWhenPostNotFound() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(postRepository.findById(post.getId())).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> postService.likeOrUnlikePost(post.getId()));
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
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(postRepository.findById(post.getId())).thenReturn(Optional.of(post));

    postService.likeOrUnlikePost(post.getId());

    verify(userService, times(1)).getCurrentUser();
    verify(postRepository, times(1)).findById(post.getId());
    verify(postRepository, times(1)).save(post);
  }

  @Test
  void getAllPostsByUserIdSuccessfully() {
    when(postRepository.findAllByUserIdOrderByCreatedAtDesc(currentUser.getId()))
        .thenReturn(currentUser.getPosts());
    currentUser.getPosts().add(post);
    currentUser.getPosts().add(post);

    List<Post> responseList = postService.getAllPostsByUserId(currentUser.getId());

    assertNotNull(responseList);
    assertEquals(responseList.size(), 2);
    assertEquals(responseList.get(0), responseList.get(1));
    verify(postRepository, times(1)).findAllByUserIdOrderByCreatedAtDesc(currentUser.getId());
  }

  @Test
  void getAllPostsByGroupIdSuccessfully() {
    when(postRepository.findAllByGroupIdOrderByCreatedAtDesc(group.getId()))
        .thenReturn(group.getPosts());
    group.getPosts().add(post);
    group.getPosts().add(post);

    List<Post> responseList = postService.getAllPostsByGroupId(group.getId());

    assertNotNull(responseList);
    assertEquals(responseList.size(), 2);
    assertEquals(responseList.get(0), responseList.get(1));
    verify(postRepository, times(1)).findAllByGroupIdOrderByCreatedAtDesc(group.getId());
  }

  @Test
  void getPostShouldThrowValidationExceptionWhenPostNotFound() {
    when(postRepository.findById(post.getId())).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> postService.getPost(post.getId()));
  }

  @Test
  void getPostSuccessfully() {
    when(postRepository.findById(post.getId())).thenReturn(Optional.of(post));

    postService.getPost(post.getId());

    verify(postRepository, times(1)).findById(post.getId());
  }

  @Test
  void getAllPostsShouldReturnEmptyListIfThereIsNoPost() {
    List<Post> posts = postService.getAllPosts();

    assertEquals(posts.size(), 0);
    verify(postRepository, times(1)).findAllWhereUserIdEqualsAuthorIdOrderByCreatedAtDesc();
  }

  @Test
  void deletePostShouldThrowValidationExceptionWhenInvalidCredentials() {
    when(userService.getCurrentUser()).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> postService.deletePost(post.getId()));
  }

  @Test
  void deletePostShouldThrowValidationExceptionWhenPostNotFound() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(postRepository.findById(post.getId())).thenThrow(ValidationException.class);

    assertThrows(ValidationException.class, () -> postService.deletePost(post.getId()));
  }

  @Test
  void deletePostShouldThrowValidationExceptionWhenUserNotAuthor() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(postRepository.findById(post.getId())).thenReturn(Optional.ofNullable(post));
    post.setAuthor(owner);

    assertThrows(ValidationException.class, () -> postService.deletePost(post.getId()));
  }

  @Test
  void deletePostSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(postRepository.findById(post.getId())).thenReturn(Optional.ofNullable(post));

    postService.deletePost(post.getId());

    verify(userService, times(1)).getCurrentUser();
    verify(postRepository, times(1)).findById(post.getId());
    verify(postRepository, times(1)).delete(post);
  }

  @Test
  void editPostShouldThrowValidationExceptionWhenInvalidCredentials() {
    when(userService.getCurrentUser()).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class,
        () -> postService.editPost(post.getId(), TITLE, post.getContent()));
  }

  @Test
  void editPostShouldThrowValidationExceptionWhenPostNotFound() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(postRepository.findById(post.getId())).thenThrow(ValidationException.class);

    assertThrows(
        ValidationException.class,
        () -> postService.editPost(post.getId(), TITLE, post.getContent()));
  }

  @Test
  void editPostShouldThrowValidationExceptionWhenUserNotFound() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(postRepository.findById(post.getId())).thenReturn(Optional.of(post));
    post.setAuthor(owner);

    assertThrows(
        ValidationException.class,
        () -> postService.editPost(post.getId(), TITLE, post.getContent()));
  }

  @Test
  void editPostSuccessfully() {
    when(userService.getCurrentUser()).thenReturn(currentUser);
    when(postRepository.findById(post.getId())).thenReturn(Optional.of(post));

    postService.editPost(post.getId(), TITLE, post.getContent());

    verify(userService, times(1)).getCurrentUser();
    verify(postRepository, times(1)).findById(post.getId());
    verify(postRepository, times(1)).save(post);
  }
}
