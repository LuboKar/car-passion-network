package com.carpassionnetwork.service;

import com.carpassionnetwork.exception.CommentNotFoundException;
import com.carpassionnetwork.exception.UserNotAuthorException;
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
  private static final int STARTING_DEPTH = 1;
  private final UserService userService;
  private final PostService postService;
  private final CommentRepository commentRepository;

  public Comment createComment(UUID postId, String content) {
    User user = userService.getCurrentUser();
    Post post = postService.getPost(postId);

    Comment comment =
        Comment.builder()
            .user(user)
            .post(post)
            .content(content)
            .likes(new HashSet<>())
            .depth(STARTING_DEPTH)
            .build();

    return commentRepository.save(comment);
  }

  public Comment replyComment(UUID parentId, String content) {
    User user = userService.getCurrentUser();
    Comment parentComment = getComment(parentId);

    Comment reply =
        Comment.builder()
            .user(user)
            .content(content)
            .likes(new HashSet<>())
            .parent(parentComment)
            .post(parentComment.getPost())
            .depth(parentComment.getDepth() + 1)
            .build();

    Comment savedReply = commentRepository.save(reply);

    if (savedReply.getParent() != null) {
      return getParent(savedReply);
    }

    return savedReply;
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

    Comment parrentComment;
    if (likedComment.getParent() != null) {
      parrentComment = getParent(likedComment);
    } else parrentComment = likedComment;

    return commentRepository.save(parrentComment);
  }

  public Comment getComment(UUID id) {
    return commentRepository.findById(id).orElseThrow(() -> new CommentNotFoundException(id));
  }

  public void deleteComment(UUID postId, UUID commentID) {
    User currentUser = userService.getCurrentUser();
    Post post = postService.getPost(postId);
    Comment commentToDelete = getComment(commentID);

    if (!post.getAuthor().equals(currentUser) && !post.getUser().equals(currentUser)) {
      throw new UserNotAuthorException(currentUser.getId(), postId);
    }

    commentRepository.delete(commentToDelete);
  }

  private Comment getParent(Comment comment) {
    Comment parentComment = comment.getParent();
    while (parentComment.getParent() != null) {
      parentComment = parentComment.getParent();
    }

    return parentComment;
  }
}
