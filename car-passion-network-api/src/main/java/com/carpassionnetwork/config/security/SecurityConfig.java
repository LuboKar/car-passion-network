package com.carpassionnetwork.config.security;

import static org.springframework.security.config.Customizer.withDefaults;
import static org.springframework.security.config.http.SessionCreationPolicy.STATELESS;

import com.carpassionnetwork.security.JwtFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {
  private static final String LOGIN_ENDPOINT = "/authentication/**";
  private static final String ERROR_ENDPOINT = "/error/**";
  private static final String PROFILE_PICTURES_ENDPOINT = "/ProfilePictures/**";
  private final JwtFilter jwtAuthenticationFilter;
  private final AuthenticationProvider authenticationProvider;

  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
    httpSecurity
        .cors(withDefaults())
        .csrf(AbstractHttpConfigurer::disable)
        .authorizeHttpRequests(
            request ->
                request
                    .requestMatchers(LOGIN_ENDPOINT, ERROR_ENDPOINT, PROFILE_PICTURES_ENDPOINT)
                    .permitAll()
                    .anyRequest()
                    .authenticated())
        .sessionManagement(session -> session.sessionCreationPolicy(STATELESS))
        .authenticationProvider(authenticationProvider)
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        .logout(
            (logout) ->
                logout
                    .logoutUrl("/authentication/logout")
                    .logoutSuccessHandler(
                        ((request, response, authentication) ->
                            SecurityContextHolder.clearContext()))
                    .invalidateHttpSession(true));

    return httpSecurity.build();
  }
}
