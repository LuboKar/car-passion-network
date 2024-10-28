package com.carpassionnetwork.service;

import com.carpassionnetwork.dto.request.UserEditRequest;
import com.carpassionnetwork.exception.FileNotUploadedException;
import com.carpassionnetwork.exception.InvalidCredentialsException;
import com.carpassionnetwork.exception.InvalidPasswordException;
import com.carpassionnetwork.exception.UserNotFoundException;
import com.carpassionnetwork.model.Comment;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.UserRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class UserService {
  private static final String PARENT_DIRECTORY = "ProfilePictures";
  private static final String FILE_NAME = "profile picture";
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

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

  public User editUser(UserEditRequest userEditRequest) {
    User currentUser = getCurrentUser();

    editName(userEditRequest, currentUser);
    editPassword(userEditRequest, currentUser);
    editDateOfBirth(userEditRequest, currentUser);
    editGender(userEditRequest, currentUser);

    return userRepository.save(currentUser);
  }

  public User addFriend(UUID friendID) {
    User currentUser = getCurrentUser();
    User friendUser = getUser(friendID);

    currentUser.getFriends().add(friendUser);
    friendUser.getFriends().add(currentUser);

    return userRepository.save(friendUser);
  }

  public User removeFriend(UUID friendID) {
    User currentUser = getCurrentUser();
    User friendUser = getUser(friendID);

    currentUser.getFriends().remove(friendUser);
    friendUser.getFriends().remove(currentUser);

    return userRepository.save(friendUser);
  }

  public List<User> getAllFriendsByUserId(UUID id) {
    return userRepository.findAllFriendsByUserId(id);
  }

  public List<User> findUsersByFullNameStartsWith(String term) {
    Pageable limit = PageRequest.of(0, 6);

    return userRepository.findByFullNameStartingWith(term, limit);
  }

  public void deleteUser(UUID id) {
    User userToDelete = getUser(id);

    removeUserPostLikes(userToDelete);
    removeUserCommentLikes(userToDelete);
    removeUserFriends(userToDelete);

    userRepository.delete(userToDelete);
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

  private void editName(UserEditRequest userEditRequest, User currentUser) {
    if (userEditRequest.getFirstName() != null && userEditRequest.getLastName() != null) {
      currentUser.setFirstName(userEditRequest.getFirstName());
      currentUser.setLastName(userEditRequest.getLastName());
    }
  }

  private void editPassword(UserEditRequest userEditRequest, User currentUser) {
    if (userEditRequest.getOldPassword() != null) {
      if (passwordEncoder.matches(userEditRequest.getOldPassword(), currentUser.getPassword())) {
        currentUser.setPassword(passwordEncoder.encode(userEditRequest.getNewPassword()));
      } else {
        throw new InvalidPasswordException();
      }
    }
  }

  private void editDateOfBirth(UserEditRequest userEditRequest, User currentUser) {
    if (userEditRequest.getDateOfBirth() != null) {
      currentUser.setDateOfBirth(userEditRequest.getDateOfBirth());
    }
  }

  private void editGender(UserEditRequest userEditRequest, User currentUser) {
    if (userEditRequest.getGender() != null) {
      currentUser.setGender(userEditRequest.getGender());
    }
  }

  private void removeUserPostLikes(User user) {
    for (Post post : user.getLikedPosts()) {
      post.getLikes().remove(user);
    }
  }

  private void removeUserCommentLikes(User user) {
    for (Comment comment : user.getLikedComments()) {
      comment.getLikes().remove(user);
    }
  }

  private void removeUserFriends(User user) {
    for (User frienduser : user.getFriends()) {
      frienduser.getFriends().remove(user);
    }
  }
}
