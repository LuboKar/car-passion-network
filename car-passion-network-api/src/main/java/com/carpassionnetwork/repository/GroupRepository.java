package com.carpassionnetwork.repository;

import com.carpassionnetwork.model.Group;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface GroupRepository extends JpaRepository<Group, UUID> {
  Optional<Group> findByName(String name);

  List<Group> findAllByAdminId(UUID adminId);

  @Query(
      "SELECT g FROM Group g WHERE g.admin.id != :userId AND NOT EXISTS ( SELECT 1 FROM g.members m WHERE m.id = :userId)")
  List<Group> findAllOtherGroups(UUID userId);
}
