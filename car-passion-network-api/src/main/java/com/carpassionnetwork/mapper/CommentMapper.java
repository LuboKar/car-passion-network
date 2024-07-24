package com.carpassionnetwork.mapper;

import com.carpassionnetwork.dto.response.CommentResponseDto;
import com.carpassionnetwork.model.Comment;
import com.carpassionnetwork.model.User;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentMapper {
  private final ModelMapper modelMapper;

  public CommentResponseDto toCommentResponse(Comment comment) {
    CommentResponseDto commentResponseDto = modelMapper.map(comment, CommentResponseDto.class);
    commentResponseDto.setCurrentUserLike(isCurrentUserLiked(comment));
    return commentResponseDto;
  }

  private boolean isCurrentUserLiked(Comment comment) {
    String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

    if (comment.getLikes() != null) {
      for (User user : comment.getLikes()) {
        if (user.getEmail().equals(currentUserEmail)) {
          return true;
        }
      }
    }
    return false;
  }
}
