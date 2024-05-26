package com.carpassionnetwork.controller;

import com.carpassionnetwork.dto.response.UserWithPostsResponseDto;
import com.carpassionnetwork.mapper.UserMapper;
import com.carpassionnetwork.service.UserService;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserController {
  private final UserService userService;
  private final UserMapper userMapper;

  @GetMapping("/{id}")
  public ResponseEntity<UserWithPostsResponseDto> getUser(@PathVariable UUID id) {
    return ResponseEntity.ok(userMapper.toUserResponse(userService.getUser(id)));
  }
}
