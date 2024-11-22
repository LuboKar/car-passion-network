package com.carpassionnetwork.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
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

  @Column(nullable = false, columnDefinition = "TEXT")
  private String content;

  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @ManyToOne
  @JoinColumn(name = "user_id", referencedColumnName = "id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "author_id", referencedColumnName = "id")
  private User author;

  @ManyToMany
  @JoinTable(
      name = "user_post_likes",
      joinColumns = @JoinColumn(name = "post_id"),
      inverseJoinColumns = @JoinColumn(name = "user_id"))
  Set<User> likes;

  @OneToMany(mappedBy = "post", cascade = CascadeType.ALL)
  @OrderBy("createdAt ASC")
  private List<Comment> comments;

  @ManyToOne
  @JoinColumn(name = "group_id")
  private Group group;

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
