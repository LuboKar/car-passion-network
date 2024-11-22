package com.carpassionnetwork.controller;

import com.carpassionnetwork.dto.response.GroupResponseDto;
import com.carpassionnetwork.mapper.GroupMapper;
import com.carpassionnetwork.service.GroupService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
