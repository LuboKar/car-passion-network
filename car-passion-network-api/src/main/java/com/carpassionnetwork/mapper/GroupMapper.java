package com.carpassionnetwork.mapper;

import com.carpassionnetwork.dto.response.GroupResponseDto;
import com.carpassionnetwork.model.Group;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class GroupMapper {
  private final ModelMapper modelMapper;

  public GroupResponseDto toGroupResponse(Group group) {
    GroupResponseDto groupResponseDto = modelMapper.map(group, GroupResponseDto.class);

    groupResponseDto.setCurrentUserMember(isCurrentUserMember(group));

    return groupResponseDto;
  }

  public List<GroupResponseDto> toGroupResponseList(List<Group> groups) {
    return groups.stream().map(this::toGroupResponse).collect(Collectors.toList());
  }

  private boolean isCurrentUserMember(Group group) {
    UserDetails currentUser =
        (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    return group.getMembers().contains(currentUser);
  }
}
