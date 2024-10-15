package com.carpassionnetwork.repository;

import com.carpassionnetwork.model.User;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

  Optional<User> findByEmail(String email);

  @Query(
      "SELECT f FROM User u JOIN u.friends f WHERE u.id = :userId ORDER BY f.firstName, f.lastName")
  List<User> findAllFriendsByUserId(@Param("userId") UUID userId);
}
