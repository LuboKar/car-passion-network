package com.carpassionnetwork.controller;

import com.carpassionnetwork.dto.request.PostRequestDto;
import com.carpassionnetwork.dto.response.PostResponseDto;
import com.carpassionnetwork.mapper.PostMapper;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.service.PostService;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController {
  private final PostMapper postMapper;
  private final PostService postService;

  @PostMapping
  public ResponseEntity<PostResponseDto> createPost(
      @RequestBody @Valid PostRequestDto postRequestDto) {
    Post post = postMapper.toPostEntity(postRequestDto);
    return ResponseEntity.ok(postMapper.toPostResponse(postService.createPost(post)));
  }

  @PostMapping("/like/{id}")
  public ResponseEntity<String> likePost(@PathVariable UUID id) {
    return ResponseEntity.ok(postService.likeOrUnlikePost(id));
  }
}
