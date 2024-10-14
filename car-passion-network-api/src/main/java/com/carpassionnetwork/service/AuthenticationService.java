package com.carpassionnetwork.service;

import com.carpassionnetwork.dto.request.LoginRequest;
import com.carpassionnetwork.dto.response.AuthenticationResponse;
import com.carpassionnetwork.exception.AlreadyUsedEmailException;
import com.carpassionnetwork.exception.FolderNotCreatedException;
import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.exception.UserNotFoundException;
import com.carpassionnetwork.model.Role;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.UserRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Map;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
  private static final String USER_CREATED_SUCCESSFULLY =
      "User with email %s was created successfully!";
  private static final String PARENT_DIRECTORY = "ProfilePictures";
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public String register(User user) {
    validateUserEmail(user);

    createDirectory(user.getEmail());

    registerUser(user);

    return String.format(USER_CREATED_SUCCESSFULLY, user.getEmail());
  }

  public AuthenticationResponse login(LoginRequest loginRequest) {
    authentication(loginRequest);

    return buildAuthenticationResponse(loginRequest);
  }

  private void validateUserEmail(User user) {
    Optional<User> savedUser = userRepository.findByEmail(user.getEmail());
    if (savedUser.isPresent()) throw new AlreadyUsedEmailException();
  }

  private void createDirectory(String name) {
    Path path = Paths.get(PARENT_DIRECTORY, name);

    try {
      if (Files.notExists(path)) {
        Files.createDirectory(path);
      }
    } catch (IOException e) {
      throw new FolderNotCreatedException();
    }
  }

  private void registerUser(User registeredUser) {
    User userToSave = buildRegisteredUser(registeredUser);
    userRepository.save(userToSave);
  }

  private User buildRegisteredUser(User registeredUser) {
    registeredUser.setRole(Role.USER);
    registeredUser.setPassword(passwordEncoder.encode(registeredUser.getPassword()));
    registeredUser.setFriends(new HashSet<>());

    return registeredUser;
  }

  private void authentication(LoginRequest loginRequest) {
    try {
      authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              loginRequest.getEmail(), loginRequest.getPassword()));
    } catch (AuthenticationException e) {
      throw new InvalidCredentialsException();
    }
  }

  private AuthenticationResponse buildAuthenticationResponse(LoginRequest loginRequest) {
    User user = findUserByEmail(loginRequest.getEmail());
    Map<String, Object> claims = buildClaims(user);
    String jwtToken = jwtService.generateToken(claims, user);

    return AuthenticationResponse.builder()
        .token(jwtToken)
        .profilePicture(user.getProfilePicture())
        .build();
  }

  private User findUserByEmail(String email) {
    return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
  }

  private Map<String, Object> buildClaims(User user) {
    return Map.of("userId", user.getId());
  }
}
