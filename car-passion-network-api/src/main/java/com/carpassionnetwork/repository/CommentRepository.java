package com.carpassionnetwork.repository;

import com.carpassionnetwork.model.Comment;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, UUID> {}
