package com.carpassionnetwork.controller;

import com.carpassionnetwork.dto.request.PostCreateRequestDto;
import com.carpassionnetwork.dto.request.PostEditRequestDto;
import com.carpassionnetwork.dto.response.PostResponseDto;
import com.carpassionnetwork.mapper.PostMapper;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.service.PostService;
import jakarta.validation.Valid;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/post")
public class PostController {
  private final PostMapper postMapper;
  private final PostService postService;

  @GetMapping("/{id}")
  public ResponseEntity<PostResponseDto> getPost(@PathVariable UUID id) {
    return ResponseEntity.ok(postMapper.toPostResponse(postService.getPost(id)));
  }

  @GetMapping
  public ResponseEntity<List<PostResponseDto>> getALlPosts() {
    return ResponseEntity.ok(postMapper.toDtoList(postService.getAllPosts()));
  }

  @GetMapping("/user/{id}")
  public ResponseEntity<List<PostResponseDto>> getAllPostsByUserId(@PathVariable UUID id) {
    return ResponseEntity.ok(postMapper.toDtoList(postService.getAllPostsByUserId(id)));
  }

  @PostMapping
  public ResponseEntity<PostResponseDto> createPost(
      @RequestBody @Valid PostCreateRequestDto postCreateRequestDto) {
    Post post = postMapper.toPostEntity(postCreateRequestDto);
    return ResponseEntity.ok(
        postMapper.toPostResponse(
            postService.createPost(
                post, postCreateRequestDto.getOwner(), postCreateRequestDto.getGroup())));
  }

  @PostMapping("/like/{id}")
  public ResponseEntity<PostResponseDto> likePost(@PathVariable UUID id) {
    return ResponseEntity.ok(postMapper.toPostResponse(postService.likeOrUnlikePost(id)));
  }

  @DeleteMapping("/delete/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deletePost(@PathVariable UUID id) {
    postService.deletePost(id);
  }

  @PutMapping("/edit")
  public ResponseEntity<PostResponseDto> editPost(
      @RequestBody @Valid PostEditRequestDto postEditRequestDto) {
    return ResponseEntity.ok(
        postMapper.toPostResponse(
            postService.editPost(
                postEditRequestDto.getPostId(),
                postEditRequestDto.getTitle(),
                postEditRequestDto.getContent())));
  }
}
