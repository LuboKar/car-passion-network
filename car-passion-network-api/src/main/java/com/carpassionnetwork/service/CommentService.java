package com.carpassionnetwork.service;

import com.carpassionnetwork.exception.CommentNotFoundException;
import com.carpassionnetwork.model.Comment;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.CommentRepository;
import java.util.HashSet;
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

    Comment comment =
        Comment.builder().user(user).post(post).content(content).likes(new HashSet<>()).build();

    return commentRepository.save(comment);
  }

  public Comment likeOrUnlikeComment(UUID commentId) {
    User currentUser = userService.getCurrentUser();

    Comment likedComment = getComment(commentId);

    boolean isCommentLiked = likedComment.getLikes().contains(currentUser);

    if (isCommentLiked) {
      likedComment.getLikes().remove(currentUser);
    } else {
      likedComment.getLikes().add(currentUser);
    }

    return commentRepository.save(likedComment);
  }

  public Comment getComment(UUID id) {
    return commentRepository.findById(id).orElseThrow(() -> new CommentNotFoundException(id));
  }
}
