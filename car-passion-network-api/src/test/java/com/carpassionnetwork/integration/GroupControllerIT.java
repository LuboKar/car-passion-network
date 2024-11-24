package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.GroupTestHelper.createNewGroup;
import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.model.Group;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.test.context.support.WithMockUser;

public class GroupControllerIT extends BaseIT {

  private Group group;

  @BeforeEach
  void setUp() {
    group = createNewGroup();
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void createGroupShouldThrowInvalidCredentialsException() throws Exception {
    mockMvc
        .perform(post("/group/" + group.getName()))
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
        .perform(post("/group/" + group.getName()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value(group.getName()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void getGroupShouldThrowGroupNotFoundException() throws Exception {
    register();
    Group savedGroup = createGroup(group);

    mockMvc
        .perform(get("/group/" + savedGroup.getId()))
        .andExpect(status().isOk())
        .andExpect(jsonPath("$.name").value(savedGroup.getName()));
  }
}
