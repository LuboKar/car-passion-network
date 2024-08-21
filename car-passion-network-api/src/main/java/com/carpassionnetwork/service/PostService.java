package com.carpassionnetwork.service;

import com.carpassionnetwork.exception.PostNotFoundException;
import com.carpassionnetwork.exception.UserNotAuthorException;
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

  public Post getPost(UUID id) {
    return postRepository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
  }

  public List<Post> getAllPostsByUserId(UUID id) {
    return postRepository.findAllByUserIdOrderByCreatedAtDesc(id);
  }

  public Post createPost(Post post, UUID ownerId) {
    User owner = userService.getUser(ownerId);
    User author = userService.getCurrentUser();

    post.setUser(owner);
    post.setAuthor(author);
    post.setLikes(new HashSet<>());
    post.setComments(new ArrayList<>());

    return postRepository.save(post);
  }

  public Post likeOrUnlikePost(UUID postId) {
    User currentUser = userService.getCurrentUser();

    Post likedPost = getPost(postId);

    boolean isPostLiked = likedPost.getLikes().contains(currentUser);

    if (isPostLiked) {
      likedPost.getLikes().remove(currentUser);
    } else {
      likedPost.getLikes().add(currentUser);
    }

    return postRepository.save(likedPost);
  }

  public List<Post> getAllPosts() {
    return postRepository.findAllWhereUserIdEqualsAuthorIdOrderByCreatedAtDesc();
  }

  public void deletePost(UUID postId) {
    User currentUser = userService.getCurrentUser();
    Post post = getPost(postId);

    if (!post.getAuthor().equals(currentUser)) {
      throw new UserNotAuthorException(currentUser.getId(), postId);
    }

    postRepository.delete(post);
  }
}
