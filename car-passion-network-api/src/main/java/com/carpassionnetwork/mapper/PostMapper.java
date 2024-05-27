package com.carpassionnetwork.mapper;

import com.carpassionnetwork.dto.request.PostRequestDto;
import com.carpassionnetwork.dto.response.PostResponseDto;
import com.carpassionnetwork.model.Post;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PostMapper {
  private final ModelMapper modelMapper;

  public Post toPostEntity(PostRequestDto postRequestDto) {
    return modelMapper.map(postRequestDto, Post.class);
  }

  public PostResponseDto toPostResponse(Post post) {
    return modelMapper.map(post, PostResponseDto.class);
  }
}
