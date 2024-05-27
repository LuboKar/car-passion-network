package com.carpassionnetwork.service;

import com.carpassionnetwork.exception.PostNotFoundException;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.PostRepository;
import com.carpassionnetwork.repository.UserRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostService {
  private final PostRepository postRepository;
  private final UserService userService;
  private final UserRepository userRepository;

  public String createPost(Post post) {
    User creator = userService.getCurrentUser();

    post.setUser(creator);

    postRepository.save(post);

    return "Post created successfully!";
  }

  public String likeOrUnlikePost(UUID postId) {
    User currentUser = userService.getCurrentUser();

    Post likedPost = getPostById(postId);

    boolean isPostLiked = currentUser.getLikedPosts().contains(likedPost);
    String message;

    if (isPostLiked) {
      likedPost.setCurrentUserLike(false);
      currentUser.getLikedPosts().remove(likedPost);
      message = "Post unliked successfully!";
    } else {
      likedPost.setCurrentUserLike(true);
      currentUser.getLikedPosts().add(likedPost);
      message = "Post liked successfully!";
    }

    userRepository.save(currentUser);

    return message;
  }

  private Post getPostById(UUID postId) {
    return postRepository.findById(postId).orElseThrow(() -> new PostNotFoundException(postId));
  }
}
