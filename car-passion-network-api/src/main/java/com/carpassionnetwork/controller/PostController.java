package com.carpassionnetwork.controller;

import com.carpassionnetwork.dto.request.PostRequestDto;
import com.carpassionnetwork.mapper.PostMapper;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.service.PostService;
import jakarta.validation.Valid;
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
  public ResponseEntity<String> createPost(@RequestBody @Valid PostRequestDto postRequestDto) {
    Post post = postMapper.toPostEntity(postRequestDto);
    return ResponseEntity.ok(postService.createPost(post));
  }
}
