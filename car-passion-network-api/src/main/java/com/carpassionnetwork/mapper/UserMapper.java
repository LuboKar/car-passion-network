package com.carpassionnetwork.mapper;

import com.carpassionnetwork.dto.request.RegistrationRequest;
import com.carpassionnetwork.dto.response.UserWithPostsResponseDto;
import com.carpassionnetwork.model.User;
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

  public UserWithPostsResponseDto toUserResponse(User user) {
    return modelMapper.map(user, UserWithPostsResponseDto.class);
  }
}
