package com.carpassionnetwork.helper;

import com.carpassionnetwork.dto.request.UserEditRequest;

public class UserTestHelper {
  public static UserEditRequest createUserEditRequest() {
    return UserEditRequest.builder().firstName("Jane").lastName("Down").build();
  }
}
