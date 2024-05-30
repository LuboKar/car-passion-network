package com.carpassionnetwork.mapper;

import com.carpassionnetwork.dto.response.CommentResponseDto;
import com.carpassionnetwork.model.Comment;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CommentMapper {
  private final ModelMapper modelMapper;

  public CommentResponseDto toCommentResponse(Comment comment) {
    return modelMapper.map(comment, CommentResponseDto.class);
  }
}
