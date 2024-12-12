package com.carpassionnetwork.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class ResourceConfig implements WebMvcConfigurer {
  private static final String PROFILE_PICTURES_ENDPOINT = "/ProfilePictures/**";
  private static final String GROUP_PICTURES_ENDPOINT = "/GroupPictures/**";

  @Value("${profile.pictures.location}")
  private String profilePicturesLocation;

  @Value("${group.pictures.location}")
  private String groupPicturesLocation;

  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    registry
        .addResourceHandler(PROFILE_PICTURES_ENDPOINT)
        .addResourceLocations("file:" + profilePicturesLocation);

    registry
        .addResourceHandler(GROUP_PICTURES_ENDPOINT)
        .addResourceLocations("file:" + groupPicturesLocation);
  }
}
