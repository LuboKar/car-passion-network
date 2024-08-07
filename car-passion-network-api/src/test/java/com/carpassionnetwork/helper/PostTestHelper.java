package com.carpassionnetwork.helper;

import com.carpassionnetwork.dto.request.PostRequestDto;
import com.carpassionnetwork.model.Post;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.UUID;

public class PostTestHelper {

  public static Post createNewPost() {
    return Post.builder()
        .id(UUID.randomUUID())
        .title("PostTitle")
        .content("PostContent")
        .createdAt(LocalDateTime.now())
        .likes(new HashSet<>())
        .comments(new ArrayList<>())
        .build();
  }

  public static PostRequestDto createNewPostRequest() {
    return PostRequestDto.builder()
        .ownerId(UUID.randomUUID())
        .title("PostTitle")
        .content("PostContent")
        .build();
  }
}
