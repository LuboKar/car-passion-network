package com.carpassionnetwork.repository;

import com.carpassionnetwork.model.Post;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, UUID> {}
