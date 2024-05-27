package com.carpassionnetwork.mapper;

import com.carpassionnetwork.dto.request.PostRequestDto;
import com.carpassionnetwork.dto.response.PostResponseDto;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PostMapper {
  private final ModelMapper modelMapper;
  private final UserService userService;

  public Post toPostEntity(PostRequestDto postRequestDto) {
    return modelMapper.map(postRequestDto, Post.class);
  }

  public PostResponseDto toPostResponse(Post post) {
    PostResponseDto postResponseDto = modelMapper.map(post, PostResponseDto.class);
    postResponseDto.setCurrentUserLike(isCurrentUserLiked(post));
    return postResponseDto;
  }

  public boolean isCurrentUserLiked(Post post){
    if(post.getLikes() != null){
      System.out.println(post.getLikes());
      return post.getLikes().contains(userService.getCurrentUser());
    }
    System.out.println("smth");
    return false;
  }
}
