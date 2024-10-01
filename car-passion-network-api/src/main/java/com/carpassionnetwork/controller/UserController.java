package com.carpassionnetwork.controller;

import com.carpassionnetwork.dto.request.UserEditRequest;
import com.carpassionnetwork.dto.response.UserResponseDto;
import com.carpassionnetwork.mapper.UserMapper;
import com.carpassionnetwork.service.UserService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
  private final UserService userService;
  private final UserMapper userMapper;

  @GetMapping("/{id}")
  public ResponseEntity<UserResponseDto> getUser(@PathVariable UUID id) {
    return ResponseEntity.ok(userMapper.toUserResponse(userService.getUser(id)));
  }

  @PutMapping("/upload")
  public ResponseEntity<UserResponseDto> uploadProfilePicture(
      @RequestParam("file") MultipartFile file) {
    return ResponseEntity.ok(userMapper.toUserResponse(userService.uploadProfilePicture(file)));
  }

  @PatchMapping("/edit")
  public ResponseEntity<UserResponseDto> editUser(@RequestBody UserEditRequest userEditRequest) {
    return ResponseEntity.ok(userMapper.toUserResponse(userService.editUser(userEditRequest)));
  }
}
