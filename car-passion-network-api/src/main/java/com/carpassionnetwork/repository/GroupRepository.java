package com.carpassionnetwork.repository;

import com.carpassionnetwork.model.Group;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, UUID> {}
