package com.carpassionnetwork.controller;

import com.carpassionnetwork.dto.response.GroupResponseDto;
import com.carpassionnetwork.mapper.GroupMapper;
import com.carpassionnetwork.service.GroupService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
  public ResponseEntity<List<GroupResponseDto>> getAllGroupsByAdminId(@PathVariable UUID id) {
    return ResponseEntity.ok(
        groupMapper.toGroupResponseList(groupService.getAllGroupsByAdminId(id)));
  }

  @GetMapping("/other/{id}")
  public ResponseEntity<List<GroupResponseDto>> getAllOtherGroups(@PathVariable UUID id) {
    return ResponseEntity.ok(groupMapper.toGroupResponseList(groupService.getAllOtherGroups(id)));
  }

  @PostMapping("/join/{id}")
  public ResponseEntity<GroupResponseDto> joinGroup(@PathVariable UUID id) {
    return ResponseEntity.ok(groupMapper.toGroupResponse(groupService.joinGroup(id)));
  }

  @GetMapping("/user/{id}")
  public ResponseEntity<List<GroupResponseDto>> getUserParticipatingGroups(@PathVariable UUID id) {
    return ResponseEntity.ok(
        groupMapper.toGroupResponseList(groupService.getUserParticipatingGroups(id)));
  }

  @DeleteMapping("/{id}")
  @ResponseStatus(HttpStatus.NO_CONTENT)
  public void deleteGroup(@PathVariable UUID id) {
    groupService.deleteGroup(id);
  }
}
