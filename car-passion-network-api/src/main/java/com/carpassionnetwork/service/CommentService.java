package com.carpassionnetwork.service;

import com.carpassionnetwork.model.Comment;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.CommentRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {
  private final UserService userService;
  private final PostService postService;
  private final CommentRepository commentRepository;

  public Comment createComment(UUID postId, String content) {
    User user = userService.getCurrentUser();
    Post post = postService.getPost(postId);

    Comment comment = Comment.builder().user(user).post(post).content(content).build();

    return commentRepository.save(comment);
  }
}
