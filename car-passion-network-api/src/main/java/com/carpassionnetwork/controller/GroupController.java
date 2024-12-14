package com.carpassionnetwork.controller;

import com.carpassionnetwork.dto.response.GroupResponseDto;
import com.carpassionnetwork.dto.response.UserGroupResponseDto;
import com.carpassionnetwork.mapper.GroupMapper;
import com.carpassionnetwork.service.GroupService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/group")
public class GroupController {
  private final GroupService groupService;
  private final GroupMapper groupMapper;

  @PostMapping("/{name}")
  public ResponseEntity<GroupResponseDto> createGroup(@PathVariable String name) {
    return ResponseEntity.ok(groupMapper.toGroupResponse(groupService.createGroup(name)));
  }

  @GetMapping("/{id}")
  public ResponseEntity<GroupResponseDto> getGroup(@PathVariable UUID id) {
    return ResponseEntity.ok(groupMapper.toGroupResponse(groupService.getGroup(id)));
  }

  @GetMapping("/admin/{id}")
  public ResponseEntity<List<UserGroupResponseDto>> getAllGroupsByAdminId(@PathVariable UUID id) {
    return ResponseEntity.ok(
        groupMapper.toUserGroupResponseList(groupService.getAllGroupsByAdminId(id)));
  }

  @GetMapping("/other/{id}")
  public ResponseEntity<List<UserGroupResponseDto>> getAllOtherGroups(@PathVariable UUID id) {
    return ResponseEntity.ok(
        groupMapper.toUserGroupResponseList(groupService.getAllOtherGroups(id)));
  }

  @PostMapping("/join/{id}")
  public ResponseEntity<GroupResponseDto> joinGroup(@PathVariable UUID id) {
    return ResponseEntity.ok(groupMapper.toGroupResponse(groupService.joinGroup(id)));
  }

  @PostMapping("/leave/{id}")
  public ResponseEntity<UserGroupResponseDto> leaveGroup(@PathVariable UUID id) {
    return ResponseEntity.ok(groupMapper.toUserGroupResponse(groupService.leaveGroup(id)));
  }

  @GetMapping("/user/{id}")
  public ResponseEntity<List<UserGroupResponseDto>> getUserParticipatingGroups(
      @PathVariable UUID id) {
    return ResponseEntity.ok(
        groupMapper.toUserGroupResponseList(groupService.getUserParticipatingGroups(id)));
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteGroup(@PathVariable UUID id) {
    groupService.deleteGroup(id);
  }

  @PostMapping("/remove/{groupId}/{userId}")
  public ResponseEntity<GroupResponseDto> removeMember(
      @PathVariable UUID groupId, @PathVariable UUID userId) {
    return ResponseEntity.ok(
        groupMapper.toGroupResponse(groupService.removeMember(groupId, userId)));
  }

  @PutMapping("/upload/{groupId}")
  public ResponseEntity<GroupResponseDto> uploadGroupPicture(
      @RequestParam("file") MultipartFile file, @PathVariable UUID groupId) {
    return ResponseEntity.ok(
        groupMapper.toGroupResponse(groupService.uploadGroupPicture(file, groupId)));
  }
}
