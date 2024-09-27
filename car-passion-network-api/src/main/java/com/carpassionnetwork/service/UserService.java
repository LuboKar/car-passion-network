package com.carpassionnetwork.service;

import com.carpassionnetwork.exception.FileNotUploadedException;
import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.exception.UserNotFoundException;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.UserRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserService {
  private static final String PARENT_DIRECTORY = "ProfilePictures";
  private static final String FILE_NAME = "profile picture";
  private final UserRepository userRepository;

  public User getUser(UUID id) {
    return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException(id));
  }

  public User getCurrentUser() {
    String currentUserEmail = getCurrentUserEmail();

    return userRepository
        .findByEmail(currentUserEmail)
        .orElseThrow(InvalidCredentialsException::new);
  }

  public User uploadProfilePicture(MultipartFile file) {
    verifyFile(file);

    Path targetPath = buildTargetPath(file);

    createFile(file, targetPath);

    return saveProfilePicture(targetPath);
  }

  private String getCurrentUserEmail() {
    return SecurityContextHolder.getContext().getAuthentication().getName();
  }

  private void verifyFile(MultipartFile file) {
    if (file == null
        || file.isEmpty()
        || file.getOriginalFilename() == null
        || file.getOriginalFilename().isEmpty()) {
      throw new FileNotUploadedException();
    }
  }

  private Path buildTargetPath(MultipartFile file) {
    String currentUserEmail = getCurrentUserEmail();
    String fileExtension = getFileExtension(file);

    Path targetDir = Paths.get(PARENT_DIRECTORY, currentUserEmail);

    return targetDir.resolve(FILE_NAME + fileExtension);
  }

  private String getFileExtension(MultipartFile file) {
    String originalFilename = file.getOriginalFilename();

    return originalFilename.substring(originalFilename.lastIndexOf("."));
  }

  private void createFile(MultipartFile file, Path targetPath) {
    try {
      Files.write(targetPath, file.getBytes());
    } catch (IOException e) {
      throw new FileNotUploadedException();
    }
  }

  private User saveProfilePicture(Path targetPath) {
    User currentUser = getCurrentUser();
    currentUser.setProfilePicture(targetPath.toString());

    return userRepository.save(currentUser);
  }
}
