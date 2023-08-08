package cz.dev.buddymovie.security;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("security.jwt")
public record JwtProperties(
        String secretKey
) {
}
