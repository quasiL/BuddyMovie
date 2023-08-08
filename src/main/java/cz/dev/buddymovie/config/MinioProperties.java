package cz.dev.buddymovie.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("minio.server")
public record MinioProperties(
        String accessKey,
        String secretKey
) {
}
