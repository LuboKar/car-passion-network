package com.carpassionnetwork.repository;

import com.carpassionnetwork.model.Post;
import java.util.List;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface PostRepository extends JpaRepository<Post, UUID> {
  List<Post> findAllByUserIdOrderByCreatedAtDesc(UUID userId);

  @Query("SELECT p FROM Post p WHERE p.user = p.author ORDER BY p.createdAt DESC")
  List<Post> findAllWhereUserIdEqualsAuthorIdOrderByCreatedAtDesc();
}
