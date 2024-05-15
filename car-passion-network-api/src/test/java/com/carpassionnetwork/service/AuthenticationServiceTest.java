package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.exception.AlreadyUsedEmailException;
import com.carpassionnetwork.model.Role;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.UserRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
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

  @BeforeEach
  void setUp() {
    user = createNewUser();
    successMessage = String.format(USER_CREATED_SUCCESSFULLY, EMAIL);
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
}
