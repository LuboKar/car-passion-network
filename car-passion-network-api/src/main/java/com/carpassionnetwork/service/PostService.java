package com.carpassionnetwork.service;

import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PostService {
  private final PostRepository postRepository;
  private final UserService userService;

  public String createPost(Post post) {
    User creator = userService.getCurrentUser();

    post.setUser(creator);

    postRepository.save(post);

    return "Post created successfully!";
  }
}
