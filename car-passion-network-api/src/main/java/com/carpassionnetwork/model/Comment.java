package com.carpassionnetwork.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class Comment {
  @Id @GeneratedValue private UUID id;

  @Column(nullable = false, columnDefinition = "TEXT")
  private String content;

  @Column(updatable = false, nullable = false)
  private LocalDateTime createdAt;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User user;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "post_id", nullable = false)
  private Post post;

  @PrePersist
  public void onPrePersist() {
    setCreatedAt(LocalDateTime.now());
  }
}
