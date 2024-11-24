package com.carpassionnetwork.exception;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler({
    AlreadyUsedEmailException.class,
    InvalidCredentialsException.class,
    UserNotFoundException.class,
    PostNotFoundException.class,
    CommentNotFoundException.class,
    UserNotAuthorException.class,
    FileNotUploadedException.class,
    FolderNotCreatedException.class,
    InvalidPasswordException.class,
    AlreadyUsedGroupNameException.class,
    GroupNotFoundException.class
  })
  public ResponseEntity<Object> handleException(RuntimeException exception) {
    Map<String, String> error = new HashMap<>();
    error.put("error", exception.getMessage());
    return ResponseEntity.badRequest().body(error);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<Map<String, String>> handleValidationExceptions(
      MethodArgumentNotValidException methodArgumentNotValidException) {
    BindingResult result = methodArgumentNotValidException.getBindingResult();
    Map<String, String> errors = new HashMap<>();

    for (FieldError error : result.getFieldErrors()) {
      errors.put(error.getField(), error.getDefaultMessage());
    }

    return ResponseEntity.badRequest().body(errors);
  }
}
