package com.carpassionnetwork.integration;

import static com.carpassionnetwork.helper.AuthenticationTestHelper.createUserOne;

import com.carpassionnetwork.config.LocalDateTypeAdapter;
import com.carpassionnetwork.model.Comment;
import com.carpassionnetwork.model.Post;
import com.carpassionnetwork.model.User;
import com.carpassionnetwork.repository.CommentRepository;
import com.carpassionnetwork.repository.PostRepository;
import com.carpassionnetwork.repository.UserRepository;
import com.carpassionnetwork.service.AuthenticationService;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.time.LocalDate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.testcontainers.service.connection.ServiceConnection;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

@Testcontainers
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@Transactional
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_CLASS)
public class BaseIT {

  @Container @ServiceConnection
  static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:16.0");

  @Autowired protected MockMvc mockMvc;
  @Autowired private AuthenticationService authenticationService;
  @Autowired protected UserRepository userRepository;
  @Autowired private PostRepository postRepository;
  @Autowired private CommentRepository commentRepository;

  protected final User currentUser;

  protected Gson gson;

  public BaseIT() {
    gson =
        new GsonBuilder().registerTypeAdapter(LocalDate.class, new LocalDateTypeAdapter()).create();
    currentUser = createUserOne();
  }

  protected void register() {
    authenticationService.register(currentUser);
  }

  protected Post createPost(Post post) {
    return postRepository.save(post);
  }

  protected Comment creteComment(Comment comment) {
    return commentRepository.save(comment);
  }

  protected User createUser(User user) {
    return userRepository.save(user);
  }

  protected User createSecondUser(User secondUser) {
    return userRepository.save(secondUser);
  }
}
