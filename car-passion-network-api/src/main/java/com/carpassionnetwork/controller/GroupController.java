package com.carpassionnetwork.controller;

import com.carpassionnetwork.dto.response.GroupResponseDto;
import com.carpassionnetwork.mapper.GroupMapper;
import com.carpassionnetwork.service.GroupService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
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
}
