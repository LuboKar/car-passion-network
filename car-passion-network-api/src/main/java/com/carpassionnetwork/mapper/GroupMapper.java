package com.carpassionnetwork.mapper;

import com.carpassionnetwork.dto.response.GroupResponseDto;
import com.carpassionnetwork.model.Group;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GroupMapper {
  private final ModelMapper modelMapper;

  public GroupResponseDto toGroupResponse(Group group) {
    return modelMapper.map(group, GroupResponseDto.class);
  }

  public List<GroupResponseDto> toGroupResponseList(List<Group> groups) {
    return groups.stream().map(this::toGroupResponse).collect(Collectors.toList());
  }
}
