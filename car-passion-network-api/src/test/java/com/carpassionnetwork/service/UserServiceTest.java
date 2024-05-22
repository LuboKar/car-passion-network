package com.carpassionnetwork.service;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createNewUser;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import com.carpassionnetwork.exception.UserNotFoundException;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.UserRepository;
import java.util.Optional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
  @InjectMocks private UserService userService;

  @Mock private UserRepository userRepository;

  private User user;

  @BeforeEach
  void setUp() {
    user = createNewUser();
  }

  @Test
  void getUserShouldThrowUserNotFoundException() {
    when(userRepository.findById(any())).thenReturn(Optional.empty());

    assertThrows(UserNotFoundException.class, () -> userService.getUser(user.getId()));
  }

  @Test
  void getUserSuccessfully() {
    when(userRepository.findById(any())).thenReturn(Optional.of(user));

    User actualUser = userService.getUser(user.getId());

    assertNotNull(actualUser);
    assertEquals(actualUser, user);
    verify(userRepository, times(1)).findById(user.getId());
  }
}
