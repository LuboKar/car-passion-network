package com.carpassionnetwork.repository;

import com.carpassionnetwork.model.Group;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, UUID> {
  Optional<Group> findByName(String name);

  List<Group> findAllByAdminId(UUID adminId);
}
