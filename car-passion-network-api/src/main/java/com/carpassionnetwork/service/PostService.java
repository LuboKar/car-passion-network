package com.carpassionnetwork.service;

import com.carpassionnetwork.exception.PostNotFoundException;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.PostRepository;
import com.carpassionnetwork.repository.UserRepository;
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
  private final UserRepository userRepository;

  public Post getPost(UUID id) {
    return postRepository.findById(id).orElseThrow(() -> new PostNotFoundException(id));
  }

  public List<Post> getAllPostsByUserId(UUID id) {
    return postRepository.findAllByUserIdOrderByCreatedAtDesc(id);
  }

  public Post createPost(Post post) {
    User creator = userService.getCurrentUser();

    post.setUser(creator);
    post.setLikes(new HashSet<>());
    post.setComments(new ArrayList<>());

    return postRepository.save(post);
  }

  public String likeOrUnlikePost(UUID postId) {
    User currentUser = userService.getCurrentUser();

    Post likedPost = getPostById(postId);

    boolean isPostLiked = currentUser.getLikedPosts().contains(likedPost);
    String message;

    if (isPostLiked) {
      currentUser.getLikedPosts().remove(likedPost);
      message = "Post unliked successfully!";
    } else {
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
