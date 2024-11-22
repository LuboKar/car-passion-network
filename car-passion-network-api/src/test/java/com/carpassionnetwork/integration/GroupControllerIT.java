package com.carpassionnetwork.integration;

import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.carpassionnetwork.exception.InvalidCredentialsException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.test.context.support.WithMockUser;

public class GroupControllerIT extends BaseIT {

  private String groupName;

  @BeforeEach
  void setUp() {
    groupName = "Some group name.";
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void createGroupShouldThrowInvalidCredentialsException() throws Exception {
    mockMvc
        .perform(post("/group/" + groupName))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(InvalidCredentialsException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void createGroupSuccessfully() throws Exception {
    register();

    mockMvc
        .perform(post("/group/" + groupName))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value(groupName));
  }
}
