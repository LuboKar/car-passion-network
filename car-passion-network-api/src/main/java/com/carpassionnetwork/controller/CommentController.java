package com.carpassionnetwork.controller;

import com.carpassionnetwork.dto.request.CommentEditRequestDto;
import com.carpassionnetwork.dto.request.CommentRequestDto;
import com.carpassionnetwork.dto.response.CommentResponseDto;
import com.carpassionnetwork.mapper.CommentMapper;
import com.carpassionnetwork.service.CommentService;
import jakarta.validation.Valid;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/comment")
public class CommentController {

  private final CommentService commentService;
  private final CommentMapper commentMapper;

  @PostMapping
  public ResponseEntity<CommentResponseDto> createComment(
      @RequestBody @Valid CommentRequestDto commentRequestDto) {

    return ResponseEntity.ok(
        commentMapper.toCommentResponse(
            commentService.createComment(
                commentRequestDto.getPostId(), commentRequestDto.getContent())));
  }

  @PostMapping("/like/{id}")
  public ResponseEntity<CommentResponseDto> likeComment(@PathVariable UUID id) {
    return ResponseEntity.ok(
        commentMapper.toCommentResponse(commentService.likeOrUnlikeComment(id)));
  }

  @PostMapping("/reply")
  public ResponseEntity<CommentResponseDto> replyComment(
      @RequestBody @Valid CommentRequestDto commentRequestDto) {
    return ResponseEntity.ok(
        commentMapper.toCommentResponse(
            commentService.replyComment(
                commentRequestDto.getParentCommentId(), commentRequestDto.getContent())));
  }

  @DeleteMapping("/delete/{postId}/{commentId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteComment(@PathVariable UUID postId, @PathVariable UUID commentId) {
    commentService.deleteComment(postId, commentId);
  }

  @PutMapping("/edit")
  public ResponseEntity<CommentResponseDto> editComment(
      @RequestBody @Valid CommentEditRequestDto commentEditRequestDto) {
    return ResponseEntity.ok(
        commentMapper.toCommentResponse(
            commentService.editComment(
                commentEditRequestDto.getPostId(),
                commentEditRequestDto.getCommentId(),
                commentEditRequestDto.getContent())));
  }
}
