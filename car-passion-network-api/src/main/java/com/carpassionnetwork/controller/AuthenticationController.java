package com.carpassionnetwork.controller;

import com.carpassionnetwork.dto.request.LoginRequest;
import com.carpassionnetwork.dto.request.RegistrationRequest;
import com.carpassionnetwork.dto.response.AuthenticationResponse;
import com.carpassionnetwork.mapper.UserMapper;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.service.AuthenticationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/authentication")
public class AuthenticationController {

  private final AuthenticationService authenticationService;
  private final UserMapper userMapper;

  @PostMapping("/register")
  public ResponseEntity<String> register(
      @RequestBody @Valid RegistrationRequest registrationRequest) {
    User registeredUser = userMapper.toUserEntity(registrationRequest);
    return ResponseEntity.ok(authenticationService.register(registeredUser));
  }

  @PostMapping("/login")
  public ResponseEntity<AuthenticationResponse> login(
      @RequestBody @Valid LoginRequest loginRequest) {
    return ResponseEntity.ok(authenticationService.login(loginRequest));
  }
}
