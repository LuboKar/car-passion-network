package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.*;
import static com.carpassionnetwork.helper.AuthenticationTestHelper.createLoginRequest;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@ExtendWith(MockitoExtension.class)
public class AuthenticationServiceTest {
  @InjectMocks private AuthenticationService authenticationService;

  @Mock private UserRepository userRepository;
  @Mock private PasswordEncoder passwordEncoder;
  @Mock private AuthenticationManager authenticationManager;
  @Mock private JwtService jwtService;

  private User user;
  private String successMessage;
  private LoginRequest loginRequest;
  private Map<String, Object> claims;
  private String token;

  @BeforeEach
  void setUp() {
    user = createUserOne();
    successMessage = String.format(USER_CREATED_SUCCESSFULLY, EMAIL);
    loginRequest = createLoginRequest();
    claims = new HashMap<>();
    claims.put("userId", user.getId());
    token = "random_token";
  }

  @Test
  void testRegisterShouldThrowAlreadyUsedEmailException() {
    when(userRepository.findByEmail(EMAIL)).thenThrow(AlreadyUsedEmailException.class);

    assertThrows(AlreadyUsedEmailException.class, () -> authenticationService.register(user));
    verify(userRepository, never()).save(user);
  }

  @Test
  void testRegisterSuccessfully() {
    when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());
    when(passwordEncoder.encode(user.getPassword())).thenReturn("password");

    String result = authenticationService.register(user);

    assertNotNull(result);
    assertEquals(user.getRole(), Role.USER);
    assertEquals(user.getPassword(), "password");
    assertEquals(result, successMessage);
    verify(userRepository, times(1)).save(user);
  }

  @Test
  void testLoginShouldThrowInvalidCredentialsException() {
    when(authenticationManager.authenticate(any())).thenThrow(InvalidCredentialsException.class);

    assertThrows(
        InvalidCredentialsException.class, () -> authenticationService.login(loginRequest));
  }

  @Test
  void testLoginShouldThrowUserNotFoundException() {
    when(userRepository.findByEmail(loginRequest.getEmail()))
        .thenThrow(UserNotFoundException.class);

    assertThrows(UserNotFoundException.class, () -> authenticationService.login(loginRequest));
  }

  @Test
  void testLoginSuccessfully() {
    when(userRepository.findByEmail(loginRequest.getEmail())).thenReturn(Optional.of(user));
    when(jwtService.generateToken(claims, user)).thenReturn(token);

    AuthenticationResponse authenticationResponse = authenticationService.login(loginRequest);

    assertNotNull(authenticationResponse);
    assertEquals(authenticationResponse.getToken(), token);
    verify(authenticationManager)
        .authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getEmail(), loginRequest.getPassword()));
    verify(userRepository, times(1)).findByEmail(loginRequest.getEmail());
    verify(jwtService, times(1)).generateToken(claims, user);
  }
}
