package com.carpassionnetwork.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "groups")
@Builder
public class Group {
  @Id @GeneratedValue private UUID id;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false, updatable = false)
  private LocalDateTime createdAt;

  @Column private String groupPicture;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "user_id", nullable = false)
  private User admin;

  @ManyToMany
  @JoinTable(
      name = "group_members",
      joinColumns = @JoinColumn(name = "group_id"),
      inverseJoinColumns = @JoinColumn(name = "user_id"))
  private Set<User> members;

  @OneToMany(mappedBy = "group", cascade = CascadeType.ALL)
  private List<Post> posts;

  @PrePersist
  public void onPrePersist() {
    setCreatedAt(LocalDateTime.now());
  }
}
