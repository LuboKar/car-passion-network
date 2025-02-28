package com.carpassionnetwork.mapper;

import com.carpassionnetwork.dto.response.CommentResponseDto;
import com.carpassionnetwork.model.Comment;
import com.carpassionnetwork.service.UserService;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentMapper {
  private final ModelMapper modelMapper;
  private final UserService userService;

  public CommentResponseDto toCommentResponse(Comment comment) {
    CommentResponseDto commentResponseDto = modelMapper.map(comment, CommentResponseDto.class);
    commentResponseDto.setCurrentUserLike(isCurrentUserLiked(comment));

    if (comment.getReplies() != null) {
      List<CommentResponseDto> replies =
          comment.getReplies().stream().map(this::toCommentResponse).collect(Collectors.toList());
      commentResponseDto.setReplies(replies);
    }

    return commentResponseDto;
  }

  private boolean isCurrentUserLiked(Comment comment) {
    return comment.getLikes().contains(userService.getCurrentUser());
  }
}
