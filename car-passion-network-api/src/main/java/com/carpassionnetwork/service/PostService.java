package com.carpassionnetwork.service;

import com.carpassionnetwork.exception.PostNotFoundException;
import com.carpassionnetwork.exception.UserNotAuthorException;
import com.carpassionnetwork.model.Group;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.PostRepository;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostService {
  private final PostRepository postRepository;
  private final UserService userService;
  private final GroupService groupService;

  public Post getPost(UUID id) {
    return postRepository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
  }

  public List<Post> getAllPostsByUserId(UUID id) {
    return postRepository.findAllByUserIdOrderByCreatedAtDesc(id);
  }

  public List<Post> getAllPostsByGroupId(UUID id) {
    return postRepository.findAllByGroupIdOrderByCreatedAtDesc(id);
  }

  public Post createPost(Post post, UUID ownerId, UUID groupId) {
    User owner = ownerId != null ? userService.getUser(ownerId) : null;
    User author = userService.getCurrentUser();
    Group group = groupId != null ? groupService.getGroup(groupId) : null;

    post.setUser(owner);
    post.setAuthor(author);
    post.setLikes(new HashSet<>());
    post.setComments(new ArrayList<>());
    post.setGroup(group);

    return postRepository.save(post);
  }

  public Post likeOrUnlikePost(UUID postId) {
    User currentUser = userService.getCurrentUser();
    Post likedPost = getPost(postId);

    toggleLike(currentUser, likedPost);

    return postRepository.save(likedPost);
  }

  public List<Post> getAllPosts() {
    return postRepository.findAllWhereUserIdEqualsAuthorIdOrderByCreatedAtDesc();
  }

  public void deletePost(UUID postId) {
    User currentUser = userService.getCurrentUser();
    Post post = getPost(postId);

    validateUserCanDeletePost(currentUser, post);

    postRepository.delete(post);
  }

  public Post editPost(UUID postId, String title, String content) {
    User currentUser = userService.getCurrentUser();
    Post post = getPost(postId);

    validateUserCanEditPost(currentUser, post);

    post.setTitle(title);
    post.setContent(content);

    return postRepository.save(post);
  }

  private void toggleLike(User currentUser, Post likedPost) {
    if (!likedPost.getLikes().remove(currentUser)) {
      likedPost.getLikes().add(currentUser);
    }
  }

  private void validateUserCanDeletePost(User user, Post post) {
    if (!post.getAuthor().equals(user) && !post.getUser().equals(user)) {
      throw new UserNotAuthorException(user.getId(), post.getId());
    }
  }

  private void validateUserCanEditPost(User currentUser, Post post) {
    if (!post.getAuthor().equals(currentUser)) {
      throw new UserNotAuthorException(currentUser.getId(), post.getId());
    }
  }
}
