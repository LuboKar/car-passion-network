package com.carpassionnetwork.mapper;

import com.carpassionnetwork.dto.request.RegistrationRequest;
import com.carpassionnetwork.dto.response.UserResponseDto;
import com.carpassionnetwork.model.User;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {
  private final ModelMapper modelMapper;

  public User toUserEntity(RegistrationRequest registerRequest) {
    return modelMapper.map(registerRequest, User.class);
  }

  public UserResponseDto toUserResponse(User user) {
    return modelMapper.map(user, UserResponseDto.class);
  }

  public List<UserResponseDto> toUserResponseList(List<User> users) {
    return users.stream().map(this::toUserResponse).collect(Collectors.toList());
  }
}
