package com.carpassionnetwork.mapper;

import com.carpassionnetwork.dto.request.PostCreateRequestDto;
import com.carpassionnetwork.dto.response.CommentResponseDto;
import com.carpassionnetwork.dto.response.PostResponseDto;
import com.carpassionnetwork.model.Post;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PostMapper {
  private final ModelMapper modelMapper;
  private final CommentMapper commentMapper;

  public Post toPostEntity(PostCreateRequestDto postCreateRequestDto) {
    return modelMapper.map(postCreateRequestDto, Post.class);
  }

  public PostResponseDto toPostResponse(Post post) {
    PostResponseDto postResponseDto = modelMapper.map(post, PostResponseDto.class);
    postResponseDto.setCurrentUserLike(isCurrentUserLiked(post));

    List<CommentResponseDto> commentResponseDtos =
        post.getComments().stream()
            .filter(comment -> comment.getParent() == null)
            .map(commentMapper::toCommentResponse)
            .collect(Collectors.toList());

    postResponseDto.setComments(commentResponseDtos);
    return postResponseDto;
  }

  public List<PostResponseDto> toDtoList(List<Post> posts) {
    return posts.stream().map(this::toPostResponse).collect(Collectors.toList());
  }

  private boolean isCurrentUserLiked(Post post) {
    UserDetails currentUser =
        (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    return post.getLikes().contains(currentUser);
  }
}
