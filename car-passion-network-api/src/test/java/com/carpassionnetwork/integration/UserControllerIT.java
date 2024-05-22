package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.EMAIL;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.carpassionnetwork.exception.UserNotFoundException;
import com.carpassionnetwork.model.Gender;
import com.carpassionnetwork.model.User;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.security.test.context.support.WithMockUser;

public class UserControllerIT extends BaseIT {

  @Test
  @WithMockUser(username = "user", roles = "USER")
  void getUserShouldThrowUserNotFoundException() throws Exception {
    mockMvc
        .perform(get("/users/" + currentUser.getId()))
        .andExpect(status().isBadRequest())
        .andExpect(
            result -> assertInstanceOf(UserNotFoundException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "user", roles = "USER")
  void getUserSuccessfully() throws Exception {
    register();
    User registeredUser = getRegisteredUser();

    mockMvc
        .perform(get("/users/" + registeredUser.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.id").value(registeredUser.getId().toString()))
        .andExpect(jsonPath("$.firstName").value(registeredUser.getFirstName()))
        .andExpect(jsonPath("$.lastName").value(registeredUser.getLastName()))
        .andExpect(jsonPath("$.dateOfBirth").value(registeredUser.getDateOfBirth().toString()))
        .andExpect(jsonPath("$.email").value(EMAIL))
        .andExpect(jsonPath("$.gender").value(Gender.MALE.toString()));
  }

  private User getRegisteredUser() {
    Optional<User> registeredUser = userRepository.findByEmail(EMAIL);
    return registeredUser.orElse(null);
  }
}
