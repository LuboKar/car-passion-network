package com.carpassionnetwork.mapper;

import com.carpassionnetwork.dto.response.GroupResponseDto;
import com.carpassionnetwork.model.Group;
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
}
