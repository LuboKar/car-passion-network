package com.carpassionnetwork.service;

import com.carpassionnetwork.exception.*;
import com.carpassionnetwork.model.Group;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.GroupRepository;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class GroupService {
  private static final String PARENT_DIRECTORY = "GroupPictures";
  private static final String FILE_NAME = "group picture";
  private final GroupRepository groupRepository;
  private final UserService userService;

  public Group createGroup(String groupName) {
    validateGroupName(groupName);

    User currentUser = userService.getCurrentUser();
    Group group = buildGroup(groupName, currentUser);

    Group savedGroup = groupRepository.save(group);

    createDirectory(savedGroup.getId());

    return savedGroup;
  }

  public Group getGroup(UUID groupId) {
    return groupRepository
        .findById(groupId)
        .orElseThrow(
            () -> new ValidationException("Group with id: " + groupId + " does not exists!"));
  }

  public List<Group> getAllGroupsByAdminId(UUID adminId) {
    return groupRepository.findAllByAdminId(adminId);
  }

  public List<Group> getAllOtherGroups(UUID userId) {
    return groupRepository.findAllOtherGroups(userId);
  }

  public Group joinGroup(UUID groupId) {
    User currentUser = userService.getCurrentUser();
    Group group = getGroup(groupId);

    group.getMembers().add(currentUser);

    return groupRepository.save(group);
  }

  public Group leaveGroup(UUID groupId) {
    User currentUser = userService.getCurrentUser();
    Group group = getGroup(groupId);

    group.getMembers().remove(currentUser);

    return groupRepository.save(group);
  }

  public List<Group> getUserParticipatingGroups(UUID userId) {
    return groupRepository.findByMembersId(userId);
  }

  public void deleteGroup(UUID groupId) {
    groupRepository.deleteById(groupId);
  }

  public Group removeMember(UUID groupId, UUID memberId) {
    Group group = getGroup(groupId);
    User member = userService.getUser(memberId);

    group.getMembers().remove(member);

    return groupRepository.save(group);
  }

  public Group uploadGroupPicture(MultipartFile file, UUID groupId) {
    verifyFile(file);

    Group group = getGroup(groupId);
    Path targetPath = buildTargetPath(file, groupId);

    createFile(file, targetPath);

    return saveGroupPicture(group, targetPath);
  }

  private Group buildGroup(String name, User admin) {
    return Group.builder()
        .name(name)
        .admin(admin)
        .posts(new ArrayList<>())
        .members(new HashSet<>())
        .build();
  }

  private void validateGroupName(String groupName) {
    Optional<Group> savedGroup = groupRepository.findByName(groupName);
    if (savedGroup.isPresent()) throw new ValidationException("This group name is already used!");
  }

  private void verifyFile(MultipartFile file) {
    if (file == null
        || file.isEmpty()
        || file.getOriginalFilename() == null
        || file.getOriginalFilename().isEmpty()) {
      throw new ValidationException("The uploaded file is invalid.");
    }
  }

  private Path buildTargetPath(MultipartFile file, UUID groupId) {
    String fileExtension = getFileExtension(file);

    Path targetDir = Paths.get(PARENT_DIRECTORY, groupId.toString());

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
      throw new ValidationException("Failed to create file!");
    }
  }

  private void createDirectory(UUID groupId) {
    Path path = Paths.get(PARENT_DIRECTORY, groupId.toString());

    try {
      if (Files.notExists(path)) {
        Files.createDirectory(path);
      }
    } catch (IOException e) {
      throw new ValidationException("Failed to create folder!");
    }
  }

  private Group saveGroupPicture(Group group, Path targetPath) {
    group.setGroupPicture(targetPath.toString());
    return groupRepository.save(group);
  }
}
