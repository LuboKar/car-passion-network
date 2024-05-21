package com.carpassionnetwork.service;

import com.carpassionnetwork.dto.request.LoginRequest;
import com.carpassionnetwork.dto.response.AuthenticationResponse;
import com.carpassionnetwork.exception.AlreadyUsedEmailException;
import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.exception.UserNotFoundException;
import com.carpassionnetwork.model.Role;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.UserRepository;
import java.util.HashMap;
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
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;
  private final AuthenticationManager authenticationManager;

  public String register(User registeredUser) {
    validateUserEmail(registeredUser);

    registeredUser.setRole(Role.USER);
    registeredUser.setPassword(passwordEncoder.encode(registeredUser.getPassword()));

    userRepository.save(registeredUser);

    return String.format(USER_CREATED_SUCCESSFULLY, registeredUser.getEmail());
  }

  public AuthenticationResponse login(LoginRequest loginRequest) {
    authentication(loginRequest);
    User user = findUserByEmail(loginRequest.getEmail());
    Map<String, Object> claims = new HashMap<>();
    claims.put("userId", user.getId());
    String jwtToken = jwtService.generateToken(claims, user);
    return AuthenticationResponse.builder().token(jwtToken).build();
  }

  private void validateUserEmail(User user) {
    Optional<User> savedUser = userRepository.findByEmail(user.getEmail());
    if (savedUser.isPresent()) throw new AlreadyUsedEmailException();
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

  private User findUserByEmail(String email) {
    return userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException(email));
  }
}
