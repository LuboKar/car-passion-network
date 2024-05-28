package com.carpassionnetwork.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.Set;
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
public class Post {
  @Id @GeneratedValue private UUID id;

  @Column(nullable = false)
  private String title;

  @Column(nullable = false)
  private String content;

  @Column(nullable = false)
  private LocalDateTime createdAt;

  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  @ManyToMany(mappedBy = "likedPosts")
  Set<User> likes;

  @PrePersist
  public void onPrePersist() {
    setCreatedAt(LocalDateTime.now());
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    Post post = (Post) o;
    return Objects.equals(id, post.id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
