package com.carpassionnetwork.service;

import com.carpassionnetwork.exception.AlreadyUsedEmailException;
import com.carpassionnetwork.model.Role;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.UserRepository;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private static final String USER_CREATED_SUCCESSFULLY =
      "User with email %s was created successfully!";
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  public String register(User registeredUser) {
    validateUserEmail(registeredUser);

    registeredUser.setRole(Role.USER);
    registeredUser.setPassword(passwordEncoder.encode(registeredUser.getPassword()));

    userRepository.save(registeredUser);

    return String.format(USER_CREATED_SUCCESSFULLY, registeredUser.getEmail());
  }

  private void validateUserEmail(User user) {
    Optional<User> savedUser = userRepository.findByEmail(user.getEmail());
    if (savedUser.isPresent()) throw new AlreadyUsedEmailException();
  }
}
