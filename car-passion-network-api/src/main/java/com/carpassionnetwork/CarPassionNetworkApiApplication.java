package com.carpassionnetwork;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CarPassionNetworkApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(CarPassionNetworkApiApplication.class, args);
	}

}
