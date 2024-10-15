package com.carpassionnetwork.mapper;

import com.carpassionnetwork.dto.request.RegistrationRequest;
import com.carpassionnetwork.dto.response.UserResponseDto;
import com.carpassionnetwork.model.User;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserMapper {
  private final ModelMapper modelMapper;

  public User toUserEntity(RegistrationRequest registerRequest) {
    return modelMapper.map(registerRequest, User.class);
  }

  public UserResponseDto toUserResponse(User user) {
    UserResponseDto userResponseDto = modelMapper.map(user, UserResponseDto.class);

    userResponseDto.setFriend(isCurrentUserFriend(user));

    return userResponseDto;
  }

  public List<UserResponseDto> toUserResponseList(List<User> users) {
    return users.stream().map(this::toUserResponse).collect(Collectors.toList());
  }

  private boolean isCurrentUserFriend(User user) {
    UserDetails currentUser =
        (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

    return user.getFriends().contains(currentUser);
  }
}
