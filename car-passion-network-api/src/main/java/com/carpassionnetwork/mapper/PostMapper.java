package com.carpassionnetwork.mapper;

import com.carpassionnetwork.dto.request.PostRequestDto;
import com.carpassionnetwork.dto.response.CommentResponseDto;
import com.carpassionnetwork.dto.response.PostResponseDto;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class PostMapper {
  private final ModelMapper modelMapper;
  private final CommentMapper commentMapper;

  public Post toPostEntity(PostRequestDto postRequestDto) {
    return modelMapper.map(postRequestDto, Post.class);
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
    String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();

    if (post.getLikes() != null) {
      for (User user : post.getLikes()) {
        if (user.getEmail().equals(currentUserEmail)) {
          return true;
        }
      }
    }

    return false;
  }
}
