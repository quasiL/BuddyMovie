package cz.dev.buddymovie;

import cz.dev.buddymovie.config.MinioProperties;
import cz.dev.buddymovie.security.JwtProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties({JwtProperties.class, MinioProperties.class})
@SpringBootApplication
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
