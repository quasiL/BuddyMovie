package cz.dev.buddymovie.model;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class LoginResponse {
    private final String accessToken;
    private final String userNumber;
}
