package com.carpassionnetwork.controller;

import com.carpassionnetwork.dto.request.CommentRequestDto;
import com.carpassionnetwork.dto.response.CommentResponseDto;
import com.carpassionnetwork.mapper.CommentMapper;
import com.carpassionnetwork.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {

  private final CommentService commentService;
  private final CommentMapper commentMapper;

  @PostMapping
  public ResponseEntity<CommentResponseDto> createPost(
      @RequestBody @Valid CommentRequestDto postRequestDto) {

    return ResponseEntity.ok(
        commentMapper.toCommentResponse(
            commentService.createComment(postRequestDto.getPostId(), postRequestDto.getContent())));
  }
}
