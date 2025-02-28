package com.carpassionnetwork.model;

import jakarta.persistence.*;
import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")
@EntityListeners(AuditingEntityListener.class)
public class User implements UserDetails, Principal {
  @Id @GeneratedValue private UUID id;

  @Column(nullable = false)
  private String firstName;

  @Column(nullable = false)
  private String lastName;

  @Column private LocalDate dateOfBirth;

  @Column(unique = true)
  private String email;

  @Column(nullable = false)
  private String password;

  @Column(nullable = false)
  @Enumerated(EnumType.STRING)
  private Gender gender;

  @CreatedDate
  @Column(nullable = false, updatable = false)
  private LocalDateTime createdDate;

  @LastModifiedDate
  @Column(insertable = false)
  private LocalDateTime lastUpdate;

  @Column
  @Enumerated(EnumType.STRING)
  private Role role;

  @Column private String profilePicture;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Post> posts;

  @OneToMany(mappedBy = "author", cascade = CascadeType.ALL)
  private List<Post> writtenPosts;

  @ManyToMany(mappedBy = "likes")
  Set<Post> likedPosts;

  @ManyToMany(mappedBy = "likes")
  Set<Comment> likedComments;

  @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
  private List<Comment> comments;

  @ManyToMany
  @JoinTable(
      name = "friends",
      joinColumns = @JoinColumn(name = "first_user_id"),
      inverseJoinColumns = @JoinColumn(name = "second_user_id"))
  private Set<User> friends;

  @OneToMany(mappedBy = "admin", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  private Set<Group> adminGroups;

  @ManyToMany(mappedBy = "members")
  private Set<Group> groups = new HashSet<>();

  @Override
  public String getName() {
    return email;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return List.of(new SimpleGrantedAuthority(role.name()));
  }

  @Override
  public String getPassword() {
    return password;
  }

  @Override
  public String getUsername() {
    return email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || !(o instanceof User)) return false;
    User user = (User) o;
    return Objects.equals(getId(), user.getId());
  }

  @Override
  public int hashCode() {
    return Objects.hash(id);
  }
}
