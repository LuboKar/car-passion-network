package com.carpassionnetwork.service;

import com.carpassionnetwork.exception.UserNotFoundException;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.UserRepository;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
  private final UserRepository userRepository;

  public User getUser(UUID id) {
    return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
  }
}
