package com.carpassionnetwork.repository;

import com.carpassionnetwork.model.User;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {

  Optional<User> findByEmail(String email);

  @Query("SELECT u FROM User u JOIN u.groups g WHERE g.id = :groupId")
  List<User> findAllByGroupId(UUID groupId);

  @Query(
      value =
          """
    SELECT u.* FROM users u
    JOIN friends f ON u.id = f.first_user_id
    WHERE f.second_user_id = :userId

    UNION

    SELECT u.* FROM users u
    JOIN friends f ON u.id = f.second_user_id
    WHERE f.first_user_id = :userId
    """,
      nativeQuery = true)
  List<User> findAllFriendsByUserId(@Param("userId") UUID userId);

  @Query(
      "SELECT u FROM User u WHERE LOWER(CONCAT(u.firstName, ' ', u.lastName)) LIKE LOWER(CONCAT(:fullName, '%'))")
  List<User> findByFullNameStartingWith(@Param("fullName") String fullName, Pageable pageable);

  @Modifying
  @Query(
      value =
          "INSERT INTO friends (first_user_id, second_user_id) values (:firstUserId, :secondUserId)",
      nativeQuery = true)
  void addFriend(@Param("firstUserId") UUID firstUserId, @Param("secondUserId") UUID secondUserId);

  @Modifying
  @Query(
      value =
          "DELETE FROM friends WHERE "
              + "(first_user_id = :firstUserId AND second_user_id = :secondUserId)"
              + " OR "
              + "(first_user_id = :secondUserId AND second_user_id = :firstUserId)",
      nativeQuery = true)
  void removeFriend(@Param("firstUserId") UUID userId, @Param("secondUserId") UUID secondUserId);

  @Query(
      value =
          """
    SELECT COUNT(*) > 0 FROM friends
    WHERE (first_user_id = :firstUserId AND second_user_id = :secondUserId)
       OR (first_user_id = :secondUserId AND second_user_id = :firstUserId)
    """,
      nativeQuery = true)
  boolean areFriends(
      @Param("firstUserId") UUID firstUserId, @Param("secondUserId") UUID secondUserId);
}
