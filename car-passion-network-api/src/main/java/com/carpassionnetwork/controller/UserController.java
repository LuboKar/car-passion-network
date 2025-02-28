package com.carpassionnetwork.controller;

import com.carpassionnetwork.dto.request.UserEditRequest;
import com.carpassionnetwork.dto.response.UserResponseDto;
import com.carpassionnetwork.mapper.UserMapper;
import com.carpassionnetwork.service.UserService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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

  @PostMapping("/friends/{userId}")
  @ResponseStatus(HttpStatus.OK)
  public void addFriends(@PathVariable UUID userId) {
    userService.addFriend(userId);
  }

  @DeleteMapping("/friends/{userId}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void removeFriends(@PathVariable UUID userId) {
    userService.removeFriend(userId);
  }

  @GetMapping("/friends/{userId}")
  public ResponseEntity<List<UserResponseDto>> getAllFriendsByUserId(@PathVariable UUID userId) {
    return ResponseEntity.ok(
        userMapper.toUserResponseList(userService.getAllFriendsByUserId(userId)));
  }

  @GetMapping("/group/{groupId}/members")
  public ResponseEntity<List<UserResponseDto>> getAllGroupMembers(@PathVariable UUID groupId) {
    return ResponseEntity.ok(
        userMapper.toUserResponseList(userService.getAllGroupMembers(groupId)));
  }

  @GetMapping("/findBy/{term}")
  public ResponseEntity<List<UserResponseDto>> findUsersByFullNameStartsWith(
      @PathVariable String term) {
    return ResponseEntity.ok(
        userMapper.toUserResponseList(userService.findUsersByFullNameStartsWith(term)));
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteUser(@PathVariable UUID id) {
    userService.deleteUser(id);
  }

  @GetMapping("/{firstUser}/friends/{secondUser}")
  public ResponseEntity<Boolean> areFriends(
      @PathVariable UUID firstUser, @PathVariable UUID secondUser) {
    return ResponseEntity.ok(userService.areFriends(firstUser, secondUser));
  }
}
