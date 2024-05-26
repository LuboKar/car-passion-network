package com.carpassionnetwork.integration;

import static org.junit.jupiter.api.Assertions.assertInstanceOf;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import com.carpassionnetwork.dto.request.PostRequestDto;
import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.helper.PostTestHelper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;

public class PostControllerIT extends BaseIT {
  private PostRequestDto postRequestDto;

  @BeforeEach
  void setUp() {
    postRequestDto = PostTestHelper.createNewPostRequest();
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreatePostShouldThrowInvalidCredentialsException() throws Exception {
    mockMvc
        .perform(
            post("/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postRequestDto)))
        .andExpect(status().isBadRequest())
        .andExpect(
            result ->
                assertInstanceOf(InvalidCredentialsException.class, result.getResolvedException()));
  }

  @Test
  @WithMockUser(username = "john.doe@gmail.com", roles = "USER")
  void testCreatePostSuccessfully() throws Exception {
    register();

    mockMvc
        .perform(
            post("/post")
                .contentType(MediaType.APPLICATION_JSON)
                .content(gson.toJson(postRequestDto)))
        .andExpect(status().isOk())
        .andExpect(content().string("Post created successfully!"));
  }
}
