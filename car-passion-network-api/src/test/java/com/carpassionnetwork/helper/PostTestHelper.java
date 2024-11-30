package com.carpassionnetwork.helper;

import com.carpassionnetwork.dto.request.PostCreateRequestDto;
import com.carpassionnetwork.dto.request.PostEditRequestDto;
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

  public static PostCreateRequestDto createNewPostCreateRequest() {
    return PostCreateRequestDto.builder()
        .owner(UUID.randomUUID())
        .title("PostTitle")
        .content("PostContent")
        .build();
  }

  public static PostEditRequestDto createNewPostEditRequest() {
    return PostEditRequestDto.builder().title("NewPostTitle").content("NewPostContent").build();
  }
}
