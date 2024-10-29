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

    Comment comment = buildComment(user, post, content);

    return commentRepository.save(comment);
  }

  public Comment replyComment(UUID parentId, String content) {
    User user = userService.getCurrentUser();
    Comment parentComment = getComment(parentId);

    Comment reply = buildReply(user, parentComment, content);
    Comment savedReply = commentRepository.save(reply);

    return getParent(savedReply);
  }

  public Comment likeOrUnlikeComment(UUID commentId) {
    User currentUser = userService.getCurrentUser();
    Comment likedComment = getComment(commentId);

    toggleLike(currentUser, likedComment);

    Comment savedComment = commentRepository.save(likedComment);

    return savedComment.getParent() != null ? getParent(savedComment) : savedComment;
  }

  public Comment getComment(UUID id) {
    return commentRepository.findById(id).orElseThrow(() -> new CommentNotFoundException(id));
  }

  public void deleteComment(UUID postId, UUID commentID) {
    User currentUser = userService.getCurrentUser();
    Post post = postService.getPost(postId);
    Comment commentToDelete = getComment(commentID);

    validateUserCanEditComment(currentUser, post);

    commentRepository.delete(commentToDelete);
  }

  public Comment editComment(UUID postId, UUID commentId, String content) {
    User currentUser = userService.getCurrentUser();
    Post post = postService.getPost(postId);
    Comment commentToEdit = getComment(commentId);

    validateUserCanEditComment(currentUser, post);

    commentToEdit.setContent(content);

    return commentRepository.save(commentToEdit);
  }

  private Comment buildComment(User user, Post post, String content) {
    return Comment.builder()
        .user(user)
        .post(post)
        .content(content)
        .likes(new HashSet<>())
        .depth(STARTING_DEPTH)
        .build();
  }

  private Comment buildReply(User user, Comment parentComment, String content) {
    return Comment.builder()
        .user(user)
        .content(content)
        .likes(new HashSet<>())
        .parent(parentComment)
        .post(parentComment.getPost())
        .depth(parentComment.getDepth() + 1)
        .build();
  }

  private Comment getParent(Comment comment) {
    Comment parentComment = comment.getParent();
    while (parentComment.getParent() != null) {
      parentComment = parentComment.getParent();
    }

    return parentComment;
  }

  private void toggleLike(User currentUser, Comment likedComment) {
    if (!likedComment.getLikes().remove(currentUser)) {
      likedComment.getLikes().add(currentUser);
    }
  }

  private void validateUserCanEditComment(User user, Post post) {
    if (!post.getAuthor().equals(user) && !post.getUser().equals(user)) {
      throw new UserNotAuthorException(user.getId(), post.getId());
    }
  }
}
